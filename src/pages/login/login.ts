import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform, Events, App, LoadingController, Tabs } from 'ionic-angular';
import {
  Http,
  Headers
} from '@angular/http';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public username: string;
  public password: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http ,
    public loadingController: LoadingController,
    public appCtrl: App,
    public events: Events,
    public platform: Platform,
    public alertCtrl: AlertController,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    let loader = this.loadingController.create({
      content: "Signing in..."
    })
    loader.present();
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let credentials = {
      username: this.username,
      password: this.password
    }
    this.http.post(
      'https://mighty-ravine-91955.herokuapp.com/auth/login',
      JSON.stringify(credentials), {
        headers: headers
      }).subscribe(async res => {
    
        this.appCtrl.getRootNav().setRoot(TabsPage);
        loader.dismiss();
    }, error => {
      loader.dismiss();
      
      this.alertCtrl.create({
        title: 'Bad request',
        subTitle: error.json().message,
        buttons: ['Dismiss']
      }).present();
    })
  }

}
