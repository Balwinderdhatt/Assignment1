import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const bk_url = 'http://localhost:3000';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = {
    userName : "",
    password : ""
  }

  constructor(private router: Router, private httpClient: HttpClient) { }


  ngOnInit(): void {
  }
public loginFunc(){
  this.httpClient.post( bk_url + '/login', this.user).subscribe((data:any) =>{
    if (data.message == 'Success'){
      sessionStorage.setItem('userName', data.data.userName);
      sessionStorage.setItem('email', data.data.email);
      sessionStorage.setItem('id', data.data.id);
      sessionStorage.setItem('role', data.data.role);
      this.router.navigateByUrl('dash');
    }else{
      alert('Incorrect Username or Password')
    }
  })
    
}

}
