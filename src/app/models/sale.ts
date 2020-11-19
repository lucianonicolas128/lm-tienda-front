export class Sale {
    constructor(
        public _id: string,
        public date: string,
        public products: string,
        public nameClient: string,
        public phoneClient: string,
        public emailClient: string,
        public shipping: string,
        public address: string,
        public city: string,
        public state: string,
        public pay: string,
        public total: number,
        public status: string

    ){}
}