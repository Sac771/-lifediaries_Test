import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';

function Update_product() { 
    const {id} = useParams();
    const[data,setdata]=useState('Update page')
    const[category,setcategory]=useState('')
    const[value,setvalue]=useState('')
    const [categorydata, setCategoryData] = useState([]);
    const [iscategoryavailable,setiscategoryavailable]=useState(true)

    function Update_Cateogry(){
        axios.post(`http://127.0.0.1:3030/UpdateProduct/${id}`,{'Column':category,'Value':value})
        .then(response => {
        setdata(response.data)
        })
        .catch(error => {
        console.log('GET Request Error:', error);
        });
  }

  
  useEffect(() => {
    axios.get('http://127.0.0.1:3030/GetCategorey')
    .then(response => {
      if(response.data){
          setCategoryData(response.data);
      }
      else{
          setiscategoryavailable(false)
      }

    })
    .catch(error => {
      console.log('GET Request Error:', error);
    }); 
  },[]);

  if(data==='Update page' && setiscategoryavailable){
  return (
    <>
    <div  className="container border border-dark text-center mb-3 mt-3 ml-3 mr-3 p-1">{data}</div>
    <form onSubmit={Update_Cateogry} action='\product'>
  <div class="form-group">
    <label for="exampleInputEmail1">Field</label>
    <div class="form-group col-md-4">
      <label for="inputState">Field</label>
      <select id="inputState" onChange={(e)=>setcategory(e.target.value)} class="form-control" required>
        <option selected>Choose...</option>
        <option value="Product_name">Product name</option>
        <option value="Product_Category">Product Category</option>
        <option value="cost">cost</option>
        <option value="Descr">Description</option>
        <option value="Active_Inactive">Active/Inactive</option>
      </select>
    </div>
    <small class="form-text text-muted">Select One</small>
  </div>

    {
     category==="Product_Category" ?  (
    <>
      <div class="form-group">
        <label for="exampleInputPassword1">Select Category of Product</label>
        <small>Kindly select one or else it will not be addede</small><br></br>
        {categorydata.map((catdata)=>{
                    return(<><input type='checkbox' onChange={(e)=>{
                      if(value.includes(e.target.value)){
                        setvalue(value.filter((data)=>{
                          return !(data===e.target.value)
                        }))
                      }
                      else{
                        setvalue([...value,e.target.value])
                      }}
                    } value={catdata.id}/>{catdata.Category_Name}<br></br></>)
                })}
      </div><br></br>
    </>):(
    <>
        <div class="form-group">
        <label for="exampleInputPassword1">Value</label>
        <input type="text" class="form-control"  onChange={(e)=>setvalue(e.target.value)}  placeholder="Value" required/>
        </div>
    </>)
    }

  
  <button type="submit"  class="btn btn-primary">Update</button>
</form>
</>
  )
  }
  else{
    return (
        <>
        { iscategoryavailable ? (<div  className="container border border-dark text-center mb-3 mt-3 ml-3 mr-3 p-1">{data}</div>):(<><div  className="container border border-dark text-center mb-3 mt-3 ml-3 mr-3 p-1">{data}</div><br></br><div  className="container border border-dark text-center mb-3 mt-3 ml-3 mr-3 p-1">{"Please add category first"}</div></>)}
        </>)
  }
}

export default Update_product