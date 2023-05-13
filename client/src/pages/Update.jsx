import React from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from "axios"
import { Link } from 'react-router-dom'
const Update = () => {

  const [book,setBook]=useState({
    title:"",
    description:"",
    price:null,
    cover:"",
    quantity:null
  })

// check the error
const[error,setError]=useState(false)

//navigate to home pageusing react-router-dom
const navigate=useNavigate()
const location=useLocation()   //to get the book id

const bookId=location.pathname.split("/")[2]


  const handleChange=(e) =>{
    setBook((prev)=>({ ...prev,[e.target.name]: e.target.value}))
  };


  const handleClick = async e=>{
    e.preventDefault()
    try {
      await axios.put("http://localhost:8800/books/"+bookId,book)
        navigate("/")
    } catch (err) {
      console.log(err)
    }
  }
  console.log(book);
  return (
    <div className='form'>
      <h1>Update the  Book</h1>
      <input type="text" placeholder='title'onChange={handleChange} name='title' />
      <input type="text" placeholder='description'onChange={handleChange}name='description' />
      <input type="number" placeholder='price'onChange={handleChange}name='price' />
      <input type="text" placeholder='cover'onChange={handleChange} name='cover'/>
      <input type="number" placeholder='quantity'onChange={handleChange} name='quantity' />
      
      {/* with this button we are sending our fields to backend server */}
      <button className="formButton"onClick={handleClick}>Update</button>
      {error && "Something went wrong!"}
      <Link to="/">See all books</Link>
    </div>
  )
}

export default Update
