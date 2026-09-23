import { Operation } from "./operation.model";

export class FinancialAccount {
    constructor(
        public id: number,
        public name: string,
        public code: number,
        public operations: Operation[]
    ){}
}