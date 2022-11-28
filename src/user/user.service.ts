import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as argon2 from "argon2";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async store(dto: CreateUserDto) {
    try {
      const user = await this.prisma.user.create({
        data: {
          name: dto.name,
          email: dto.email,
          password: await argon2.hash(dto.password),
        },
      });

      delete user.password;

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ForbiddenException(
            "A account with this Email already exists.",
          );
        }
      }
      throw error;
    }
  }
}
