import { User } from "./user";

export class Group {
  name:string ;
  id: number;
  users: User[];

  constructor(name:string, id: number,users:User[]){
    this.name = name;
    this.id = id;
    this.users = users
  }
}