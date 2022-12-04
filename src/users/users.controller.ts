import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";
import { BadRequestSwagger } from "src/helpers/swagger/badRequest.swagger";
import { ConflictSwagger } from "src/helpers/swagger/conflict.swagger";
import { NotFoundSwagger } from "src/helpers/swagger/notFound.swagger";
import { UnauthorizedSwagger } from "src/helpers/swagger/unauthorized.swagger";
import { JwtGuard } from "../auth/guard";
import { CreateUserDto, RouteUserByIdDto, UpdateUserDto } from "./dto";
import { IndexUsersSwagger } from "./swagger/indexUsers.swagger";
import { ShowUserSwagger } from "./swagger/showUser.swagger";
import { StoreUserSwagger } from "./swagger/storeUser.swagger";
import { UpdateUserSwagger } from "./swagger/updateUser.swagger";
import { UsersService } from "./users.service";

@Controller("/users")
@ApiTags("/users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post("")
  @ApiOperation({ summary: "Create a new user with success." })
  @ApiResponse({
    status: 201,
    description: "Create a user.",
    type: StoreUserSwagger,
  })
  @ApiResponse({
    status: 400,
    description: "Invalid or missing parameters.",
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 409,
    description: "A account with this Email already exists.",
    type: ConflictSwagger,
  })
  store(@Body() dto: CreateUserDto) {
    return this.usersService.store(dto);
  }

  @Get("")
  @ApiOperation({ summary: "List all registered users." })
  @ApiResponse({
    status: 200,
    description: "List all users with success.",
    type: IndexUsersSwagger,
    isArray: true,
  })
  index() {
    return this.usersService.index();
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Get(":id")
  @ApiOperation({ summary: "List a registered user by id." })
  @ApiResponse({
    status: 200,
    description: "User data returned successfully.",
    type: ShowUserSwagger,
  })
  @ApiResponse({
    status: 401,
    description: "Authorization is missing.",
    type: UnauthorizedSwagger,
  })
  @ApiResponse({
    status: 404,
    description: "User not found.",
    type: NotFoundSwagger,
  })
  show(@Param() { id }: RouteUserByIdDto) {
    return this.usersService.show({ id });
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Patch(":id")
  @ApiOperation({ summary: "Updates a registered user by id." })
  @ApiResponse({
    status: 200,
    description: "User data updated successfully.",
    type: UpdateUserSwagger,
  })
  @ApiResponse({
    status: 401,
    description: "Authorization is missing.",
    type: UnauthorizedSwagger,
  })
  @ApiResponse({
    status: 404,
    description: "User not found.",
    type: NotFoundSwagger,
  })
  update(@Param() { id }: RouteUserByIdDto, @Body() dto: UpdateUserDto) {
    return this.usersService.update({ id }, dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Delete(":id")
  @ApiOperation({ summary: "Deletes a registered user by id." })
  @ApiResponse({
    status: 204,
    description: "User deleted successfully.",
  })
  @ApiResponse({
    status: 401,
    description: "Authorization is missing.",
    type: UnauthorizedSwagger,
  })
  delete(@Param() { id }: RouteUserByIdDto) {
    return this.usersService.delete({ id });
  }
}
