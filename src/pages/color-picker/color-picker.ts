import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ColorPickerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-color-picker',
  templateUrl: 'color-picker.html',
})
export class ColorPickerPage {
  public hexColor: string = '#FF0000';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ColorPickerPage');
  }

  ionViewDidEnter(){
   console.log('in colorpicker page')
  }

  setColor(ev: any) {
    this.hexColor = ev;

  }

  colorTouchStart() {
    
  }

  colorTouchEnd() {

  }

}
