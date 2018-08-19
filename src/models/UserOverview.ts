import { Account } from "./Account";
import { ExternalAccount } from "./ExternalAccount";

export class UserOverview {
    /**
     * contains all personal user settings, is stored in a user per user database
     * actual monthoverviews are shared in a shared database
     */

    public _id: string; // username aquired by logging in
    public _rev: string;
    public externalAccounts: ExternalAccount []; // used for autocomplete in transfer-external page

    // reminders, filtering options, etc etc

    constructor(_id: string, _rev?: string, externalAccounts?: ExternalAccount [] ) {
        this._id = _id;
        if(_rev) 
        {
            this._rev = _rev;
        }
        if(externalAccounts)
        {
            this.externalAccounts = externalAccounts.map(acc => new ExternalAccount(acc.accountHolderName, acc.dateCreated));
        }
    }

    getUserName(): string {
        return this._id;
    }

    public getExternalAccounts(): ExternalAccount []
    {
        return this.externalAccounts;
    }

    public addExternalAccount(externalAccount: ExternalAccount)
    {
        if((this.externalAccounts.findIndex(acc => acc.getAccountHolderName() === externalAccount.getAccountHolderName()) === -1))
        {
            this.externalAccounts.push(externalAccount);
        }
    }



}