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
import { User } from "@prisma/client";
import { JwtGuard } from "../auth/guard";
import { GetUser } from "./decorator";
import { CreateUserDto, UpdateUserDto } from "./dto";
import { UsersService } from "./users.service";

@Controller("/users")
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post("")
  store(@Body() dto: CreateUserDto) {
    return this.userService.store(dto);
  }

  @Get("")
  index() {
    return this.userService.index();
  }

  @UseGuards(JwtGuard)
  @Get(":id")
  show(@Param() userId: string) {
    return this.userService.show(userId);
  }

  @UseGuards(JwtGuard)
  @Patch(":id")
  update(@Param() userId: string, @Body() dto: UpdateUserDto) {
    return this.userService.update(userId, dto);
  }

  @UseGuards(JwtGuard)
  @Delete(":id")
  delete(@Param() userId: string) {
    return this.userService.delete(userId);
  }
}
