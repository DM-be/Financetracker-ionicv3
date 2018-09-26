import { UserOverviewProvider } from './../user-overview/user-overview';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  private loggedInUsername: string; // sets set when user logs in/registers
  private isNewUser: boolean; 

  constructor(public userOverviewProvider: UserOverviewProvider) {}  
  public getLoggedInUserName(): string {
    return this.loggedInUsername;
  }

  public setLoggedInUsername(username: string): void {
    this.loggedInUsername = username;
  }

  public setIsNewUser(newUser: boolean)
  {
    this.isNewUser = newUser;
  }

  public getIsNewUser(): boolean {
    return this.isNewUser;
  }


  // todo add settings etc here


}
