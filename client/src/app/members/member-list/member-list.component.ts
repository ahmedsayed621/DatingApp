import { PaginatedResult, Pagination } from './../../_models/pagination';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
members:Member[];
pagination:Pagination;
pageNumber=1;
pageSize=5;
  constructor(private membersService:MembersService) { }

  ngOnInit(): void {
    this.loadMemebrs();
  }

  loadMemebrs(){
    this.membersService.getMembers(this.pageNumber,this.pageSize).subscribe(response =>
      {
        this.members=response.result;
        this.pagination=response.pagination;
      })
  }

  pageChanged(event :any)
  {
    this.pageNumber=event.page;
    this.loadMemebrs();
  }



}
