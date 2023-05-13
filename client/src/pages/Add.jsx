import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { Link } from 'react-router-dom'
const Add = () => {

  const [book,setBook]=useState({
    title:"",
    description:"",
    price:null,
    cover:"",
    quantity:null
  })
// to check error
const [error,setError]=useState(false)

//navigate to home pageusing react-router-dom
const navigate=useNavigate()



  const handleChange=(e) =>{
    setBook((prev)=>({ ...prev,[e.target.name]: e.target.value}))
  };


  const handleClick = async e=>{
    e.preventDefault()
    try {
      await axios.post("http://localhost:8800/books",book)
        navigate("/")
    } catch (err) {
      console.log(err)
      setError(true)
    }
  }
  console.log(book);
  return (
    <div className='form'>
      <h1>Add New Book</h1>
      <input type="text" placeholder='title'onChange={handleChange} name='title' />
      <input type="text" placeholder='description'onChange={handleChange}name='description' />
      <input type="number" placeholder='price'onChange={handleChange}name='price' />
      <input type="text" placeholder='cover'onChange={handleChange} name='cover'/>
      <input type="number" placeholder='quantity'onChange={handleChange} name='quantity' />
      
      {/* with this button we are sending our fields to backend server */}
      <button className='formButton'  onClick={handleClick}>Add</button>
      {error && "Something went wrong!"}
      <Link to="/">See all books</Link>
    </div>
  )
}

export default Add
