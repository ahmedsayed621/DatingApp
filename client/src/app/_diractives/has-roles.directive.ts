import { Directive, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Directive({
  selector: '[appHasRoles]'
})
export class HasRolesDirective implements OnInit {
  @Input() appHasRoles:string[];
  user:User;
  constructor(private viewContainerRef:ViewContainerRef,private templateRef:TemplateRef<any>,
    private accountService:AccountService) {
      this.accountService.currentUser$.pipe(take(1)).subscribe(user=>
        {
          this.user=user;
        })
     }
  ngOnInit(): void {
    /*clear the view if no roles*/
    if(!this.user?.roles || this.user==null)
    {
      this.viewContainerRef.clear();
      return;
    }

    if(this.user?.roles.some(r=>this.appHasRoles.includes(r)))
    {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
    else{
      this.viewContainerRef.clear();
    }
  }

}
