import React, { useState, useEffect } from "react";
import axois from "axios";
import Header from "../HeaderFooter/Header";
import Footer from "../HeaderFooter/Footer";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

function AllDpersons() {
  const [Dperson, setDperson] = useState([]);
  useEffect(() => {
    function getDperson() {
      axois
        .get("http://localhost:8070/Dperson/")
        .then((res) => {
          console.log(res.data);
          setDperson(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getDperson();
  }, []);

  const navDelete = (id) => {
    axois
      .delete(`http://localhost:8070/Dperson/delete/${id}`)
      .then(() => alert("Appointment deleted successfully"))
      .catch((err) => console.log(err));
    // window.location = "/viewAppointment";
    window.location.reload();
  };
  const navAdd = () => {
    window.location = "/add";
  };

  const navEdit = (id) => {
    window.location = `/edit/${id}`;
  };

  return (
    <div>
      <Header />
      <Button variant="primary" onClick={() => navAdd()}>
        Add Delivery person
      </Button>

      <Table striped>
        <thead>
          <tr>
            <th>NAME</th>
            <th>IDNUMBER</th>
            <th>PHONENUMBER</th>
            <th>ADDRESS</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Dperson.map((item, key) => (
            <tr>
              <td>{item.name}</td>
              <td>{item.IdNumber}</td>
              <td>{item.PhoneNumber}</td>
              <td>{item.Address}</td>
              <td>
                <Button variant="warning" onClick={() => navEdit(item._id)}>
                  EDIT
                </Button>
              </td>
              <td>
                <Button variant="danger" onClick={() => navDelete(item._id)}>
                  DELETE
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Footer />
    </div>
  );
}

export default AllDpersons;