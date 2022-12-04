import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@Controller("/login")
@ApiTags("/login")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("")
  @ApiOperation({ summary: "Log in a user and generate his token." })
  @ApiResponse({ status: 201, description: "Log in a user." })
  @ApiResponse({ status: 400, description: "Invalid email or password." })
  login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }
}
