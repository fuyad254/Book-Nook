"use client";

import { authClient } from "@/lib/auth-client";
import { IBook } from "@/type/book";


interface BorrowBook{
  book: IBook;
}


const BorrowBookButton = ({ book }: BorrowBook) => {

const today = new Date();
const borrowDate = today.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
});

today.setDate(today.getDate() + 7);
const returnDate= today.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
});



  const {data: session} = authClient.useSession()
  const userEmail= session?.user.email

const borrowData= {
  bookId: book._id,
  title: book.title,
  image: book.image,
  userEmail: userEmail,
  borrowDate: borrowDate,
  returnDate: returnDate
}

const handleBorrowButton= async()=>{

  console.log(borrowData);

  const res= await fetch("http://localhost:5000/my-borrow",{
      method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(borrowData)
  })
 const data= res.json()
 console.log(data);
}


  return (
    <div>
      <button
        type="button"
        onClick={handleBorrowButton}
        className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#91c99e] px-7 py-3 text-sm font-semibold text-[#102017] shadow-lg shadow-emerald-950/30 transition hover:bg-[#a5d9af] active:scale-[0.99] sm:w-auto"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5Z" />
          <path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20" />
        </svg>
        Borrow This Book
      </button>

      
      
    </div>
  );
};

export default BorrowBookButton;
