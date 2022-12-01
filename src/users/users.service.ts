import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as argon2 from "argon2";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto, UpdateUserDto } from "./dto";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async store(dto: CreateUserDto) {
    try {
      const user = await this.prisma.user.create({
        data: {
          name: dto.name,
          email: dto.email,
          password: await argon2.hash(dto.password),
        },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      });

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

  async index() {
    const users = await this.prisma.user.findMany();

    return users;
  }

  async show(userId: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId["id"],
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  }

  async update(userId: string, dto: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: {
        id: userId["id"],
      },
      data: {
        ...dto,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  }

  async delete(userId: string) {
    await this.prisma.user.delete({
      where: {
        id: userId["id"],
      },
    });

    return { msg: "This user has been successfully deleted." };
  }
}
