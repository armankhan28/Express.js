const db = require("../db")



module.exports.getAllEmployees = async () => {
    const sql__getAllEmployees = "SELECT * FROM employees ORDER BY id DESC;"
    const [rows] = await db.query(sql__getAllEmployees).catch(err => console.log("Error while fetching all employees \n", err))
    return rows
}


module.exports.getOneEmployeeById = async (id) => {
    const sql__getOneEmployeeById = `SELECT * FROM employees where id = ${id};`
    const [row] = await db.query(sql__getOneEmployeeById).catch(err => console.log("Error while fetching a employee by id \n", err))
    return row
}


module.exports.deleteOneEmployeeById = async (id) => {
    const sql__deleteOneEmployeeById = `DELETE  FROM employees where id = ${id};`
    const [{ affectedRows }] = await db.query(sql__deleteOneEmployeeById).catch(err => console.log("Error while deleting a employee by id \n", err))
    return affectedRows
}

module.exports.addEmployee = async (obj) => {

    const checkUser = await db.query(`select * from employees where employee_code=?`, obj.employee_code)
    const [records, fields] = await checkUser

    if (records.length > 0) {
        console.log("User already exist")
        return false
    } else {
        const sql__addEmployee = `INSERT INTO employees SET ?`
        const [{ affectedRows }] = await db.query(sql__addEmployee, obj).catch(err => console.log("Error while Adding a employee \n", err))

        if (affectedRows) {
            console.log("User Creation successfull")
            return true
        }
    }
}


module.exports.updateEmployee = async (id, input_data) => {
    const checkUser = await db.query("select * from employees where id = ?", id)
    const {name, employee_code, salary} = input_data

    if(checkUser.length > 0) {
        const query = `
            UPDATE employees 
            SET name = ? , employee_code = ? , salary = ?
            WHERE id = ? ; 
        `

        const [{affectedRows}] = await db.query(query, [name, employee_code, salary, id])
        
        if( affectedRows){
            console.log("Employee Updated Successfully ")
            return true
        } else {
            console.log("Employee update failed.")
            return false
        }
    }
}