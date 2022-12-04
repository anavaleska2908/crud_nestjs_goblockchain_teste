import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";
import { PrismaService } from "../src/prisma/prisma.service";
import { AuthDto } from "src/auth/dto";
import { CreateUserDto, UpdateUserDto } from "src/users/dto";

describe("AppController (e2e)", () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let httpServer: any;
  const user: CreateUserDto = {
    name: "Jane Doe",
    email: "janedoe@email.com",
    password: "123456",
  };
  const userUpdated: UpdateUserDto = {
    name: "Jane Doe Updated",
    email: "janedoeupdated@email.com",
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
  });

  afterAll(() => {
    app.close();
  });

  describe("Users and Login routes", () => {
    it("Should be able to create a user and log in", async () => {
      const response = await request(httpServer).post("/users").send(user);
      const loginResponse = await request(httpServer)
        .post("/login")
        .send(userLogin);

      userId = response?.body?.id;
      token = loginResponse?.body?.access_token;

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
      expect(loginResponse.status).toBe(201);
      expect(loginResponse.body).toHaveProperty("access_token");
    });

    it("Should be able to get all users", async () => {
      const response = await request(httpServer).get("/users");

      expect(response.status).toBe(200);
    });

    it("Should be able to get a user by id", async () => {
      const response = await request(httpServer)
        .get(`/users/${userId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
    });

    it("Update a user", async () => {
      const response = await request(httpServer)
        .patch(`/users/${userId}`)
        .set("Authorization", `Bearer ${token}`)
        .send(userUpdated);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(userUpdated);
    });
    it("Delete a user", async () => {
      const response = await request(httpServer)
        .delete(`/users/${userId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(204);
      expect(response.body).toEqual({
        msg: "This user has been successfully deleted.",
      });
    });
  });
});
