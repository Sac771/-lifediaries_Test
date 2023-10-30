const mysql= require('mysql2')

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'sachin',
    database: 'Product',
  }).promise()



//  modules for Product starts

// returns all products.
async function Get_All_Cateogry(){
  const [rows] = await pool.query("select * from Product")
  return rows
}

// Creates a new products.
async function Create_New_cateogry(Product_name, Product_Category, Cost, Descr, Active_Inactive) {
  const [result] = await pool.query(`INSERT INTO Product_Category (Product_name,Product_Category,cost,Descr,Active_Inactive) VALUES (?, ?, ?, ?, ?)`, [Product_name, Product_Category, cost, Descr, Active_Inactive])
  return result
}

// Updating a product.
async function Update_cateogry(Column, Value, Id) {
  const [result] = await pool.query(`UPDATE Product SET ${Column} = ? WHERE id=?;`, [Value, parseInt(Id)])
  return result
}

// Deleting a product
async function Delete_category(Id) {
  const [result] = await pool.query(`DELETE FROM Product WHERE id=?;`, [parseInt(Id)])
  return result
}

//  modules for Product ends

//  modules for category starts
// returns all category of products.
async function Get_All_Cateogry(){
  const [rows] = await pool.query("select * from Product_Category")
  return rows
}

// Creates a new category of products.
async function Create_New_cateogry(Category_name, Active_Inactive, Descr) {
  const [result] = await pool.query(`INSERT INTO Product_Category (Category_Name,Active_Inactive,Descr) VALUES (?, ?, ?)`, [Category_name, Active_Inactive, Descr])
  return result
}

// Updating a category of products.
async function Update_cateogry(Column, Value, Id) {
  const [result] = await pool.query(`UPDATE Product_Category SET ${Column} = ? WHERE id=?;`, [Value, parseInt(Id)])
  return result
}

// Deleting a category of products
async function Delete_category(Id) {
  const [result] = await pool.query(`DELETE FROM Product_Category WHERE id=?;`, [parseInt(Id)])
  return result
}

//  modules for category ends



module.exports = {
//  modules for category starts
  Get_All_Cateogry,
  Get_All_Cateogry_Id,
  Create_New_cateogry,
  Update_cateogry,
  Delete_category,
//  modules for category ends
//  modules for Product starts

//  modules for Product ends

}