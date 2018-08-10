import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, PopoverController } from 'ionic-angular';
import { ColorPicker } from '../../components/color-picker/color-picker';
import { ColorPickerPage } from '../color-picker/color-picker';

/**
 * Generated class for the CategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {

  public categoryName: string;
  public budgetNumber: string; 
  public selectedColor: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public popoverCtrl: PopoverController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPage');
  }

  colorPickerModal() {
   // this.modalCtrl.create(ColorPickerPage).present();
   let popover = this.popoverCtrl.create(ColorPickerPage);
   popover.present();
   popover.onDidDismiss(color => this.selectedColor = color);
   
  }

  getSelectedColor()
  {
    return this.selectedColor || '#000000';
  }

  

}
