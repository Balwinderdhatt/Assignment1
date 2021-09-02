import { Component, OnInit } from '@angular/core';
import { SwitchComponentService } from '../services/switch-component.service';

@Component({
  selector: 'app-grouphome',
  templateUrl: './grouphome.component.html',
  styleUrls: ['./grouphome.component.css']
})
export class GrouphomeComponent implements OnInit {
  group :any
  constructor(private switchComp:SwitchComponentService) { }

  ngOnInit(): void {
    this.group = this.switchComp.group 
    console.log(this.group)
  }

}
