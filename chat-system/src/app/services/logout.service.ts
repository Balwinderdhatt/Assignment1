import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SwitchComponentService } from './switch-component.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private router: Router) { }
  public logout(){
    alert("Succesfully logged out")
    this.router.navigateByUrl("")
    sessionStorage.clear()
  }

}
