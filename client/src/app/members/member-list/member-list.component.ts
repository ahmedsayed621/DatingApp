import { take } from 'rxjs/operators';
import { AccountService } from './../../_services/account.service';
import { UserParams } from './../../_models/userParams';
import { PaginatedResult, Pagination } from './../../_models/pagination';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
members:Member[];
pagination:Pagination;
userParams:UserParams;
user:User;
genderList=[{value: 'male',display:'Males' } , {value:'female' , display:'Females'}]


  constructor(private membersService:MembersService,private accountService:AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user=>{
      this.user=user;
      this.userParams= new UserParams(user);
    })
   }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(){
    this.membersService.getMembers(this.userParams).subscribe(response =>
      {
        this.members=response.result;
        this.pagination=response.pagination;
      })
  }
  resetFilters(){
    this.userParams = new UserParams(this.user);
    this.loadMembers();
  }

  pageChanged(event :any)
  {
    this.userParams.pageNumber=event.page;
    this.loadMembers();
  }



}
