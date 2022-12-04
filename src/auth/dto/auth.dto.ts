import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AuthDto {
  @ApiProperty({
    description: "Email used in user registration",
    example: "janedoe@email.com",
    nullable: false,
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: "Password used in user registration",
    example: "123456",
    nullable: false,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
