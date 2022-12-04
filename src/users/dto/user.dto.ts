import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({
    description: "User full name",
    example: "Jane Doe",
    nullable: false,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: "User email",
    example: "janedoe@email.com",
    nullable: false,
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: "User password",
    example: "123456",
    nullable: false,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UpdateUserDto {
  @ApiProperty({
    description: "User full name",
    example: "Updated example Jane Doe Doe",
    nullable: true,
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: "User email",
    example: "Updated example janedoedoe@email.com",
    nullable: true,
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: "User password",
    example: "Updated example 12345678",
    nullable: true,
    required: false,
  })
  @IsString()
  @IsOptional()
  password?: string;
}

export class RouteUserByIdDto {
  @ApiProperty({
    description: "User id",
    example: "e67acf9c-7a6c-49a9-84f6-0722132ac5b8",
    nullable: false,
    required: true,
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
