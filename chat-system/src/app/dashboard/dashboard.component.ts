import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  comp = '';
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.comp = 'Users'
  }
  userName = sessionStorage.getItem('userName');
  email = sessionStorage.getItem('email');
  role = sessionStorage.getItem('role');
  public logout(){
    alert("Succesfully logged out")
    this.router.navigateByUrl("")
    sessionStorage.clear()
  }
  public selectComponent(x:string){
    this.comp = x
    console.log(x)
  }
}
