 export class User {
  username: String;
  email :String;
  id: String;
  role: string;
  constructor(username:String, email:String, id:String, role:string){
    this.username = username;
    this.email = email;
    this.id = id;
    this.role= role; 
  }
}