import React, { useEffect, useState } from 'react';
import  axios  from "axios";
import { Link } from "react-router-dom";

  // axios is used to fetch all the data from backend server

const Books = () => {
   //use state store our books in this use state
   const[books,setBooks]=useState([])

   useEffect(()=>{
    const fetchAllBooks =async()=>{// async function because we are making an api request
    
        try{
            const res= await axios.get("http://localhost:8800/books") //as async function so we have to await
        //  console.log(res)
        setBooks(res.data);
        }catch(err){
            console.log(err)
        }
 
    }
    fetchAllBooks()
   },[])// dependency is gonna be an empty array as its just gonna run once


const handleDelete = async (id)=>{
  try {
    await axios.delete("http://localhost:8800/books/"+id)
     window.location.reload() //to reload the page
  } catch (err) {
    console.log(err)
  }
}


  return (
    <div>
   <h1>V Book Shop</h1>
   <div className="books">
    {/* we use book array in a map and in map we need to use a unique key */}
    {
      books.map((book)=>(
        <div className="book" key={book.id}>

        { book.cover && <img src={book.cover}alt="" />}
        <h2>{book.title}</h2>
        <p>{book.description}</p>
        <span> ${book.price}</span>
        <span>{book.quantity} copies</span>
        {/* to update and delete the books   as we had to send book id here so we created this function */}
        <button className="delete" onClick={()=>handleDelete(book.id)}>Delete</button>
        <button className="update"><Link to={`/update/${book.id}`}>Update</Link></button>
        </div>
      ))
    }
   </div>
   {/* button thats gonna redirect us to app page */}
   <button className="addHome">
    <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}> Add new Book</Link>
   </button>
    </div>
  )
}

export default Books
