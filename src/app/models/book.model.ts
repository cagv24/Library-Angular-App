export interface IBook {
    id: number;
    name: string;
    genre: string;
    format: string;
    autor: string;
    date: string;
    score: number;
    state: number;
}

export class Book implements IBook {
    id: number;
    name: string;
    genre: string;
    format: string;
    autor: string;
    date: string;
    score: number;
    state: number;

   constructor() {}
}
