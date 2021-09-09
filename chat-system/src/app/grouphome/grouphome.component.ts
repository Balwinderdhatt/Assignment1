import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SwitchComponentService } from '../services/switch-component.service';
const bk_url = 'http://localhost:3000';
@Component({
  selector: 'app-grouphome',
  templateUrl: './grouphome.component.html',
  styleUrls: ['./grouphome.component.css']
})
export class GrouphomeComponent implements OnInit {
  group :any
  users = Array();
  activeUser = sessionStorage.getItem('role');
  rooms = ["room 1", "room 2", "room 3"]
  room = {
    name : "",
    group: "",
    users : Array()
  }
  constructor(
    private modal: NgbModal,
    private switchComp:SwitchComponentService, 
    private httpClient:HttpClient,
    private router: Router) { }

  ngOnInit(): void {
    this.group = this.switchComp.group 
    this.group.users.map((obj: { checked: boolean; })=>{
      obj.checked = false
    })
  }
  addUsersGroup(content:any){
    if((this.activeUser == "Super Admin")|| (this.activeUser == "Group_Admin")){
      this.httpClient.get(bk_url + '/getUsers').subscribe((data:any)=>{
        this.users = data;
        this.users.map((obj)=>{
          obj.checked = false
        })
        this.modal.open(content, { windowClass: 'addUserModal' });
      })
    }else {
      alert("You do not have permission for this")
    }
  }
  public addGroup(){
    this.selectedOptions()
    this.modal.dismissAll();
    // console.log(this.userOptions)
  }
  selectedOptions() { // right now: ['1','3']
    this.group.users = this.users.filter(opt => opt.checked)
    // 
    for (let i in this.users){
      this.users[i].checked = false;
    }
    this.httpClient.post(bk_url + '/addUsertoGroup', this.group).subscribe((data:any)=>{
      // console.log(data)
      this.group = data
      // console.log(data.users)
    })
    this.switchComp.selectedGroup(this.group)
}
deleteUserfromGroup(user: any){
  let userGroup = {
    userSelected : user,
    group : this.group
  }
    alert("Are u sure u wnna remove ? " + user.userName)
    if((this.activeUser == "Super Admin")||(this.activeUser == "Group_Admin")) {
      this.httpClient.post(bk_url + '/deleteUserfromGroup', userGroup).subscribe((data:any)=>{
        this.ngOnInit()
      })
  }else{
    alert("You do not have permission for this")
  }
} 
createRoom(x:any){
  alert("Create Room");
  this.modal.open(x, { windowClass: 'createRoom' });
}
createnewRoom(){
  this.room.group = this.group.name;
  this.room.users = this.group.users.filter((opt: { checked: any; }) => opt.checked)
  // console.log(this.room)
  if(this.activeUser !== "User"){
    this.httpClient.post(bk_url + '/createRoom', this.room).subscribe((data:any)=>{
      this.ngOnInit()
      
        })
    }else{
      alert("You do not have permission for this")
    }

      for (let i in this.group.users){
        this.group.users[i].checked = false;
      }
      this.switchComp.selectedRoom(this.room)
      this.router.navigateByUrl('/room')
      this.modal.dismissAll();
  }
}
