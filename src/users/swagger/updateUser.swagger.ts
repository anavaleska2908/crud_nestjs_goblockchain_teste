import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserSwagger {
  @ApiProperty({
    description: "User id",
    example: "e67acf9c-7a6c-49a9-84f6-0722132ac5b8",
  })
  id: string;

  @ApiProperty({
    description: "User full name",
    example: "Jane Doe Doe",
    required: false,
    nullable: true,
  })
  name: string;

  @ApiProperty({
    description: "User email",
    example: "janedoedoe@email.com",
    required: false,
    nullable: true,
  })
  email: string;

  @ApiProperty({
    description: "User password",
    example: "12345678",
    required: false,
    nullable: true,
  })
  password: string;

  @ApiProperty({
    required: false,
    nullable: true,
  })
  createdAt: Date;

  @ApiProperty({
    required: false,
    nullable: true,
  })
  updatedAt: Date;
}
