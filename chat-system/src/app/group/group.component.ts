import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import{ NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { UsersComponent } from '../users/users.component';
const bk_url = 'http://localhost:3000';
@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})


export class GroupComponent implements OnInit {
newGroup ={
  name :"",
  users:Array(),
  id: Math.floor((Math.random() * 100) + 1)
}
// selected = false

selectedItems = [];
users = Array();
selectedUsers = Array();
groups  = Array();
 x = Array()
  constructor(private modal: NgbModal, private httpClient: HttpClient, private router:Router) { }

  ngOnInit(): void {
    this.httpClient.get(bk_url + '/getGroups').subscribe((data:any)=>{
      this.groups = data;
 
      console.log(this.groups)
      
    })
    
    this.httpClient.get(bk_url + '/getUsers').subscribe((data:any)=>{
      this.users = data;
      this.users.map((obj)=>{
        obj.checked = false
      })
      console.log(this.users)
    })
  }
  
 
  openModal(content: any) {
    this.modal.open(content, { windowClass: 'createGroup' });
  }
  public addGroup(){
    this.selectedOptions()
    this.modal.dismissAll();
    // console.log(this.userOptions)
  }
  addUsersGroup(content:any){
    this.modal.open(content, { windowClass: 'addUserModal' });
  }
  selectedOptions() { // right now: ['1','3']
    this.newGroup.users = this.users.filter(opt => opt.checked)
    for (let i in this.users){
      this.users[i].checked = false;
    }
    this.httpClient.post(bk_url + '/createGroup', this.newGroup).subscribe((data:any)=>{
      // console.log(data)
    })
    this.httpClient.get(bk_url + '/getGroups').subscribe((data:any)=>{
      this.groups = data;
    })
    
}
  public select(group:any){
    this.router.navigateByUrl('grouphome/:' + group)
      // this.router.navigate(['grouphome' , group]);
}
  
}
