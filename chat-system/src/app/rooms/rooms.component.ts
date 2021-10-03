import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { group } from 'console';
import { Room } from '../Models/room';
import { SocketService } from '../services/socket.service';
import { SwitchComponentService } from '../services/switch-component.service';
const bk_url = 'http://localhost:3000';
@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  constructor(
    private modal:NgbModal, 
    private httpClient: HttpClient, 
    private switchComp: SwitchComponentService, 
    private router: Router, 
    private socket:SocketService ) { }
rooms: any;
roomsList = Array();
roomName = '';
newRoom = {
  name : "",
  group: "",
  users: []
}
userCount = 0;
joinedMessage = ""
groups = Array();
options:any;
selected:  any



  ngOnInit(): void {
    // if (sessionStorage.getItem('role') == 'User'){
    //   this.httpClient.get(bk_url + '/getRooms').subscribe((data:any)=>{
    //     // this.groups = data;
    //    data.forEach((room: { users: any[]; }) => {
    //      room.users.forEach(element => {
    //        if (sessionStorage.getItem('userName') == element.userName){
    //          this.rooms.push(room)
    //        }
    //      });
    //    });
    //     console.log(this.rooms)
        
    //   })
    // }else{
    //   this.httpClient.get(bk_url + '/getRooms').subscribe((data:any)=>{
    //     this.rooms = data;
    //   })
    // }
    this.httpClient.get(bk_url + '/getGroups').subscribe((data:any)=>{
      // this.groups = data;
     data.forEach((group: { users: any[]; }) => {
       group.users.forEach(element => {
         if (sessionStorage.getItem('userName') == element.userName){
           this.groups.push(group)
         }
       });
     });
      // console.log(this.groups)
      
    })

    this.socket.initSocket()
    this.socket.reqRoomList();
    this.socket.getRoomList((msg:any)=>{this.roomsList = JSON.parse(msg)})

  }
createRoom(){
  this.socket.createRoom(this.newRoom)
  this.socket.joinRoom(this.newRoom)
  this.switchComp.selectedRoom(this.newRoom);
  this.socket.joined((msg:any)=>{this.joinedMessage = msg; console.log(msg)})
  this.modal.dismissAll();
  // alert(this.joinedMessage)

}
openModal(modal:any){
  this.modal.open(modal,({ windowClass: 'creteRoom' }))
}
deleteroom(){
  
}

selectedgroup(){
  // this.options = this.selected.users
  // console.log(this.options)
}
select( room: any){
  this.switchComp.selectedRoom(room);
  this.socket.inRoom(room);
  // console.log(room)

}

}
