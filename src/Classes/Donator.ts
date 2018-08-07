export class Donator implements IDonator {
    user_id: number;
    name: string;
    amount: number;
    constructor(name: string, amount: number, user_id: number) {
        this.name = name;
        this.amount = amount;
        this.user_id = user_id;
    }
}

export interface IDonator {
    name: string;
    amount: number;
    user_id: number;
}

