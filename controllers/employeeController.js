const express = require("express")
const router = express.Router()
const service = require("../services/employeeService")

router.get("/", async (req,res) => {
    const employees = await service.getAllEmployees()
    res.send(employees)
})

router.get("/:id", async (req,res) => {
    const employee = await service.getOneEmployeeById(req.params.id)
    
    if (employee.length == 0)
        res.status(404).json("404! No record found with id: "+ req.params.id)
    else 
        res.send(employee)
})

router.delete("/:id", async (req,res) => {
    const data = await service.deleteOneEmployeeById(req.params.id)
    if(data) {
        res.send("Deleted Successfully")
    } else {
        res.send(`Sorry! id: ${req.params.id} not found to delete`)
    }
})

router.post("/", async (req, res) => {
    const input_data = req.body
    const db_response = await service.addEmployee(input_data)
    if (db_response) {
        res.status(201).json(`Employee Added Successfully`)
    } else {
        res.status(400).json(`Sorry! Employee Creation Failed.`)
    }
})


router.put("/:id", async (req, res) => {
    const input_data = req.body
    const id = req.params.id
    const db_response = await service.updateEmployee(id, input_data)
    if(db_response) {
        res.status(200).json("Employee Updated Successfully")
    } else {
        res.status(400).json("Sorry! Employee Updating failed")
    }
})


module.exports = router
