import { Message } from './../../_models/message';
import { MembersService } from 'src/app/_services/members.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery-9';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { MessageService } from 'src/app/_services/message.service';


@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {
  @ViewChild('memberTabs',{static:true}) memberTabs:TabsetComponent;
  member:Member;
  messages:Message[]=[];
galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  activeTab:TabDirective;

  constructor(private memberService:MembersService,private route:ActivatedRoute,
    private messageService:MessageService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data=>{
      this.member=data.member;
    })
    this.route.queryParams.subscribe(params=>{
      params.tab ? this.selectTab(params.tab):this.selectTab(0)})

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ]
    this.galleryImages = this.getImages();
  }

  getImages(): NgxGalleryImage[] {
    const imageUrls = [];
    for (const photo of this.member.photos) {
      imageUrls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url
      })
    }
    return imageUrls;
  }

  
  loadMessages()
  {
    this.messageService.getMessagesThread(this.member.username).subscribe(messages=>{
      this.messages=messages
    })
  }

  selectTab(tabId:number)
  {
    this.memberTabs.tabs[tabId].active=true;
  }
  onTabActivated(data:TabDirective)
  {
    this.activeTab=data;
    if(this.activeTab.heading==='Messages' && this.messages.length === 0)
    {
      this.loadMessages();
    }

  }

}
