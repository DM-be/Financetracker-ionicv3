
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Platform, Events, App, LoadingController, Tabs } from 'ionic-angular';
import {
  Http,
  Headers
} from '@angular/http';
import { TabsPage } from '../tabs/tabs';
import { DbProvider } from '../../providers/db/db';
import { AccountsPage } from '../accounts/accounts';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  public name: string;
  public username: string;
  public email: string;
  public password: string;
  public confirmPassword: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http ,
    public loadingController: LoadingController,
    public appCtrl: App,
    public events: Events,
    public platform: Platform,
    public alertCtrl: AlertController,
    public dbProvider: DbProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  register() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    };
    let loader = this.loadingController.create({
      content: "Signing up..."
    })
    loader.present();
    this.http.post('https://mighty-ravine-91955.herokuapp.com/auth/register', JSON.stringify(user), {
        headers: headers
      })
      .subscribe(res => {
      
      this.dbProvider.initSignUp(res.json());
      loader.dismiss();
      this.appCtrl.getRootNav().setRoot(AccountsPage);
         // have to wait for the shared DB to be in sync to register new users
      }, error => {
          loader.dismiss();
          // let errorObject = error.json().validationErrors
          // Object.values(errorObject).forEach((error: string) => {
          //   this.alertCtrl.create({
          //   title: 'Bad request',
          //   message: error,
          //   buttons: ['Dismiss']
          // }).present();
          // });

      });
  }

}
