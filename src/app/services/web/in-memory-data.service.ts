import { Injectable } from '@angular/core';
import { InMemoryDbService } from "angular-in-memory-web-api";
import { Member } from "../../member";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }
  createDb() {
    const members = [
      { id: 1, name: 'uguryildiz'},
      { id: 2, name: 'diginova'},
      { id: 3, name: 'kocaeli'}
    ];
    return {members};
  }

  genId(members: Member[]): number {
    return members.length > 0 ? Math.max(...members.map(member => member.id)) + 1 : 1;
  }
}
