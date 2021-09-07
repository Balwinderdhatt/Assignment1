import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  constructor(private modal:NgbModal) { }

  ngOnInit(): void {
  }
createRoom(modal:any){
this.modal.open(modal,({ windowClass: 'creteRoom' }))
}
}
