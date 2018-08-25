import { BudgetProvider } from './../../providers/budget/budget';
import {
  IconsPage
} from './../icons/icons';
import {
  ColorPickerPage
} from './../color-picker/color-picker';
import {
  Budget
} from './../../models/Budget';
import {
  Category
} from './../../models/Category';
import {
  Component
} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  PopoverController
} from 'ionic-angular';

/**
 * Generated class for the CategoryOptionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-category-options',
  templateUrl: 'category-options.html',
})
export class CategoryOptionsPage {
  public category: Category;
  public budget: Budget;
  public selectedColor: string;
  public selectedIcon: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public popoverCtrl: PopoverController, public budgetProvider: BudgetProvider) {
    this.category = this.navParams.data.category;
    this.budget = this.category.getBudget() || new Budget();
    this.selectedColor = this.category.getCategoryColor();
    this.selectedIcon = this.category.getIconName();
    
  }

  ionViewDidLoad() {
    console.log(this.category);
  }

  addNewBudget() {
    const prompt = this.alertCtrl.create({
      title: 'new budget',
      message: "Enter the budget limit for this category",
      inputs: [{
        name: 'limitAmount',
        placeholder: 'budget limit',
        type: 'number'
      }, ],
      buttons: [{
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: async data => {
            this.budget.setLimitAmount(data.limitAmount);
            await this.budgetProvider.updateBudget(this.category.getCategoryName(), this.budget);
          }
        }
      ]
    });
    prompt.present();
  }

  deleteBudget() {
    this.budgetProvider.deleteBudget(this.category.getCategoryName(), this.budget);
  }



  colorPickerPopover(ev) {
    let popover = this.popoverCtrl.create(ColorPickerPage);
    popover.present({
      ev: ev
    });
    popover.onDidDismiss(color => {
      if (color !== undefined) {
        this.selectedColor = color;
        this.category.setCategoryColor(color);
        // save to db here or wait until leaving page?

      } else {
        this.selectedColor = this.category.getCategoryColor();
      }

    });

  }

  iconsPopover(ev) {
    let popover = this.popoverCtrl.create(IconsPage);
    popover.present({
      ev: ev
    });
    popover.onDidDismiss(icon => {
      if (icon !== undefined) {
        this.selectedIcon = icon;
        this.category.setIconName(icon);
      } else {
        this.selectedIcon = this.category.getIconName();
      }
    });
  }


}
