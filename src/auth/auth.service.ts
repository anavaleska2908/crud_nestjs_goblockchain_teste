import { ForbiddenException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as bcryptjs from "bcryptjs";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDto } from "./dto";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async login({ email, password }: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new ForbiddenException("Email or password is incorrect.");

    const passwordMatches = await bcryptjs.compare(password, user.password);

    if (!passwordMatches)
      throw new ForbiddenException("Email or password is incorrect.");

    const payload = {
      sub: user.id,
      user,
    };

    const secret = this.config.get("JWT_SECRET");

    const token = await this.jwt.signAsync(payload, {
      expiresIn: "24h",
      secret: secret,
    });
    return {
      access_token: token,
    };
  }
}
