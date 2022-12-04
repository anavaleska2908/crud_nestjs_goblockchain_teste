import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import * as bcryptjs from "bcryptjs";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto, RouteUserByIdDto, UpdateUserDto } from "./dto";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async store(dto: CreateUserDto) {
    const checkUserExists = await this.prisma.user.findUnique({
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
        password: await bcryptjs.hash(dto.password, 8),
      },
    });

    return user;
  }

  async index() {
    const users = await this.prisma.user.findMany();

    return users;
  }

  async show({ id }: RouteUserByIdDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  async update({ id }: RouteUserByIdDto, dto: UpdateUserDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
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
    });

    return userUpdated;
  }

  async delete({ id }: RouteUserByIdDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return await this.prisma.user.delete({
      where: {
        id: user.id,
      },
    });
  }
}
