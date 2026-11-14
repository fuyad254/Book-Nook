import React from 'react';


const page = async() => {

    const res = await fetch("http://localhost:5000/books")
    const books= await res.json()
    console.log(books);

    return (
        <div>
            {books.map(b => b.title)}
                
        </div>
    );
};

export default page;