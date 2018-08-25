import { Category } from './../../models/Category';
import { CategoryProvider } from './../../providers/category/category';
import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController,
  PopoverController
} from 'ionic-angular';
import {
  ColorPicker
} from '../../components/color-picker/color-picker';
import {
  ColorPickerPage
} from '../color-picker/color-picker';
import {
  IconsPage
} from '../icons/icons';

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
  public selectedIcon: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public popoverCtrl: PopoverController, public categoryProvider: CategoryProvider) {}

  colorPickerPopover(ev) {
    // this.modalCtrl.create(ColorPickerPage).present();
    let popover = this.popoverCtrl.create(ColorPickerPage);
    popover.present({
      ev: ev
    });
    popover.onDidDismiss(color => {
      if (color !== undefined) {
        this.selectedColor = color
      } else {
        this.selectedColor = '#000000';
      }

    });

  }

  getSelectedColor() {
    return this.selectedColor || '#000000';
  }

  iconsPopover() {
    let popover = this.popoverCtrl.create(IconsPage);
    popover.present();
    popover.onDidDismiss(icon => {
      if (icon !== undefined) {
        this.selectedIcon = icon
      } else {
        this.selectedIcon = "add-circle"
      }
    });

  }

  getSelectedIcon() {
    return this.selectedIcon || 'add-circle';
  }

  dismiss() {
    this.navCtrl.pop();
  }

  async addNewCategory() {
    // implement checking for form validity (formbuilder instead of ngmodel?)
    // add logic for adding category
    let category = new Category(this.categoryName, this.selectedColor)
    await this.categoryProvider.addCategory()
    this.navCtrl.pop();
  }


}
