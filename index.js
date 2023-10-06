const express = require("express")
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUI= require('swagger-ui-express')
const {connection} = require("./config/db")
const {userRouter} = require("./routes/user.route")
const {auth} = require("./controller/auth.controller")
const {bookRoute}  = require("./routes/book.route")
const PORT = 5050

const app = express()
app.use(express.json())
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Library Management System',
            version: '1.0.0',
        },
      servers:[
          {
              url:'http://localhost:5050/'
        }
      ]
    },
    apis: [,'./index.js','./routes/user.route.js','./routes/book.routes.js'], // files containing annotations as above
  };

const swaggerSpec=swaggerJsdoc(options)
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swaggerSpec))

/**
 * @swagger
 * /:
 *   get:
 *     summary: Welcome and API Health Check
 *     description: This API route is used for welcoming and checking whether the API methods are working correctly.
 *     responses:
 *       200:
 *         description: Returns a message to test the GET method and confirm API health.
 */
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