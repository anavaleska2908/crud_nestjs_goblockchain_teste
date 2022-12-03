import { AuthDto } from "../../auth/dto";
import * as argon2 from "argon2";
import { CreateUserDto } from "../../users/dto/user.dto";

export class TestUtil {
  static async giveAMeAValidUser(): Promise<CreateUserDto> {
    const user = new CreateUserDto();
    user.email = "janedoe@email.com";
    user.name = "Jane Doe";
    user.password = await argon2.hash("123456");

    return user;
  }

  static async giveMeAUserToLogin(): Promise<AuthDto> {
    const user = new AuthDto();
    user.email = "janedoe@email.com";
    user.password =
      "$argon2id$v=19$m=65536,t=3,p=4$SOjeU543IxEzZe5gEhVzVg$mWo9jd8w65x7JQe/uVLeljXMuD9uXErHSDfR9QHLGXw";
    return user;
  }

  static mockedConfigService = {
    get(key: string) {
      switch (key) {
        case "JWT_EXPIRATION_TIME":
          return "3600";
      }
    },
  };

  static mockedJWTService = {
    signAsync: () => "",
  };
}
