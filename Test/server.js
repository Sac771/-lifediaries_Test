const express = require('express')
// exporting databse functions
const DB = require('./Database.js')

// to enable cors policy and share data to react
const cors = require('cors');


const app = express()
// to pass data in JSON formate
app.use(express.json())
app.use(cors());


//  Api's for Product ends
// for fetching all Products
app.get("/GetProducts", async (req, res) => {
    const product = await DB.Get_All_Product()
    res.send(product)
})

// for creating Product
app.post("/CreateProduct", async (req, res) => {
    const { Product_name, Product_Category, cost, Descr, Active_Inactive } = req.body
    await DB.Create_New_Product(Product_name, parseInt(Product_Category), parseInt(cost), Descr, Active_Inactive)
    res.status(201).send('Product created succesfully')
})

// for updating Product
app.post("/UpdateProduct/:id", async (req, res) => {
    const { Column, Value} = req.body
    const id = req.params.id
    const note = await DB.Update_Product(Column, Value, id)
    if(note==='wrong value inserted'){
    res.status(201).send(note)
    }
    else{
        res.status(201).send('update done succesfully')
    }
})

// for deleting product
app.delete("/DeleteProduct/:id", async (req, res) => {
    const id = req.params.id
    await DB.Delete_Product(id)
    res.status(201).send('Product Deleted succesfully')
})
//  Api's for Product ends


//  Api's for category starts

// for fetching all category
app.get("/GetCategorey", async (req, res) => {
    const category = await DB.Get_All_Cateogry()
    res.send(category)
})

// for creating category
app.post("/CreateCategory", async (req, res) => {
    const { Category_Name, Active_Inactive, Descr } = req.body
    DB.Create_New_cateogry(Category_Name, Active_Inactive, Descr)
    res.status(201).send('Category created succesfully')
})

// for updating category
app.post("/UpdateCategory/:id", async (req, res) => {
    const { Column, Value} = req.body
    const id = req.params.id
    const note = await DB.Update_cateogry(Column, Value, id)
    if(note==='wrong value inserted'){
    res.status(201).send(note)
    }
    else{
        res.status(201).send('update done succesfully')
    }
})

// for deleting category
app.delete("/DeleteCategory/:id", async (req, res) => {
    const id = req.params.id
    await DB.Delete_category(id)
    res.status(201).send('Category Deleted succesfully')
})

//  Api's for category ends

app.listen(3030, () => {
  console.log('Server is running on port 3030')
})