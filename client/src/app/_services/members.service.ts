import { UserParams } from './../_models/userParams';
import { PaginatedResult } from './../_models/pagination';
import { map, take } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { AccountService } from './account.service';
import { User } from '../_models/user';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';



@Injectable({
  providedIn: 'root'
})
export class MembersService {
baseUrl=environment.apiUrl;
members:Member[]=[];
memberCache = new Map();
user: User
userParams:UserParams;

  constructor(private http:HttpClient, private accountService:AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user=>{
      this.user=user;
      this.userParams= new UserParams(user);
    })
  }

  getUserParams(){
    return this.userParams;
  }

  setUserParams(params:UserParams){
       this.userParams=params;
  }

  resetUserParams(){
    this.userParams=new UserParams(this.user)
    return this.userParams;
  }

  getMembers(userParams:UserParams) {
    var response = this.memberCache.get(Object.values(userParams).join('-'));
    if(response){
      return of(response)
    }
    // if(this.members.length>0) return of(this.members);
    let params = getPaginationHeaders(userParams.pageNumber,userParams.pageSize);

    params=params.append('minAge',userParams.minAge.toString())
    params=params.append('maxAge',userParams.maxAge.toString())
    params=params.append('gender',userParams.gender.toString())
    params=params.append('orderBy',userParams.orderBy.toString())

    return getPaginatedResult<Member[]>(this.baseUrl+'users',params,this.http)
    .pipe(map(response=>
      {
        this.memberCache.set(Object.values(userParams).join('-'), response);
        return response;
      }))
  }



  getMember(username:string){
    const member =[...this.memberCache.values()]
    .reduce((arr, elm)=> arr.concat(elm.result), [])
    .find((member:Member)=>member.username ===username);

    if(member){
      return of(member)
    }


    return this.http.get<Member>(this.baseUrl+'users/'+username)
  }
  updateMmeber(member:Member)
  {
    return this.http.put(this.baseUrl+'users',member).pipe(
      map(()=>{
        const index=this.members.indexOf(member);
        this.members[index]=member;
      })
    )
  }

  setMainPhoto(photoId:number){
    return this.http.put(this.baseUrl+'users/set-main-photo/'+photoId,{});
  }

  deletePhoto(photoId:number)
  {
    return this.http.delete(this.baseUrl+'users/delete-photo/'+photoId);
  }

  addLike(username: string)
  {
    return this.http.post(this.baseUrl + 'likes/'+ username, {});
  }

  getLikes(predicate:string)
  {
    return this.http.get<Partial<Member[]>>(this.baseUrl + 'likes?predicate='+ predicate);
  }
}
