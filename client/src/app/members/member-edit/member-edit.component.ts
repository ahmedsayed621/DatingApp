import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { MembersService } from './../../_services/members.service';
import { AccountService } from './../../_services/account.service';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm:NgForm;
  @HostListener('window:beforeunload',['$event']) unloadNotification($event:any)
  {
    if(this.editForm.dirty)
     $event.returnValue=true;
  }
  member:Member;
  user:User

  constructor(private accountService:AccountService, private memberService:MembersService,
    private toastr:ToastrService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user=user);
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(){
    this.memberService.getMember(this.user.username).subscribe(member=>this.member=member);
  }

  updateMember()
  {
    this.memberService.updateMmeber(this.member).subscribe(()=>{
      this.toastr.success("profile update successfully");
      this.editForm.reset(this.member);
    })

  }

}
