import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import {io,Socket}  from 'socket.io-client';
// Socket namespace
const bk_url = 'http://localhost:3000/chat';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  
  private socket: any;
  constructor() { }

  public initSocket(): void{
    this.socket = io(bk_url)
    // console.log(this.socket)
  }
  inRoom(room:any):void{
    this.socket.emit("inRoom", room)
  }
  joinRoom(selection:any):void{
    this.socket.emit("joinRoom", selection)
  }

  leaveRoom(selection:any):void{
    this.socket.emit("leaveRoom", selection)
  }

  joined(next:any){
    this.socket.on('joined', (res:any) =>next(res))
  }

  createRoom(newroom:any){
    this.socket.emit("newRoom", newroom)
  }

  reqUsercount(selection:any){
    this.socket.emit("userCount", selection)
  }

  reqRoomList(){
    this.socket.emit('roomList', "list Please")
  }

  getRoomList(next:any){
    this.socket.on('roomList', (res:any) =>next(res))
  }

  notice(next:any){
    this.socket.on('notice', (res:any) =>next(res))
  }

 

  public send(message: any){
    this.socket.emit('message', message)
    // console.log(message)
  }

  onMessage(): Observable<any>{
    let observable = new Observable(observer =>{
      this.socket.on('message', (data:any)=>{
        observer.next(data)
        // console.log(data)
      })
    })
    return observable;
  }
}
