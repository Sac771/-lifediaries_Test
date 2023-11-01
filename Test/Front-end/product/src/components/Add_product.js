import React,{useState,useEffect} from 'react'
import axios from 'axios'

function Add_product() {
    const[data,setdata]=useState('Add New page')
    const[value1,setvalue1]=useState('')
    const[value2,setvalue2]=useState([])
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
      if(value2[0]===undefined){

      }
      else{
        axios.post(`http://127.0.0.1:3030/CreateProduct`,{'Product_name':value1,'Product_Category':value2,'cost':value3,'Active_Inactive':value5,'Descr':value4})
        .then(response => {
        setdata(response.data)
        })
        .catch(error => {
        console.log('GET Request Error:', error);
        });
      }
  }

  if(data==='Add New page' && iscategoryavailable){
  return (
    <>
    <div  className="container border border-dark text-center mb-3 mt-3 ml-3 mr-3 p-1">{data}</div>
    <form action='\product' onSubmit={Add_Cateogry}>
    <div class="form-group">
            <label for="exampleInputPassword1">Name of Product</label>
            <input type="text" class="form-control"  onChange={(e)=>setvalue1(e.target.value)}  placeholder="name of product" required/>
        </div><br></br>
        <div class="form-group">
        <label for="exampleInputPassword1">Select Category of Product</label>
        <small>Kindly select one or else it will not be addede</small><br></br>
        {categorydata.map((catdata)=>{
                    return(<><input type='checkbox' onChange={(e)=>{
                      if(value2.includes(e.target.value)){
                        setvalue2(value2.filter((data)=>{
                          return !(data===e.target.value)
                        }))
                      }
                      else{
                        setvalue2([...value2,e.target.value])
                      }}
                    } value={catdata.id}/>{catdata.Category_Name}<br></br></>)
                })}
        </div><br></br>
      

        <div class="form-group">
            <label for="exampleInputPassword1">Cost</label>
            <input type="number" class="form-control"  onChange={(e)=>setvalue3(e.target.value)}  placeholder="Cost ₹" required/>
        </div><br></br>

        <div class="form-group">
            <label for="exampleInputPassword1">Active / Inactive : </label><br></br>
            Active<input class="form-check-input" value='1' onChange={(e)=>{setvalue5(e.target.value)}} type="radio" name="flexRadioDefault" required/>
            <br></br>Inactive<input class="form-check-input" value='0' onChange={(e)=>{setvalue5(e.target.value)}} type="radio" name="flexRadioDefault" required/>
        </div><br></br>
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