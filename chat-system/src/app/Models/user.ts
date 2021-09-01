 export class User {
  username: String;
  email :String;
  id: String;
  role: string;
  password: string;
  constructor(password: string,username:String, email:String, id:String, role:string){
    this.username = username;
    this.email = email;
    this.id = id;
    this.role= role; 
    this.password = password;
  }
}