import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle("GoBlockchain Test - @anavaleska2908")
    .setDescription("Swagger GoBlockchain Test API documentation")
    .setVersion("1.0")
    .addTag("/users")
    .addTag("/login")
    .addBearerAuth({
      bearerFormat: "JWT",
      scheme: "bearer",
      type: "http",
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("", app, document);
  await app.listen(3333);
}
bootstrap();
