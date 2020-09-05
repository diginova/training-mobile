import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  data: any;

  constructor(private router: Router, private route: ActivatedRoute) { 
    /*
    this.route.queryParams.subscribe( params => {
      if(params && params.m) {
        this.data = JSON.parse(params.m);
      }
    });
    */
   this.route.queryParams.subscribe(params => {
     if(this.router.getCurrentNavigation().extras.state) {
       this.data = this.router.getCurrentNavigation().extras.state.m;
     }
   })
  }

  ngOnInit() {
    /*
    if(this.route.snapshot.data['m']) {
      this.data = this.route.snapshot.data['m'];
    }
    */
  }

}
