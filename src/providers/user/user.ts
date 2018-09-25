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

  private loggedInUsername: string;

  constructor(public userOverviewProvider: UserOverviewProvider) {
  }

   public async getLoggedInUserName(): Promise<string> {
    let userOverview = await this.userOverviewProvider.getUserOverview();
    return userOverview.getUserName();
  }

  public setLoggedInUsername(username: string): void {
    this.loggedInUsername = username;
  }


  // todo add settings etc here


}
