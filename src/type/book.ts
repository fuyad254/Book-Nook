export interface IBook {
    _id: string,
    title: string,
    author: string,
    category: string,
    copies: number,
    image: string,
    description : string,
    name: string,
    email: string,
}

export interface IBorrow {
    _id: string,
    bookId: string,
    title: string,
    image: string,
    userEmail: string,
    borrowDate: string,
    returnDate: string,
}