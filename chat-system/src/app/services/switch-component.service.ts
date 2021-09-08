import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';

@Injectable({
  providedIn: 'root'
})
export class SwitchComponentService {
  comp = '';
  group :any;
  room: any;
  constructor() { }
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
  this.event2.emit(this.group)
  // console.log(this.group)
}
selectedRoom(room:any){
  this.room = room;
  this.event3.emit(this.room)

}
}
