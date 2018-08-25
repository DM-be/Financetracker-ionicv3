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
  AlertController
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.category = this.navParams.data.category;
    this.budget = this.category.getBudget() || new Budget();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryOptionsPage');
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
          handler: data => {
            this.budget.setLimitAmount(data.limitAmount);

          }
        }
      ]
    });
    prompt.present();
  }


}
