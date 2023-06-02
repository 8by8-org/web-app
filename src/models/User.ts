import { UserType } from "./UserType";

export class User {
  name:string = "";
  avatar:string = "";
  type:UserType = UserType.CHALLENGER;
}