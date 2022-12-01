import { CreateUserDto, UpdateUserDto } from "../../users/dto/user.dto";

export class TestUtil {
  static giveAMeAValidUser(): CreateUserDto {
    const user = new CreateUserDto();
    const id = "d081490a-45ae-493f-a739-bb4ef86fddec";
    user.email = "janedoe@email.com";
    user.name = "Jane Doe";
    user.password =
      "$argon2id$v=19$m=65536,t=3,p=4$2ZFTwbADUVbHI5Cv3dEUoA$fX2vNyZgYQ1eiZVBMUHG38yXxQuuV4kSImDqiiyXs5E";
    const newUser = {
      ...user,
      id,
    };
    return newUser;
  }
}
