import { Operation } from "./operation.model";

export class AccountingEntry {
    isBalanced!: boolean

    constructor(
        public id: number,
        public label: '',
        public operations: Operation[],
        public debits: Operation[],
        public credits: Operation[],
    ){
        this.sortDebitCreditOperations();
        this.checkBalance();
    }

    private sortDebitCreditOperations(){
        this.operations.forEach( op => {
            if( op.amount >= 0 ){ this.credits.push(op) }
            else { this.debits.push(op) 

            }
        })
    }

    onAddDebitOperation( debit: Operation ): void {
        if( debit.amount < 0 ){
            this.debits.push( debit );
        }
        this.checkBalance();
    }
    onAddCreditsOperation( credit: Operation ): void {
        if( credit.amount > 0 ){
            this.credits.push( credit )
        }
        this.checkBalance();
    }

    getAllCredits(): number {
        let balance: number = 0;
        this.credits.forEach( op => balance += op.amount );
        return balance;
    }

    getAllDebits(): number {
        let balance: number = 0;
        this.debits.forEach( op => balance += op.amount );
        return balance;
    }

    getBalance(): number {
        return this.getAllCredits() + this.getAllDebits();
    }

    getValidity(): boolean {
        if( 
            this.getBalance() == 0 
            && this.credits.length != 0 
            && this.debits.length != 0 )
        {
            return true;
        } else return false;
    }

    private checkBalance():void {
        if( this.getBalance() == 0 ){
            this.isBalanced = true;
        }else {
            this.isBalanced = false;
        }
    }
}