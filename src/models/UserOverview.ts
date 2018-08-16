import { Account } from "./Account";

export class UserOverview {
    /**
     * private overview with settings etc
     */
    private _id: string; // 
    private _rev: string;
    private defaultUser;
    private allUsers: string [];

    constructor(_id: string, _rev?: string, defaultUser?: string, allUsers?: string [] ) {
        this._id = _id;
        if(_rev) 
        {
            this._rev = _rev;
        }
        if(defaultUser) 
        {
            this.defaultUser = defaultUser;
        }
        else {
            this.defaultUser = _id;
        }
        if(allUsers)
        {
            this.allUsers = allUsers;
        }
        else {
            this.allUsers = [];
        }
    }

    addUser(user: string)
    {
        this.allUsers.push(user);
    }

    getUsers() {
        return this.allUsers;
    }

    setDefaultUser(newDefaultUser: string): void {
        this.defaultUser = newDefaultUser;
    }

    getDefaultUser(): string {
        return this.defaultUser;
    }




}