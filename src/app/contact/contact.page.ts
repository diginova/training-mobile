import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Platform } from "@ionic/angular";
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  constructor(private router: Router, public platform: Platform) { }

  ngOnInit() {
    console.log(JSON.stringify(this.platform.platforms()));
    this.platform.resize.subscribe(async () => {
      console.log('resized' + 'W: ' + this.platform.width() + 'H: ' + this.platform.height());
    });
  }

  ionViewWillEnter(){
    console.log("on init contact");
  }

  goMembers() {
    this.router.navigate(['/members']);
  }

}
