require("dotenv").config()
require("express-async-errors")

const express=require("express")
const notFound=require("./middleware/NotFound")
const db = require("./model/DbConnection")
const fileupload=require("express-fileupload")
const router = require("./router/contactrouter")
const errorHandlerMIddleware = require("./middleware/errorhandler")

const app=express()
const PORT=process.env.PORT

app.use(express.json())
app.use(fileupload())
app.use(express.static("./public"))
app.use("/api/contact",router)
app.use(notFound)
app.use(errorHandlerMIddleware)

async function server(){
    try {
        db.sequelize.sync()
        app.listen(PORT,()=>{
            console.log(`Your server is started on PORT:${PORT}`)
        })
    } catch (error) {
        console.log(error)
        
    }  

}
server()