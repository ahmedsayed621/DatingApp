import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {};
  constructor(private accountService:AccountService) { }

  @Output() CancelRegister = new EventEmitter();


  ngOnInit(): void {
  }



  register() {
    this.accountService.register(this.model).subscribe(response=>{
      console.log(response);
      this.cancel();
    },
    erorr=>{
      console.log(erorr);
    }
    
    )
  }
  

  cancel() {
    this.CancelRegister.emit(false);
  }

}
