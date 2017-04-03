import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { User } from '../../classes/user';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {

  private apiBase = "http://localhost:4201/auth/signin";
  private headers: Headers;
  private options: RequestOptions;
  private token: string;

  constructor(private http: Http) {

    this.headers = new Headers({ 'Content-Type': 'application/json', 
                                     'Accept': 'q=0.8;application/json;q=0.9' });
    this.options = new RequestOptions({ headers: this.headers });

  }

  authenticateUser(user: any): Observable<Boolean>{

  	return this.http.post(this.apiBase, JSON.stringify(user), this.options)
    .map((response: Response) => {

      let token = response.json() && response.json().token;
      if (token) {
          // set token property
          this.token = token;

          // store username and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(response.json()));

          // return true to indicate successful login
          return true;
      } else {
          // return false to indicate failed login
          return false;
      }
    })
  }

  getAuthToken():string {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
  }

  isLoggedIn() : boolean {
    if(JSON.parse(localStorage.getItem('currentUser')).token){
      return true;
    }
    else{
      return false;
    }
  }
}
