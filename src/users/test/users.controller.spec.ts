import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "../users.service";
import { UsersController } from "../users.controller";
import { TestUtil } from "../../common/test/TestUtil";

const mockUsersService = {
  store: jest.fn(),
  index: jest.fn(),
  show: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe("UsersController", () => {
  let controller: UsersController;
  let service: UsersService;
  const id = "d081490a-45ae-493f-a739-bb4ef86fddec";

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockUsersService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("CreateUser", () => {
    it("Should be able to create a user", async () => {
      const user = await TestUtil.giveAMeAValidUser();
      mockUsersService.store.mockReturnValue(user);
      const response = await controller.store(user);

      expect(response).toMatchObject(user);
      expect(mockUsersService.store).toBeCalledWith(user);
      expect(mockUsersService.store).toBeCalledTimes(1);
    });
  });

  describe("ListAllUsers", () => {
    it("Should be able to list all users", async () => {
      const user = await TestUtil.giveAMeAValidUser();
      mockUsersService.index.mockReturnValue([user, user]);
      const response = await controller.index();

      expect(response).toHaveLength(2);
      expect(mockUsersService.index).toBeCalledTimes(1);
    });
  });

  describe("ListOneUser", () => {
    it("Should be able to list a user by id", async () => {
      const user = await TestUtil.giveAMeAValidUser();
      mockUsersService.show.mockReturnValue(user);
      const response = await controller.show({ id });

      expect(response).toEqual(user);
      expect(response).toMatchObject({ email: user.email });
      expect(mockUsersService.show).toHaveBeenCalledTimes(1);
    });
  });

  describe("UpdateUser", () => {
    it("Should be able to update a user", async () => {
      const user = await TestUtil.giveAMeAValidUser();
      mockUsersService.update.mockReturnValue(user);
      const response = await controller.update({ id }, user);

      expect(response).toEqual(user);
      expect(response).toMatchObject({ email: user.email });
      expect(mockUsersService.update).toHaveBeenCalledTimes(1);
    });
  });

  describe("DeleteUser", () => {
    it("Should be able to delete a user", async () => {
      await controller.delete({ id });

      expect(mockUsersService.delete).toHaveBeenCalledTimes(1);
    });
  });
});
