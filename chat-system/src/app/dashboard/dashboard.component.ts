import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutService } from '../services/logout.service';
import { SwitchComponentService } from '../services/switch-component.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  comp = '';
  // this.switchComp.
  constructor(private router: Router, public switchComp:SwitchComponentService, private logoutService: LogoutService) {
     }

  ngOnInit(): void {
    this.comp = 'Users'
    this.switchComp.event1.subscribe(() =>{
      this.comp = this.switchComp.comp
    })
  }
  userName = sessionStorage.getItem('userName');
  email = sessionStorage.getItem('email');
  role = sessionStorage.getItem('role');
  logout(){
    this.logoutService.logout()
  }
  public selectComponent(x:string){
    this.switchComp.selectComponent(x);
  }
  
}

