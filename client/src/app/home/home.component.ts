import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode=false;

  @Input() usersFromHomeComponent:any;
  constructor() { }

  ngOnInit(): void {
  }
  RegisterToggle(){
    this.registerMode =! this.registerMode;
  }



  cancelRegisterMode(event:boolean)
  {
    this.registerMode=event;
  }



}
