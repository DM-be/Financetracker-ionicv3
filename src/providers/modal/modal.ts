import { TransferPage } from './../../pages/transfer/transfer';
import { TransferExternalPage } from './../../pages/transfer-external/transfer-external';
import { AccountsPage } from './../../pages/accounts/accounts';
import { ModalController, NavController } from 'ionic-angular';

import { Injectable } from '@angular/core';

/*
  Generated class for the ModalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ModalProvider {

  constructor(public modalCtrl: ModalController) {}

  displayTransferBetweenOwnAccountsModal() {
    this.modalCtrl.create(TransferPage).present();
  }

  displayTransferBetweenExternalAccountsModal() {
    this.modalCtrl.create(TransferExternalPage).present();

  }

  displayAddAccountModal() {
    this.modalCtrl.create(AccountsPage).present();
  }
}
