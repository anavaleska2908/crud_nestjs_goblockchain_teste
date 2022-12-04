import { ApiProperty } from "@nestjs/swagger";

export class ConflictSwagger {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  error: string;
}
