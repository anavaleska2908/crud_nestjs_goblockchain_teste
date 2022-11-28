import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { PrismaModule } from "./prisma/prisma.module";
import "dotenv/config";

@Module({
  imports: [AuthModule, UserModule, PrismaModule],
})
export class AppModule {}
