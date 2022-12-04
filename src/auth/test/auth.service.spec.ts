import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "../../prisma/prisma.service";
import { AuthService } from "../auth.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { UsersService } from "../../users/users.service";
import { TestUtil } from "../../common/test/TestUtil";
import { AuthDto } from "../dto";
import { CreateUserDto } from "src/users/dto";

const userCreate: CreateUserDto = {
  name: "Jane Doe",
  email: "janedoe@email.com",
  password: "123456",
};

const userLogin: AuthDto = {
  email: "janedoe@email.com",
  password: "123456",
};

const userId = "";

const mockUserService = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
};

describe("LoginService", () => {
  let prisma: PrismaService;
  let userService: UsersService;
  let loginService: AuthService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        AuthService,
        {
          provide: PrismaService,
          useValue: mockUserService,
        },
        {
          provide: ConfigService,
          useValue: TestUtil.mockedConfigService,
        },
        {
          provide: JwtService,
          useValue: TestUtil.mockedJWTService,
        },
      ],
    }).compile();

    prisma = module.get<PrismaService>(PrismaService);
    userService = module.get<UsersService>(UsersService);
    loginService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should be defined", () => {
    expect(loginService).toBeDefined();
    expect(prisma).toBeDefined();
  });

  describe("Login", () => {
    it("Should be able to log in a user", async () => {
      const user = await TestUtil.giveAMeAValidUser();
      mockUserService.user.create.mockReturnValue(user);
      const userCreated = await userService.store(user);
      console.log("userCreated", userCreated);

      const userLogin = {
        email: userCreated.email,
        password: "123456",
      };

      // password= "$argon2id$v=19$m=65536,t=3,p=4$SOjeU543IxEzZe5gEhVzVg$mWo9jd8w65x7JQe/uVLeljXMuD9uXErHSDfR9QHLGXw"
      const login = await loginService.signToken(
        "d081490a-45ae-493f-a739-bb4ef86fddec",
        userCreated.email,
      );
      console.log("login", login);
    });
  });
});
