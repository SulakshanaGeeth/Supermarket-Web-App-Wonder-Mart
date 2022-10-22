import React, { useState } from "react";
import axios from "axios";
function AddDPerson() {
  const [name, setName] = useState("");
  const [IdNumber, setIdNumber] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Address, setAddress] = useState("");

  function sendData(e) {
    e.preventDefault();
    const Dperson = {
      name,
      IdNumber,
      PhoneNumber,
      Address,
    };

    console.log(Dperson);

    axios
      .post("http://localhost:8070/Dperson/add", Dperson)
      .then(() => {
        alert("student aded");
        setName("");
        setIdNumber("");
        setPhoneNumber("");
        setAddress("");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div>
      <form onSubmit={sendData}>
        <div className="mb-3">
          <label for="name" className="form-label">
            Enter Rider Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            onChange={(e) => {
              setName(e.target.value);
            }}
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
            onChange={(e) => {
              setIdNumber(e.target.value);
            }}
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
            onChange={(e) => {
              setPhoneNumber(e.target.value);
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
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddDPerson;
