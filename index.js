const express = require("express")
const employeeRoutes = require("./controllers/employeeController")
const db = require("./db")

// config
const app = express()

//middleware
app.use(express.json())


app.use("/api/employee", employeeRoutes)

//check db connection
db.query("select 1")
    .then(res => {
        console.log("Database connection successful \n")
        app.listen(process.env.SERVER_PORT, console.log(`Server running on port ${process.env.SERVER_PORT}`))
    })
    .catch(err => console.log("Database connection failed", err))




