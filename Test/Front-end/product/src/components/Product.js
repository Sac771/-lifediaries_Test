import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { Link  } from 'react-router-dom';

function Product() {
  const [data, setData] = useState([]);
  const [Categorydata, setCategoryData] = useState([]);
  const [filtereddata, setfilteredData] = useState([]);

  
  useEffect(() => {
    axios.get('http://127.0.0.1:3030/GetProducts')
    .then(response => {
      setData(response.data);
      setfilteredData(response.data);

    })
    .catch(error => {
      console.log('GET Request Error:', error);
    }); 

    axios.get('http://127.0.0.1:3030/GetCategorey')
    .then(response => {
      setCategoryData(response.data);
    })
    .catch(error => {
      console.log('GET Request Error:', error);
    }); 

  },[]);

  function filterrr(val){
    if(val===''){
      setfilteredData(data)
    }
    else{
      setfilteredData(
        data.filter((value)=>{
    return value.Product_name.includes(val)})
      )
    }
  }

  function filter(ProductCategory){
    const filteredCatData=Categorydata.filter((Cdata)=>{
      return(Cdata.id===ProductCategory)
    })
    if(Categorydata[0]===undefined){
      return 'none'
    }
    else{
      return filteredCatData[0]['Category_Name']
    }
  }

  if(data[0]===undefined){
    return (<>
      <div  className="container border border-dark text-center mb-3 mt-3 ml-3 mr-3 p-1">This is Product page</div>
      <div  className="container border border-dark text-center mb-3 mt-3 ml-3 mr-3 p-1"> No Product found</div>
      <button type="button" className='btn-dark bg-dark text-white'><Link to="/add_product">Add New</Link></button>
  
  
    </>)
  }
  else{
  return (
    <>
    <div  className="container border border-dark text-center mb-3 mt-3 ml-3 mr-3 p-1">This is Product page</div>
    
    <div className="table-responsive">
    <div className="container text-align">
      <input type="text" onChange={(e)=>{filterrr(e.target.value)}} placeholder="Search.."></input>
    </div>
    <button type="button" className='btn-dark bg-dark text-white'><Link to="/add_product">Add New</Link></button>
      <table className="table table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Product_name</th>
            <th scope="col">Product_Category</th>
            <th scope="col">Cost</th>
            <th scope="col">Desc</th>
            <th scope="col">Active/Inactive</th>
            <th scope="col">functions</th>
          </tr>
        </thead>
        <tbody>
          {filtereddata.map((data,index) =>{
            return(<>
            <tr>
            <th scope="row">{index+1}</th>
            <td>{data.Product_name}</td>
            <td>
            {filter(data.Product_Category)}
            </td>
            <td>{data.cost}</td>
            <td>{data.Descr}</td>
            <td>{data.Active_Inactive ? (<>Active</>):(<>Inactive</>)}</td>
            <td><button><Link to={`/update_product/${data.id}`}>Update</Link></button> / <button><Link to={`/delete_product/${data.id}`}>Delete</Link></button></td>
          </tr>
          </>)
          })}
          
          
        </tbody> 
      </table>
    </div>
    </>
  )
    }
    
}

export default Product