import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "../users.service";
import { UsersController } from "../users.controller";
import { PrismaService } from "src/prisma/prisma.service";

const mockUsersService = {};

describe("UsersController", () => {
  let userClient: PrismaService;
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it("Should be defined", () => {
    expect(controller).toBeDefined();
  });
});
