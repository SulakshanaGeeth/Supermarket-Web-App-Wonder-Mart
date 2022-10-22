import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const DpersonEdit = (_props) => {
  const params = useParams();
  const id = params.id;
  //console.log(id);
  const [Dperson, setDperson] = useState([]);
  const [name, setname] = useState("");
  const [IdNumber, setIdNumber] = useState("");
  const [PhoneNumber, setPNumber] = useState("");
  const [Address, setAddress] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      axios
    .get(`http://localhost:8070/Dperson/get/${id}`)
    .then((response) => {
      setDperson(response.data)
      setname(response.data.name)
      setAddress(response.data.Address)
      setIdNumber(response.data.IdNumber)
      setPNumber(response.data.PhoneNumber)
      //console.log(response.data)
    })
    .catch((err) => console.log(err));
    };
    fetchUser(); // this function will called only once
  }, []);

   //console.log(Dperson);

  const sendData = (e) => {
    e.preventDefault();

    const Dperson = {
      name,
      IdNumber,
      PhoneNumber,
      Address,
    };
    console.log(Dperson);

    axios
      .put(`http://localhost:8070/Dperson/update/${id}`, Dperson)
      .then(() => alert("appointment updated.."))
      .catch((err) => console.log(err));

   // console.log(Dperson);
  }

  return (
    <div>
      {/* <Header /> */}
      <h1 className="patedith1"> Edit Delivery person </h1>

      <form>
        <div className="mb-3">
          <label for="name" className="form-label">
            Enter Rider Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            value={name}
            onChange={(e) => setname(e.target.value)}            
          />
        </div>
        <div className="mb-3">
          <label for="IdNumber" className="form-label">
          Enter Rider NIC
          </label>
          <input
            type="text"
            className="form-control"
            id="IdNumber"
            aria-describedby="emailHelp"
            value={IdNumber}
            onChange={(e) => 
              setIdNumber(e.target.value)
            }
          />
        </div>
        <div className="mb-3">
          <label for="PhoneNumber" className="form-label">
            Enter Rider PhoneNumber
          </label>
          <input
            type="text"
            className="form-control"
            id="PhoneNumber"
            aria-describedby="emailHelp"
            value={PhoneNumber}
            onChange={(e) => {
              setPNumber(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label for="Address" className="form-label">
            Enter Rider Address
          </label>
          <input
            type="text"
            className="form-control"
            id="Address"
            aria-describedby="emailHelp"
            value={Address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
        </div>

        <button type="button" onClick={sendData} className="btn btn-primary">
          Submit
        </button>
      </form>
      {/* <Footer /> */}
    </div>
  );
};
export default DpersonEdit;
