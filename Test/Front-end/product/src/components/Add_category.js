import React,{useState} from 'react'
import axios from 'axios'

function Add_category() {
    const[data,setdata]=useState('Add New page')
    const[value1,setvalue1]=useState('')
    const[value2,setvalue2]=useState('')
    const[value3,setvalue3]=useState('')

    function Add_Cateogry(){
        axios.post(`http://127.0.0.1:3030/CreateCategory`,{'Category_Name':value1,'Active_Inactive':value2,'Descr':value3})
        .then(response => {
        setdata(response.data)
        })
        .catch(error => {
        console.log('GET Request Error:', error);
        });
  }

  if(data==='Add New page'){
  return (
    <>
    <div  className="container border border-dark text-center mb-3 mt-3 ml-3 mr-3 p-1">{data}</div>
    <form action='\category' onSubmit={Add_Cateogry}>
        <div class="form-group">
            <label for="exampleInputPassword1">Name of Category</label>
            <input type="text" class="form-control"  onChange={(e)=>setvalue1(e.target.value)}  placeholder="Category_Name" required/>
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Active / Inactive : </label><br></br>
            Active<input class="form-check-input" value='1' onChange={(e)=>{setvalue2(e.target.value)}} type="radio" name="flexRadioDefault" required/>
            <br></br>Inactive<input class="form-check-input" value='0' onChange={(e)=>{setvalue2(e.target.value)}} type="radio" name="flexRadioDefault" required/>
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Description</label>
            <input type="text" class="form-control"  onChange={(e)=>setvalue3(e.target.value)}  placeholder="Descr" required/>
        </div>
        <button type="submit"  class="btn btn-primary">Add</button>
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

export default Add_category