import { StockTalles } from './stockTalles';


export class Product {
    constructor(
        public _id: string,
        public name: string,
        public description: string,
        public category: string,
        public cost: number,
        public price: number,
        public offer: number,
        public stock: number,
        public image: string,
        public stockTalles: string
        // public stockTalles: StockTalles[] = []
    ) {}
}