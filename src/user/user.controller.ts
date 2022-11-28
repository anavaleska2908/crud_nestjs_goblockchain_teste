import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto";
import { UserService } from "./user.service";

@Controller("/users")
export class UserController {
  constructor(private userService: UserService) {}

  @Post("")
  create(@Body() dto: CreateUserDto) {
    console.log({ dto });
    return this.userService.create(dto);
  }
}
