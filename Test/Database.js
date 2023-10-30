const mysql= require('mysql2')

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'sachin',
    database: 'Product',
  }).promise()



//  modules for Product starts

// returns all products.
async function Get_All_Product(){
  const [rows] = await pool.query("select * from Product")
  return rows
}

// Creates a new products.
async function Create_New_Product(Product_name, Product_Category, Cost, Descr, Active_Inactive) {
  const [result] = await pool.query(`INSERT INTO Product (Product_name,Product_Category,cost,Descr,Active_Inactive) VALUES (?, ?, ?, ?, ?)`, [Product_name, Product_Category, Cost, Descr, Active_Inactive])
  return result
}

// Updating a product.
async function Update_Product(Column, Value, Id) {
  if(Column==='Product_Category' || Column==='cost'){
    Value=parseInt(Value)
  }
  const [result] = await pool.query(`UPDATE Product SET ${Column} = ? WHERE id=?;`, [Value, parseInt(Id)])
  return result
}

// Deleting a product
async function Delete_Product(Id) {
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
  if(Column==='Active_Inactive'){
    if(Value==='true'){
      Value=1
      const [result] = await pool.query(`UPDATE Product_Category SET ${Column} = ? WHERE id=?;`, [Value, parseInt(Id)])
      return result
    }
    else if(Value==='false'){
      Value=0
      const [result] = await pool.query(`UPDATE Product_Category SET ${Column} = ? WHERE id=?;`, [Value, parseInt(Id)])
      return result
    }
    else{
      return 'wrong value inserted'
    }
  }
  
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
  Create_New_cateogry,
  Update_cateogry,
  Delete_category,
//  modules for category ends
//  modules for Product starts
Get_All_Product,
Create_New_Product,
Update_Product,
Delete_Product
//  modules for Product ends

}