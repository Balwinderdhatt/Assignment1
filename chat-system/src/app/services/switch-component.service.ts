import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
const bk_url = 'http://localhost:3000';
@Injectable({
  providedIn: 'root'
})
export class SwitchComponentService {
  comp = '';
  group :any;
  room: any;
  users = Array()
  constructor(public router: Router, public httpClient:HttpClient) { }
  event1 : EventEmitter<string> = new EventEmitter<string>()
  event2 : EventEmitter<any> = new EventEmitter<any>()
  event3 : EventEmitter<any> = new EventEmitter<any>()

selectComponent(x:string){
    this.comp = x;
    // this.group = group;
    this.event1.emit(this.comp)
    
  }
selectedGroup(group:any){
  this.group = group;
  // this.getUsers()
  this.event2.emit(this.group)
  // console.log(this.group)
}
selectedRoom(room:any){
  this.room = room;
  this.event3.emit(this.room)
  this.router.navigateByUrl('room');

}
// getUsers(){
//   this.group.users.forEach((element:any) => {
//     // console.log(element)
//     this.httpClient.post(bk_url + '/findUser', element).subscribe((data:any)=>{
//       this.users.push(data);
//       console.log(data)
//       // this.users.map((obj)=>{
//       //   obj.checked = false
//       // })
//   });
// })
// this.group.users = this.users
// }
}
