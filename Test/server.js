const express = require('express')
// exporting databse functions
const DB = require('./Database.js')

// to enable cors policy and share data to react
const cors = require('cors');


const app = express()
// to pass data in JSON formate
app.use(express.json())
app.use(cors());

// for fetching all category
app.get("/GetCategorey", async (req, res) => {
    const notes = await DB.Get_All_Cateogry()
    res.send(notes)
})

// for creating category
app.post("/CreateCategory", async (req, res) => {
    const { Category_Name, Active_Inactive, Descr } = req.body
    const note = await DB.Create_New_cateogry(Category_Name, Active_Inactive, Descr)
    res.status(201).send('Category created succesfully')
})

// for updating category
app.post("/UpdateCategory/:id", async (req, res) => {
    const { Column, Value} = req.body
    const id = req.params.id
    const note = await DB.Update_cateogry(Column, Value, id)
    res.status(201).send('Category Updated succesfully')
})

app.delete("/DeleteCategory/:id", async (req, res) => {
    const id = req.params.id
    const note = await DB.Delete_category(id)
    res.status(201).send('Category Deleted succesfully')
})

app.listen(3030, () => {
  console.log('Server is running on port 3030')
})