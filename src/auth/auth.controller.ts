import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("/login")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  login() {
    return this.authService.login();
  }
}
