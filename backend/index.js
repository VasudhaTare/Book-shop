//import express application
import express from "express"
import mysql from "mysql"
import cors from "cors"


const app=express()
//to run our app we have to listen a port number

//creating connection with database
const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"vasudha123",
    database:"test"


});
//by default you cannot send any data to your express server
app.use(express.json())
//middleware taaki backend api use krne de
app.use(cors())


// if there is a auth problem
//  ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'; 



//to reach our backend server
// "/" home page of the backend server
app.get( "/",(req,res)=>{
  //message to user
    res.json("hello this is the backend!")
})


// api to get all books from db

app.get("/books",(req,res)=>{
    const q="SELECT * FROM books"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

//? provides security
app.post("/books",(req,res)=>
{
    const q="INSERT INTO books (`title`,`description`,`price`,`cover`,`quantity`) VALUES(?)"
    const values=[
        req.body.title,
        req.body.description,
        req.body.price,
        req.body.cover,
        req.body.quantity
    ];
    db.query(q,[values],(err,data)=>{
        if(err)return res.json(err)
        return res.json("book has been created successfully")
    })
})

//to delete a book from the shop end point would be booka and we would also require an id for it
app.delete("/books/:id",(req,res)=>{
    const bookId=req.params.id;// params is books and id is book id
    const q="DELETE FROM books WHERE id=?"

    db.query(q,[bookId],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Book has been deleted successfully")
    })
})

//to update any book
app.put("/books/:id",(req,res)=>{
    const bookId=req.params.id;// params is books and id is book id
    const q="UPDATE books SET `title`=?, `description`=? `price`=?, `cover`=?, `quantity`=? WHERE id=?"


    const values=[
        req.body.title,
        req.body.description,
        req.body.price,
        req.body.cover, 
        req.body.quantity
    ]
    db.query(q,[...values,bookId],(err,data)=>{
        if(err) return res.json(err);
        return res.json("Book has been updated successfully")
    })
})

app.listen(8800,()=>{
    console.log("connected to backend")
})