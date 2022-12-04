import { ApiProperty } from "@nestjs/swagger";

export class StoreUserSwagger {
  @ApiProperty({
    description: "User id",
    example: "e67acf9c-7a6c-49a9-84f6-0722132ac5b8",
  })
  id: string;

  @ApiProperty({
    description: "User full name",
    example: "Jane Doe",
  })
  name: string;

  @ApiProperty({
    description: "User email",
    example: "janedoe@email.com",
  })
  email: string;

  @ApiProperty({
    description: "User password",
    example: "123456",
  })
  password: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
