import React,{useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';

function Update() {
    const {id} = useParams();
    const[data,setdata]=useState('Update page')
    const[category,setcategory]=useState('')
    const[value,setvalue]=useState('')

    function Update_Cateogry(){
        axios.post(`http://127.0.0.1:3030/UpdateCategory/${id}`,{'Column':category,'Value':value})
        .then(response => {
        setdata(response.data)
        })
        .catch(error => {
        console.log('GET Request Error:', error);
        });
  }

  if(data==='Update page'){
  return (
    <>
    <div  className="container border border-dark text-center mb-3 mt-3 ml-3 mr-3 p-1">{data}</div>
    <form onSubmit={Update_Cateogry} action='\category'>
  <div class="form-group">
    <label for="exampleInputEmail1">Field</label>
    <div class="form-group col-md-4">
      <label for="inputState">Field</label>
      <select id="inputState" onChange={(e)=>setcategory(e.target.value)} class="form-control" required>
        <option selected>Choose...</option>
        <option value="Category_Name">Category</option>
        <option value="Active_Inactive">Active/Inactive</option>
        <option value="Descr">Description</option>
      </select>
    </div>
    <small class="form-text text-muted">Select One</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Value</label>
    <input type="text" class="form-control"  onChange={(e)=>setvalue(e.target.value)}  placeholder="Value" required/>
  </div>
  <button type="submit"  class="btn btn-primary">Update</button>
</form>
</>
  )
  }
  else{
    return (
        <>
        <div  className="container border border-dark text-center mb-3 mt-3 ml-3 mr-3 p-1">{data}</div>
        </>)
  }
}

export default Update