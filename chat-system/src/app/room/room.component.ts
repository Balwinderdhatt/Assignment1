import { Component, OnInit } from '@angular/core';
import { LogoutService } from '../services/logout.service';
import { SwitchComponentService } from '../services/switch-component.service';
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  constructor(public switchComp: SwitchComponentService, private logoutService: LogoutService) { }
room: any;
users = ["u1", "u2", "u3"]
userName = sessionStorage.getItem('userName');
role = sessionStorage.getItem('role');
  ngOnInit(): void {
    this.room = this.switchComp.room
   this.switchComp.event3.subscribe((room:any)=>{
this.room = room
console.log(this.room.name)
console.log(this.room.users)
   })
  }
  logout(){
    this.logoutService.logout()
  }

  home(){
    this.switchComp.router.navigateByUrl('dash');
    // console.log("hiiii")
  }

}
