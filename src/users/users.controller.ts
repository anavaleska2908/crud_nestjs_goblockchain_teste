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
import { JwtGuard } from "../auth/guard";
import { CreateUserDto, UpdateUserDto } from "./dto";
import { UsersService } from "./users.service";

@Controller("/users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post("")
  store(@Body() dto: CreateUserDto) {
    return this.usersService.store(dto);
  }

  @Get("")
  index() {
    return this.usersService.index();
  }

  @UseGuards(JwtGuard)
  @Get(":id")
  show(@Param() userId: string) {
    return this.usersService.show(userId);
  }

  @UseGuards(JwtGuard)
  @Patch(":id")
  update(@Param() userId: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(userId, dto);
  }

  @UseGuards(JwtGuard)
  @Delete(":id")
  delete(@Param() userId: string) {
    return this.usersService.delete(userId);
  }
}
