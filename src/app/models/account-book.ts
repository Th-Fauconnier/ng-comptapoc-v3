import { AccountingEntry } from "./accounting-entry";

export class AccountBook {
    public accountingEntries!: AccountingEntry[];

    constructor(
        public id: number,
        public name: string,
        public description: string
    ){
        {
            this.accountingEntries = [];
        }
    }
}
