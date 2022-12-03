import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "../users.service";
import { PrismaService } from "../../prisma/prisma.service";
import { TestUtil } from "../../common/test/TestUtil";
import { ConflictException, NotFoundException } from "@nestjs/common";

const mockUsersService = {
  user: {
    create: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    findFirst: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe("UserService", () => {
  let prisma: PrismaService;
  let service: UsersService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    prisma = module.get<PrismaService>(PrismaService);
    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should be defined", () => {
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  });

  describe("CreateUser", () => {
    it("Should be able to create a new user", async () => {
      const user = await TestUtil.giveAMeAValidUser();
      mockUsersService.user.create.mockReturnValue(user);
      const response = await service.store(user);

      expect(response).toMatchObject(user);
      expect(mockUsersService.user.create).toBeCalledTimes(1);
    });

    it("Should return a exception when the user is already registered", async () => {
      const user = await TestUtil.giveAMeAValidUser();
      const user2 = await TestUtil.giveAMeAValidUser();
      mockUsersService.user.create.mockReturnValue(user);
      mockUsersService.user.create.mockReturnValue(user2);

      try {
        await service.store(user);
        await service.store(user2);
      } catch (error) {
        expect(error).rejects.toBeInstanceOf(ConflictException);
      }

      expect(mockUsersService.user.create).toHaveBeenCalledTimes(2);
    });
  });

  describe("ListAllUsers", () => {
    it("Should be able to list all users", async () => {
      const user = TestUtil.giveAMeAValidUser();
      mockUsersService.user.findMany.mockReturnValue([user, user]);
      const response = await service.index();

      expect(response).toHaveLength(2);
      expect(mockUsersService.user.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe("ListOneUser", () => {
    it("Should be able to list a user by id", async () => {
      const user = await TestUtil.giveAMeAValidUser();
      mockUsersService.user.findFirst.mockReturnValue(user);
      const response = await service.show(
        "d081490a-45ae-493f-a739-bb4ef86fddec",
      );

      expect(response).toMatchObject({ email: user.email });
      expect(mockUsersService.user.findFirst).toHaveBeenCalledTimes(1);
    });

    it("Should return a exception when does not find a user", async () => {
      mockUsersService.user.findFirst.mockReturnValue(null);
      expect(
        service.show("d081490b-45ae-493f-a739-bb4ef86fddeg"),
      ).rejects.toBeInstanceOf(NotFoundException);
      expect(mockUsersService.user.findFirst).toHaveBeenCalledTimes(1);
    });
  });

  describe("UpdateUser", () => {
    it("Should be able to update a user", async () => {
      const user = await TestUtil.giveAMeAValidUser();
      const updatedUser = { name: "Updated Name" };
      mockUsersService.user.findFirst.mockReturnValue(user);
      mockUsersService.user.update.mockReturnValue({
        ...user,
        ...updatedUser,
      });
      const response = await service.update(
        "d081490a-45ae-493f-a739-bb4ef86fddec",
        {
          ...user,
          ...updatedUser,
        },
      );

      expect(response).toMatchObject(updatedUser);
      expect(mockUsersService.user.findFirst).toBeCalledTimes(1);
      expect(mockUsersService.user.update).toBeCalledTimes(1);
    });
    it("Should return a exception when does not find a user", async () => {
      mockUsersService.user.findFirst.mockReturnValue(null);
      expect(
        service.show("d081490b-45ae-493f-a739-bb4ef86fddeg"),
      ).rejects.toBeInstanceOf(NotFoundException);
      expect(mockUsersService.user.findFirst).toHaveBeenCalledTimes(1);
    });
  });

  describe("DeleteUser", () => {
    it("Should be able to delete a user", async () => {
      const user = await TestUtil.giveAMeAValidUser();
      mockUsersService.user.findFirst.mockReturnValue(user);
      mockUsersService.user.delete.mockReturnValue(user);
      const response = await service.delete(
        "d081490a-45ae-493f-a739-bb4ef86fddec",
      );
      console.log("service", response);
      expect(response).toEqual({
        msg: "This user has been successfully deleted.",
      });
      expect(mockUsersService.user.findFirst).toBeCalledTimes(1);
      expect(mockUsersService.user.delete).toBeCalledTimes(1);
    });
    it("Should return a exception when does not find a user", async () => {
      mockUsersService.user.findFirst.mockReturnValue(null);
      expect(
        service.show("d081490b-45ae-493f-a739-bb4ef86fddeg"),
      ).rejects.toBeInstanceOf(NotFoundException);
      expect(mockUsersService.user.findFirst).toHaveBeenCalledTimes(1);
    });
  });
});
