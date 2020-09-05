import { Injectable } from '@angular/core';
import { Member } from "../../member";
//import { MEMBERS } from "../../members";
import { Observable, of } from "rxjs";
import { catchError,map,tap } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  private membersUrl = 'api/members';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(private http: HttpClient) { }

  getMembers(): Observable <Member[]> {
    return this.http.get<Member[]>(this.membersUrl)
      .pipe(
        tap(_ => console.log("HTTP Message","members fetched")),
        catchError(this.handleError<Member[]>('getMembers',[]))
      );
  }

  getMember(id: number): Observable<Member> {
    const url = this.membersUrl + "/" + id;
    return this.http.get<Member>(url)
      .pipe(
        tap(_ => console.log("HTTP Message","fetched member id=" + id)),
        catchError(this.handleError<Member>('getMemeber id=' + id))
      );
  }

  updateMember(member: Member): Observable<any> {
    return this.http.put(this.membersUrl, member,this.httpOptions)
      .pipe(
        tap(_ => console.log('HTTP Message', "update member id=" + member.id)),
        catchError(this.handleError<any>('UpdateMember'))
      );
  }

  addMember(member: Member): Observable<Member> {
    return this.http.post<Member>(this.membersUrl,member,this.httpOptions)
      .pipe(
        tap((newMember: Member) => console.log("HTTP Message","add member id=" + newMember.id)),
        catchError(this.handleError<Member>('AddMember'))
      );
  }

  deleteMember(member: Member): Observable<Member> {
    const url = this.membersUrl + "/" + member.id;
    return this.http.delete<Member>(url,this.httpOptions)
      .pipe(
        tap(_ => console.log("HTTP Message", "deleted member id =" + member.id)),
        catchError(this.handleError<Member>('DeleteMember'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T>  => {
      console.log("HTTP Error", error);
      return of(result as T);
    }
    
  }

}
