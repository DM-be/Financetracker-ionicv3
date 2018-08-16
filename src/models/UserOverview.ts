import { Account } from "./Account";

export class UserOverview {
    /**
     * contains all personal user settings, is stored in a user per user database
     * actual monthoverviews are shared in a shared database
     */

    
    private _id: string; // username 
    private _rev: string;
    // reminders, filtering options, etc etc

    constructor(_id: string, _rev?: string ) {
        this._id = _id;
        if(_rev) 
        {
            this._rev = _rev;
        }
    }

    getUserName(): string {
        return this._id;
    }



}