import { HttpClient, HttpClientModule } from '@angular/common/http';
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
  private ID() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return  Math.floor(Math.random());
  };
  constructor(private modal: NgbModal, private httpClient:HttpClient) { }
  newUser = {
    name : "",
    email: "",
    password: "",
    role: "",
    id: 0


  }
  users = Array();
  ngOnInit(): void {
    this.httpClient.get(bk_url + '/getUsers').subscribe((data:any)=>{
      this.users = data;
      // console.log(this.users[0].userName)
    })
  }
  
  // users = ['User1','User2', 'User3','User4', 'User5' ]
  openModal(content: any) {
    this.modal.open(content, { windowClass: 'dark-modal' });
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
 }

