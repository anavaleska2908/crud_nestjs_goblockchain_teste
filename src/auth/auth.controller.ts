import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ForbiddenSwagger } from "../helpers/swagger/forbidden.swagger";
import { BadRequestSwagger } from "../helpers/swagger/badRequest.swagger";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller("/login")
@ApiTags("/login")
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post("")
  @ApiOperation({ summary: "Log in a user and generate his token." })
  @ApiResponse({ status: 200, description: "Log in a user." })
  @ApiResponse({
    status: 400,
    description: "Some parameters is missing.",
    type: BadRequestSwagger,
    isArray: true,
  })
  @ApiResponse({
    status: 403,
    description: "Email or password is incorrect.",
    type: ForbiddenSwagger,
  })
  login(@Body() { email, password }: AuthDto) {
    return this.authService.login({ email, password });
  }
}
