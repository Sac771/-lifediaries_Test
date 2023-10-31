import React,{useState,useEffect} from 'react'
import axios from 'axios'

function Add_product() {
    const[data,setdata]=useState('Add New page')
    const[value1,setvalue1]=useState('')
    const[value2,setvalue2]=useState(0)
    const[value3,setvalue3]=useState(0)
    const[value4,setvalue4]=useState('')
    const[value5,setvalue5]=useState('')
    const [categorydata, setCategoryData] = useState([]);
    const [iscategoryavailable,setiscategoryavailable]=useState(true)

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

    function Add_Cateogry(){
        axios.post(`http://127.0.0.1:3030/CreateProduct`,{'Product_name':value1,'Product_Category':value2,'cost':value3,'Active_Inactive':value5,'Descr':value4})
        .then(response => {
        setdata(response.data)
        })
        .catch(error => {
        console.log('GET Request Error:', error);
        });
  }

  if(data==='Add New page' && iscategoryavailable){
  return (
    <>
    <div  className="container border border-dark text-center mb-3 mt-3 ml-3 mr-3 p-1">{data}</div>
    <form action='\product' onSubmit={Add_Cateogry}>
    <div class="form-group">
            <label for="exampleInputPassword1">Name of Product</label>
            <input type="text" class="form-control"  onChange={(e)=>setvalue1(e.target.value)}  placeholder="name of product" required/>
        </div>
        <div class="form-group">
        <label for="exampleInputPassword1">Select Category of Product</label>
        <select class="form-select" aria-label="Default select example" onChange={(e)=>{setvalue2(e.target.value)}} required>
        <option value='0' selected>none</option>
                {categorydata.map((catdata)=>{
                    return(<option value={catdata.id}>{catdata.Category_Name}</option>)
                })}
        </select>
        </div>
      

        <div class="form-group">
            <label for="exampleInputPassword1">Cost</label>
            <input type="number" class="form-control"  onChange={(e)=>setvalue3(e.target.value)}  placeholder="Cost ₹" required/>
        </div>

        <div class="form-group">
            <label for="exampleInputPassword1">Active / Inactive : </label><br></br>
            Active<input class="form-check-input" value='1' onChange={(e)=>{setvalue5(e.target.value)}} type="radio" name="flexRadioDefault" required/>
            <br></br>Inactive<input class="form-check-input" value='0' onChange={(e)=>{setvalue5(e.target.value)}} type="radio" name="flexRadioDefault" required/>
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1">Description</label>
            <input type="text" class="form-control"  onChange={(e)=>setvalue4(e.target.value)}  placeholder="Descr" required/>
        </div>
        <button type="submit"  class="btn btn-primary">Add</button>
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

export default Add_product