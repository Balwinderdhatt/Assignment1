import { HttpClient } from '@angular/common/http';
import { ElementSchemaRegistry } from '@angular/compiler';
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
    // this.users = this.group.users
    // console.log(this.group)
    // this.httpClient.post(bk_url + '/findUser', this.users[0]).subscribe((data:any)=>{
    //   console.log(data)
    // })
  //   this.group.users.forEach((element:any) => {
  //     console.log(element)
  //     this.httpClient.post(bk_url + '/findUser', element).subscribe((data:any)=>{
  //       this.users.push(data);
  //       console.log(data)
        // this.users.map((obj)=>{
        //   obj.checked = false
        // })
  //   });

  //   // console.log('current',this.group)
  //   // this.group.users.map((obj: { checked: boolean; })=>{
  //   //   obj.checked = false
  //   // })
  // })
  // console.log("group", this.group)
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
    let selectedusers = Array()
    // let obj = {name : "", _id : ""}
    this.users.filter(opt => opt.checked).forEach((element:any)=>{
      let obj = {name : "", id : ""}
      obj.name = element.name; obj.id = element._id
      selectedusers.push(obj)
    })
    for (let i in this.users){
      this.users[i].checked = false;
    }
    let req = {group: this.group._id, new : selectedusers}
    // console.log( "after selectin", selectedusers)

    this.httpClient.post(bk_url + '/addUsertoGroup', req ).subscribe((data:any)=>{
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
    if((this.activeUser == "Super_Admin")||(this.activeUser == "Group_Admin")) {
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
