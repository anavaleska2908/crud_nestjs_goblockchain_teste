import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "../../prisma/prisma.service";
import { AuthService } from "../auth.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { UsersService } from "../../users/users.service";
import { TestUtil } from "../../common/test/TestUtil";
import { APP_GUARD } from "@nestjs/core";
import { JwtGuard } from "../guard";

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
          provide: APP_GUARD,
          useClass: JwtGuard,
        },
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
      const userCreate = await TestUtil.giveAMeAValidUser();
      mockUserService.user.create.mockReturnValue(userCreate);
      const userCreated = await userService.store(userCreate);

      const { email, password } = userCreated;
      mockUserService.user.findUnique({ email });

      const login = await loginService.login({ email, password });
    });
  });
});
