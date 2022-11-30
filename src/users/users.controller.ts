import { Body, Controller, Get, Patch, Post, UseGuards } from "@nestjs/common";
import { User } from "@prisma/client";
import { JwtGuard } from "../auth/guard";
import { GetUser } from "./decorator";
import { CreateUserDto } from "./dto";
import { UsersService } from "./users.service";

@Controller("/users")
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post("")
  store(@Body() dto: CreateUserDto) {
    return this.userService.store(dto);
  }

  @UseGuards(JwtGuard)
  @Get(":id")
  getMe(@GetUser() user: User) {
    return user;
  }
}
