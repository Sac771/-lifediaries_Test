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
  console.log('all products fetched')
  return rows
}

// Creates a new products.
async function Create_New_Product(Product_name, Product_Category, Cost, Descr, Active_Inactive) {
  let prod_cat={}
  Product_Category.map((element,index)=>{
    prod_cat[index]=element;
  })
  await pool.query(`INSERT INTO Product (Product_name,Product_Category,cost,Descr,Active_Inactive) VALUES (?, '${JSON.stringify(prod_cat)}', ?, ?, ?)`, [Product_name, Cost, Descr, parseInt(Active_Inactive)])
  console.log('product created succesfully')
  return 'product created succesfully'
}

// Updating a product.
async function Update_Product(Column, Value, Id) {
  if(Column==='cost'){
    Value=parseInt(Value)
  }
  else if(Column==='Active_Inactive'){
    if(Value==='true'){
      Value=1
      await pool.query(`UPDATE Product SET ${Column} = ? WHERE id=?;`, [Value, parseInt(Id)])
      console.log('product updated')
      return 'product updated'
    }
    else if(Value==='false'){
      Value=0
      await pool.query(`UPDATE Product SET ${Column} = ? WHERE id=?;`, [Value, parseInt(Id)])
      console.log('product updated')
      return 'category updated'
    }
    else{
      console.log('wrong value inserted')
      return 'wrong value inserted'
    }
  }
  else if(Column==='Product_Category'){
    let prod_cat={}
    Value.map((element,index)=>{
      prod_cat[index]=element;
    })
    await pool.query(`UPDATE Product SET ${Column} = '${JSON.stringify(prod_cat)}' WHERE id=?;`, [parseInt(Id)])
    console.log('Product updated succesfully')
    return 'Product updated succesfully'
  }
  await pool.query(`UPDATE Product SET ${Column} = ? WHERE id=?;`, [Value, parseInt(Id)])
  console.log('Product updated succesfully')
  return 'Product updated succesfully'
}

// Deleting a product
async function Delete_Product(Id) {
  await pool.query(`DELETE FROM Product WHERE id=?;`, [parseInt(Id)])
  console.log('Product deletion succesfull')
  return 'Product deletion succesfull'
}

//  modules for Product ends

//  modules for category starts
// returns all category of products.
async function Get_All_Cateogry(){
  const [rows] = await pool.query("select * from Product_Category")
  console.log('all categories fetched')
  return rows
}

// Creates a new category of products.
async function Create_New_cateogry(Category_name, Active_Inactive, Descr) {
  await pool.query(`INSERT INTO Product_Category (Category_Name,Active_Inactive,Descr) VALUES (?, ?, ?)`, [Category_name, Active_Inactive, Descr])
  console.log('new category created')
  return 'new category created'
}

// Updating a category of products.
async function Update_cateogry(Column, Value, Id) {
  if(Column==='Active_Inactive'){
    if(Value==='true'){
      Value=1
      await pool.query(`UPDATE Product_Category SET ${Column} = ? WHERE id=?;`, [Value, parseInt(Id)])
      return 'category updated'
    }
    else if(Value==='false'){
      Value=0
      await pool.query(`UPDATE Product_Category SET ${Column} = ? WHERE id=?;`, [Value, parseInt(Id)])
      console.log('category updated')
      return 'category updated'
    }
    else{
      console.log('wrong value inserted')
      return 'wrong value inserted'
    }
  }
  await pool.query(`UPDATE Product_Category SET ${Column} = ? WHERE id=?;`, [Value, parseInt(Id)])
  console.log('category updated succesfully')
  return 'category updated succesfully'
}

// Deleting a category of products
async function Delete_category(Id) {

  const [rows] = await pool.query("select * from Product")
  let updateflag=false
  rows.map( async (d)=>{
    // here we find all product and save it's category in value
    const JsonData=d.Product_Category
    let value=[]
    for (const key in JsonData) {
      value = [...value,JsonData[key]];
    }
    console.log('idhar brother:',value.includes(Id),value,(Id))
    // if length of value array is one we will check 
    if(value.length===1){
      // if value of category in product is the category we will delete than we delete that product too 
      if(value[0]===Id){
        console.log('Had to delete product as no category')
        await pool.query(`DELETE FROM Product WHERE id=?;`, [parseInt(d.id)])
      }
    }
    // if length of value array is not one, we will just update the category of that specific product
    
    if(value.includes(Id)){
      let prod_cat={}
      value.map((element,index)=>{
        console.log(element===Id,element,Id)
        if(!(element===Id)){
        prod_cat[index]=element;
        }
      })
      await pool.query(`UPDATE Product SET Product_Category = '${JSON.stringify(prod_cat)}' WHERE id=?;`, [parseInt(d.id)])
      console.log('had to update product as category deleted')
    }
  })

  await pool.query(`DELETE FROM Product_Category WHERE id=?;`, [parseInt(Id)])
  console.log('category deletion success')
  return 'categorey deletion succesfull'
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