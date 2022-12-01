import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import * as argon2 from "argon2";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto, UpdateUserDto } from "./dto";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async store(dto: CreateUserDto) {
    const checkUserExists = await this.prisma.user.findFirst({
      where: {
        email: dto.email,
      },
    });

    if (checkUserExists) {
      throw new ConflictException("A account with this Email already exists.");
    }

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

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  async update(userId: string, dto: UpdateUserDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId["id"],
      },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const userUpdated = await this.prisma.user.update({
      where: {
        id: user.id,
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

    return userUpdated;
  }

  async delete(userId: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId["id"],
      },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    await this.prisma.user.delete({
      where: {
        id: user.id,
      },
    });

    return { msg: "This user has been successfully deleted." };
  }
}
