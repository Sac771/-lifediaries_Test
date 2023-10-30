import React,{useState} from 'react'
import axios from 'axios'
import { useParams,redirect } from 'react-router-dom';

function Update(props) {
    const {id} = useParams();
    const [data, setData] = useState('Confirm Delete');
    const [value, setvalue] = useState('yes');

    function Delete_Category(){
        if(value==='yes'){
        axios.delete(`http://127.0.0.1:3030/DeleteCategory/${id}`)
        .then(response => {
            redirect("/category")
        })
        .catch(error => {
        console.log('GET Request Error:', error);
        });
    }
    redirect("/category")


  }

  if(data==='Confirm Delete'){
  return (
    <>
    <div  className="container border border-dark text-center mb-3 mt-3 ml-3 mr-3 p-1">{data}</div>
    <div className=" container text-center">
    <form onSubmit={Delete_Category} action='\category'>
        <div className="form-group ">
            <button type="submit" class="btn btn-success">Yes</button>
            <button type="submit" onClick={()=>{setvalue('no')}} class="btn btn-danger">No</button>
        </div>
    </form>
    </div>
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