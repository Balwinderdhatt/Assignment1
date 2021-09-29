import { Component, OnInit } from '@angular/core';
import { LogoutService } from '../services/logout.service';
import { SwitchComponentService } from '../services/switch-component.service';
import { SocketService } from '../services/socket.service';
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  constructor(public switchComp: SwitchComponentService,private socketService: SocketService, private logoutService: LogoutService) { }
room: any;
users = ["u1", "u2", "u3"]
userName = sessionStorage.getItem('userName');
role = sessionStorage.getItem('role');

messageBody = "";
messages = Array();
ioConnection: any;
  ngOnInit(): void {
    this.room = this.switchComp.room
   this.switchComp.event3.subscribe((room:any)=>{
this.room = room
console.log(this.room.name)
console.log(this.room.users)
   })
   this.initIoConnection()
  }
  logout(){
    this.logoutService.logout()
  }

  home(){
    this.switchComp.router.navigateByUrl('dash');
    // console.log("hiiii")
  }
  private initIoConnection(){
    this.socketService.initSocket();
    this.ioConnection = this.socketService.onMessage().subscribe((message: string)=>{
      this.messages.push(message);
      console.log("message recieved???")
    })
  }
    sendMessage(messageBody: String){
  console.log(messageBody);
  if(this.messageBody){
    this.socketService.send(this.messageBody);
    this.messageBody = "";
  }else {
    console.log("No Message")
  }

}
}
