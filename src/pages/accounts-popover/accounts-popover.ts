import { AccountsPage } from './../accounts/accounts';
import { ModalController, ViewController } from 'ionic-angular';
import { ModalProvider } from './../../providers/modal/modal';
import { Component } from '@angular/core';


/**
 * Generated class for the AccountsPopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  template: `
  <ion-list>
    <ion-list-header>Ionic</ion-list-header>
    <button ion-item (click)="addNewAccount()">Add a new account</button>
    <button ion-item (click)="transferBetweenOwnAccounts()">Transfer between accounts</button>
    <button ion-item (click)="transferBetweenExternalAccount()">Transfer from external account</button>
  </ion-list>
`
})
export class AccountsPopoverPage {

  constructor(public modalCtrl: ModalController, public viewCtrl: ViewController) {
  }

  addNewAccount() {
    this.viewCtrl.dismiss(); // dismiss the popover first
    this.modalCtrl.create(AccountsPage).present();  
  }

  transferBetweenOwnAccounts() {
    //this.modalCtrl.displayTransferBetweenOwnAccountsModal();

  }

  transferBetweenExternalAccount() {
   // this.modalCtrl.displayTransferBetweenExternalAccountsModal();

  }


}
