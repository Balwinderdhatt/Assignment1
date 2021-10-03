import { Component, OnInit } from '@angular/core';
import { LogoutService } from '../services/logout.service';
import { SwitchComponentService } from '../services/switch-component.service';
import { SocketService } from '../services/socket.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
const bk_url = 'http://localhost:3000';
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  constructor(
    public switchComp: SwitchComponentService,
    private socketService: SocketService, 
    private logoutService: LogoutService, 
    private modal:NgbModal, ) { }
room: any;
users = ["u1", "u2", "u3"]
userName = sessionStorage.getItem('userName');
role = sessionStorage.getItem('role');
selectedfile :any;
imagepath = "";
messageBody = "";
messages = Array();
userCount = 0;
isInRoom = false;

ioConnection: any;
  ngOnInit(): void {
    this.room = this.switchComp.room
    this.switchComp.event3.subscribe((room:any)=>{
      this.room = room
      console.log(this.room)
      // console.log(this.room.users)
   })
   this.initIoConnection()
  //  this.socketService.joined((msg:any)=>{
  //    console.log("return from joined",msg)
  //    this.room = msg
  //    if (this.room){
  //      this.isInRoom = true
  //    }
  //    else{
  //      this.isInRoom = false
  //    }
  //  })
  }


  logout(){
    this.logoutService.logout()
  }

  home(){
    this.switchComp.router.navigateByUrl('dash');
    // console.log("hiiii")
  }

  joinRoom(){
    let obj = {userName : sessionStorage.getItem('userName'), id: sessionStorage.getItem('id')} 
    this.room.new = obj
    // console.log(this.room)
    this.socketService.joinRoom(this.room)
    // this.room.users.push
    // console.log(this.room)


    this.socketService.reqUsercount(this.room)
    this.socketService.joined((msg:any)=>{console.log("return from joined",msg)})
    // this.ngOnInit()

    // this.socketService.
  }
  leaveRoom(){
    this.socketService.leaveRoom(this.room)

  }

  private initIoConnection(){
    this.socketService.initSocket();
    this.ioConnection = this.socketService.onMessage().subscribe((message: any)=>{
      this.messages.push(message);
      console.log("message recieved???")
    })
  }
  
  sendMessage(messageBody: String){
  // console.log(messageBody);
  let message = {}
  if(this.messageBody){
    let message = {body: messageBody, author : this.userName}
    this.socketService.send(message);
    this.messageBody = "";
  }else {
    console.log("No Message")
  }

}
  openModal(modal:any){
    this.modal.open(modal,({ windowClass: 'creteRoom' }))
  }
  uploadFile(){
    const fd = new FormData;
    fd.append('image', this.selectedfile, this.selectedfile.name);
    this.switchComp.httpClient.post(bk_url + '/upload', fd).subscribe((res:any)=>{
      this.imagepath  =res.data.path
      console.log(res.data.path)
    })
    // this.http
    this.modal.dismissAll()
  }
  selectedFile(event:any){
    this.selectedfile = event.target.files[0];
  }
}
