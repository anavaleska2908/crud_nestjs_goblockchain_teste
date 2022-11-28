import { Injectable } from "@nestjs/common";

@Injectable({})
export class UserService {
  create() {
    return { msg: "I created a user." };
  }
}
