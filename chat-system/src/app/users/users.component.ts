import { HttpClient, HttpClientModule } from '@angular/common/http';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import { Component, OnInit } from '@angular/core';
import{ NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { AddUserComponent } from '../group/group.component';
const bk_url = 'http://localhost:3000';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private modal: NgbModal, private httpClient:HttpClient) { }
  newUser = {
    name : "",
    email: "",
    password: "",
    role: "",
    id: 0


  }
  activeUser = sessionStorage.getItem('role');
  users = Array();
  ngOnInit(): void {
    if((this.activeUser == "Super Admin")||(this.activeUser == "Group_Admin")) {
      this.httpClient.get(bk_url + '/getUsers').subscribe((data:any)=>{
        this.users = data;
        // console.log(this.users[0].userName)
      })
    }else{
      console.log("You do not have permission for this")
    }
 
  }
  
  // users = ['User1','User2', 'User3','User4', 'User5' ]
  openModal(content: any) {
    if ((this.activeUser == "Super Admin")|| (this.activeUser == "Group_Admin")){
      this.modal.open(content, { windowClass: 'dark-modal' });
    }else{
      alert("You do not have permission for this")
    }
    
  }
  public addUser(){
    this.newUser.id = Math.floor((Math.random() * 100) + 1);
    // this.modal.dismissAll("successfully Added")
    // console.log(this.newUser)
    this.httpClient.post( bk_url + '/addUser', this.newUser).subscribe((data:any) =>{
      if (data.message == 'Success'){
        this.modal.dismissAll("successfully Added")
        // this.modal.dismissAll
      }else{
        alert('Incorrect Username or Password')
      }
    })
  }
  deleteUser(user: any){
    alert("Are u sure u wnna delete ? " + user.userName)
    if((this.activeUser == "Super Admin")) {
      this.httpClient.post(bk_url + '/deleteUser', user).subscribe((data:any)=>{
      })
      this.httpClient.get(bk_url + '/getUsers').subscribe((data:any)=>{
        this.users = data;
        window.location.reload()
        // console.log(this.users[0].userName)
      })
    }else{
      alert("You do not have permission for this")
    }
  } 
 }

