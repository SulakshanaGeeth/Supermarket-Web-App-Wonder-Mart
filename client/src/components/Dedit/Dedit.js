import axios from "axios";
import React, {useState} from "react";



const DpersonEdit = (_props) => {

   const id = _props.match.params.id;
   //console.log(id);
   const [Dperson, setDperson] = useState([]);

   axios.get(`http://localhost:8087/get/${id}`)
   .then((response) => setDperson(response.data))
   .catch((err) => console.log(err));

  // console.log(app);
        
        const [name, setname] = useState("");
        const [IdNumber, setIdNumber] = useState("");
        const [PNumber, setPNumber] = useState("");
        const [Address, setAddress] = useState("");
       
        

 function sendData (e)  {
    e.preventDefault();

        const Dperson = {
            name,
            IdNumber,
            PNumber,
            Address
            
        };
        axios.put(`http://localhost:8087/Dperson/update/${id}`, Dperson)
        .then(()=>  
            alert("appointment updated.."),
            window.location = `/`)
        .catch((err) => console.log(err));

         console.log(Dperson)
     };

    
    
    return(
        <div>
          
            <h1 className="patedith1"> Edit Delivery person </h1>

            <form onSubmit={sendData }>
  <div className="mb-3">
    <label for="name" className="form-label">enter student name</label>
    <input type="text" className="form-control" id="name" aria-describedby="emailHelp"
    onChange={(e)=>{
        setname(e.target.value);
    }}/>
    
  </div>
  <div className="mb-3">
    <label for="IdNumber" className="form-label">enter student IdNumber</label>
    <input type="text" className="form-control" id="IdNumber" aria-describedby="emailHelp"
    onChange={(e)=>{
        setIdNumber(e.target.value);
    }}/>
    
  </div>
  <div className="mb-3">
    <label for="PhoneNumber" className="form-label">enter student PhoneNumber</label>
    <input type="text" className="form-control" id="PhoneNumber" aria-describedby="emailHelp"
    onChange={(e)=>{
        setPNumber(e.target.value);
    }}/>
    
  </div>
  <div className="mb-3">
    <label for="Address" className="form-label">enter student PhoneNumber</label>
    <input type="text" className="form-control" id="Address" aria-describedby="emailHelp"
    onChange={(e)=>{
        setAddress(e.target.value);
    }}/>
    
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
            
        </div>
    );
} 
export default  DpersonEdit  ;