import { Expense } from "./Expense";
import { Account } from "./Account";
import { Category } from "./Category";
import { Tag } from "./Tag";
import * as moment from 'moment';
import { ExternalAccount } from "./ExternalAccount";

export class MonthOverView {

    private _id: string;
    private _rev: string;
    private categories: Category [];
    private accounts: Account []; 
    private usedTags: Tag []; // keeps track of all tags (for use in auto completion instead of looping over every expense)
    private externalAccounts: ExternalAccount [];

    // todo: 
    constructor(_id: string, accounts: Account [], categories?: Category [] , _rev?: string, usedTags?: Tag [], externalAccounts?: ExternalAccount []) {
        this._id = _id;
        this._rev = _rev;// to do if else or always start with empty arr? be consistent

        this.categories = [];
        this.accounts = [];
        this.usedTags = [];
        this.externalAccounts = [];
        if(!(accounts instanceof Account))
        {
            this.accounts = accounts.map(a => new Account(a.owner, a.accountName, a.initialBalance, a.finalBalance, a.transactions));
        }
        else {
            this.accounts = accounts;
        }
        if(categories)
        {
            this.categories = categories.map(c => new Category(c.categoryName,c.chartColor, c.expenses, c.budget, c.createdDate ));
        }
        if(usedTags)
        {
            this.usedTags = usedTags.map(t => new Tag(t.tagName, t.createdDate));
        }
        if(externalAccounts)
        {
            this.externalAccounts = externalAccounts.map(acc => new ExternalAccount(acc.accountHolderName, acc.dateCreated));
        }

      
    }

    public getAllAccounts(): Account []
    {
        return this.accounts;
    }

    public getExternalAccounts(): ExternalAccount []
    {
        return this.externalAccounts;
    }

    public getAccByName(accountName: string): Account
    {
        return this.accounts.find(account => account.getAccountName() === accountName);
    
    }

    public getCategoryByName(categoryName: string): Category 
    {
        return this.categories.find(category => category.getCategoryName() === categoryName);
    }

    public addCategory(category: Category): void 
    {
        this.categories.push(category);
    }

    public containsCategory(categoryName: string): boolean {
        // refactor
        let index = this.categories.findIndex(category => category.getCategoryName() === categoryName);
        if(index === -1)
        {
            return false;
        }
        else {
            return true;
        }
    }

    public addTagsToUsedTags(tags: Tag[])
    {
       tags.forEach(tag => {
           if((this.usedTags.findIndex(t => t.getTagName() === tag.getTagName()) === -1))
           {
            let newTagWithDate = new Tag(tag.getTagName(), tag.getCreatedDate());
            this.addTagToUsedTags(newTagWithDate);
           }
       });
    }

    public addExternalAccount(externalAccount: ExternalAccount)
    {
        if((this.externalAccounts.findIndex(acc => acc.getAccountHolderName() === externalAccount.getAccountHolderName()) === -1))
        {
            this.externalAccounts.push(externalAccount);
        }
    }

    private addTagToUsedTags(tag: Tag)
    {
        this.usedTags.push(tag);
    }

    public getArrayOfCategoryNames() {
        return this.categories.map(c => c.categoryName);
    }

    public clearExpensesFromCategories() {
        this.categories.forEach(category => {
            category.clearExpenses();
        });
    }

    public clearCurrentAmountSpentInBudget() {
        this.categories.forEach(category => {
            category.clearCurrentAmountSpentInBudget();
        });
    }

    public clearTransactionsFromAccounts() {
        this.accounts.forEach(account => account.clearTransactions());
    }

    public getCategories(): Category [] {
        return this.categories;
    }

    public getTotalAmountSpent(): number {
        let totalAmountSpent = 0;
        this.categories.forEach(category => {
            totalAmountSpent += category.budget.currentAmountSpent;
        });

        return totalAmountSpent;
    }

    public getAllExpenses(): Expense [] {

        let expenses = [];
        this.categories.forEach(category => {
            category.getExpenses().forEach(expense => {
                expenses.push(expense);
            });
        });
        return expenses;
        
    }

    public getExpensesByAccountName(accountName: string): Expense [] {
        let expenses = [];
        this.categories.forEach(category => {
            category.getExpenses().forEach(expense => {
                if(expense.usedAccountName === accountName)
                {
                    expenses.push(expense);
                }
                
            });
        });
        return expenses;
    }



    


}