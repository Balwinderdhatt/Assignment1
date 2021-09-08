import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SwitchComponentService } from '../services/switch-component.service';
const bk_url = 'http://localhost:3000';
@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  constructor(private modal:NgbModal, private httpClient: HttpClient, private switchComp: SwitchComponentService, private router: Router) { }
rooms: any;

  ngOnInit(): void {
    if (sessionStorage.getItem('role') == 'User'){
      this.httpClient.get(bk_url + '/getRooms').subscribe((data:any)=>{
        // this.groups = data;
       data.forEach((room: { users: any[]; }) => {
         room.users.forEach(element => {
           if (sessionStorage.getItem('userName') == element.userName){
             this.rooms.push(room)
           }
         });
       });
        console.log(this.rooms)
        
      })
    }else{
      this.httpClient.get(bk_url + '/getRooms').subscribe((data:any)=>{
        this.rooms = data;
      })
    }

  }
createRoom(modal:any){
this.modal.open(modal,({ windowClass: 'creteRoom' }))
}
deleteroom(){
  
}
select( room: any){
  this.switchComp.selectedRoom(room);
  console.log(room)

}

}
