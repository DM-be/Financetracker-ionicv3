import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the IconsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-icons',
  templateUrl: 'icons.html',
})
export class IconsPage {

  public icons: string [][];

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.icons = [
      ['football', 'bus', 'car', 'train'],
      ['basket', 'beer', 'cart', 'bonfire'],
      ['ice-cream', 'nutrition','pizza', 'pint'],
      ['pricetag', 'shirt', 'watch', 'glasses' ],
      ['cafe', 'happy', 'heart', 'bowtie'],
      ['school', 'construct', 'cog', 'hammer'],
      ['tablet-portrait', 'radio', 'headset', 'desktop']
    ]

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IconsPage');
  }

  test() {
    console.log('test')
  }

  dismiss(selectedIcon: string) {
    this.viewCtrl.dismiss(selectedIcon);
  }



}
