import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { User } from "@prisma/client";
import { Request } from "express";
import { JwtGuard } from "src/auth/guard";
import { GetUser } from "./decorator";
import { CreateUserDto } from "./dto";
import { UserService } from "./user.service";

@Controller("/users")
export class UserController {
  constructor(private userService: UserService) {}

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
