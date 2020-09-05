import { Component, OnInit } from '@angular/core';
import { Storage } from "@ionic/storage";
import { MEMBERS } from "../members";
import { Member } from '../member';
import { SQLService } from "../services/sql/sql.service";
import { MembersService } from "../services/data/members.service";
import { Router, NavigationExtras } from "@angular/router";
import { DataService } from "../services/route/data.service";

@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
})
export class MembersPage implements OnInit {

  //members = MEMBERS;
  members: Member[];
  selectedMember: Member;
  notes = [];

  constructor(private dataService: DataService,private router: Router ,private storage: Storage, private sqlService: SQLService, private membersService: MembersService) { }

  showDetail(member: any) {
    console.log(JSON.stringify(member));
    /*
    let navigationExtras: NavigationExtras = {
      queryParams: {
        m: JSON.stringify(member)
      }
    };
  
    this.router.navigate(['details'],navigationExtras);
    */

    /*
    this.dataService.setData(member.id,member);
    this.router.navigateByUrl('/details/' + member.id);
    */

   let navigationExtras: NavigationExtras = {
    state: {
      m: member
    }
  };

  this.router.navigate(['details'],navigationExtras);

  }

  getMembers(): void {
    this.membersService.getMembers().subscribe( members => this.members = members);
  }

  getNotes() {
    this.sqlService.db.executeSql('SELECT * FROM note').then((rs:any) => {
      this.sqlService.asArray(rs).then((list) => {
        this.notes = list;
        console.log(this.notes);
      })
    });
  }

  add(name: string): void {
    name = name.trim();
    if(!name) { return; }
    this.membersService.addMember({name} as Member)
      .subscribe(member => {
        this.members.push(member);
      })
  }

  delete(member: Member): void {
    this.membersService.deleteMember(member).subscribe(() => {
      this.getMembers();
    });
  }

  ngOnInit() {

    this.getMembers();

    this.sqlService.getDbState().subscribe( ready => {
      if(ready){
        this.getNotes();
      }
    })
  }

  ionViewWillEnter(){
    console.log("on init members");
  }

  onSelect(member: Member) {
    this.selectedMember = member;
    this.set('name',member.name);
  }

  getName(key: any) {
    console.log('Log:',key);
    this.get(key).then((value) => { console.log('Get Log:', value) });
  }

  set(key: any,value: any) {
    this.storage.set(key,value);
  }

  async get(key: any) {
    return await this.storage.get(key);
  }

  async remove(key: any) {
    return await this.storage.remove(key);
  }

  clear(){
    this.storage.clear().then(() => { console.log('Message','All keys deleted')});
  }

}
