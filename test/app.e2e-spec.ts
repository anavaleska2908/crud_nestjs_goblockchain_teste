import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";
import { PrismaService } from "../src/prisma/prisma.service";
import { AuthDto } from "src/auth/dto";
import { CreateUserDto } from "src/users/dto";

describe("AppController (e2e)", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let httpServer: any;
  const user: CreateUserDto = {
    name: "Jane Doe",
    email: "janedoe@email.com",
    password: "123456",
  };
  const userLogin: AuthDto = {
    email: "janedoe@email.com",
    password: "123456",
  };
  let token: string;
  let userId: string;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );

    await app.init();
    await app.listen(3333);
    httpServer = app.getHttpServer();

    prisma = app.get(PrismaService);

    await prisma.cleanDb();
  });

  afterAll(() => {
    app.close();
  });

  describe("Users", () => {
    it("Should be able to create a user and log in", async () => {
      const response = await request(httpServer).post("/users").send(user);
      const loginResponse = await request(httpServer)
        .post("/login")
        .send(userLogin);

      userId = response?.body?.id;
      token = loginResponse?.body?.access_token;

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
      expect(loginResponse.status).toBe(200);
      expect(loginResponse.body).toHaveProperty("access_token");
    });
    it("Should be able to get a user by id", async () => {
      const response = await request(httpServer)
        .get(`/users/${userId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
    });

    //   describe("Update a user", () => {});
    //   describe("Delete a user", () => {});
  });
});
