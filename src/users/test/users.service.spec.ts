import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "../users.service";
import { PrismaService } from "src/prisma/prisma.service";

const mockUserClient = () => ({
  createUser: jest.fn(),
  findUser: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

describe("UserService", () => {
  let userClient: PrismaService;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useFactory: mockUserClient,
        },
      ],
    }).compile();

    userClient = module.get<PrismaService>(PrismaService);
    service = module.get<UsersService>(UsersService);
  });

  it("Should be defined", () => {
    expect(service).toBeDefined();
    expect(userClient).toBeDefined();
  });
});
