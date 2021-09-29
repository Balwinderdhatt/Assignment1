import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import {io,Socket}  from 'socket.io-client';
const bk_url = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  
  private socket: any;
  constructor() { }

  public initSocket(): void{
    this.socket = io(bk_url)
    console.log(this.socket)
  }
  public send(message: string): void{
    this.socket.emit('message', message)
    console.log(message)
  }
  onMessage(): Observable<any>{
    let observable = new Observable(observer =>{
      this.socket.on('message', (data:string)=>{
        observer.next(data)
        console.log(data)
      })
    })
    return observable;
  }
}
