import { FinancialAccount } from "./financial-account.model";

export class Operation {
    constructor(
        public id: number,
        public label: string,
        public financialAccount: FinancialAccount | undefined,
        public date: Date,
        public amount: number
    ){} 

}