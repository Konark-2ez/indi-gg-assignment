const express = require("express")
const {connection} = require("./config/db")
const {userRouter} = require("./routes/user.route")
const {auth} = require("./controller/auth.controller")
const {bookRoute}  = require("./routes/book.route")
const PORT = 5050

const app = express()
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("Home Page")
})
app.use("user",userRouter)
app.use(auth)
app.use("book",bookRoute)


app.listen(PORT,async()=>{
    try {
        await connection
        console.log("Connected to DB")
    } catch (error) {
        console.log(error)
    }
    console.log(`App is running at port ${PORT}`)
})