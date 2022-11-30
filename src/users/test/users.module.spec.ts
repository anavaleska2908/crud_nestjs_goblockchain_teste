import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "../users.service";
import { UsersController } from "../users.controller";
import { PrismaService } from "src/prisma/prisma.service";

const mockUserClient = () => ({
  createUser: jest.fn(),
  findUser: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

describe("UsersController", () => {
  let userClient: PrismaService;
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it("Should be defined", () => {
    expect(controller).toBeDefined();
  });
});
