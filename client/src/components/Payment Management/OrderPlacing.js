import React from "react";
import axios from "axios";

import Header from "../HeaderFooter/Header";
import Footer from "../HeaderFooter/Footer";
import {OrderPlace} from "./Alert/Alert";

import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import ImageListItem from '@mui/material/ImageListItem';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';

export default class OrderCreate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            UserID:localStorage.getItem("id"),
            cardno:"",
            exp:null, 
            cvv:0, 
            fname:"", 
            lname:"", 
            email:"", 
            address:"", 
            mobile:0,
            Cart:{},
            Items:[],
            Total: 0,
            message:"",
            stat:1
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8070/cart/' + this.state.UserID)
        .then((res) => {
            this.setState({Cart: res.data, Items: res.data.Products, Total: res.data.Total})
        })
        .catch((err) => console.error(err.message))
    }

    onChange(e) {
        this.setState({[e.target.id]: e.target.value})
    }

    async onSubmit() {
        const Order = {
            UserID: this.state.UserID,
            Name : this.state.fname + ' ' + this.state.lname,
            Address : this.state.address,
            Mobile : this.state.mobile,
            Email: this.state.email,
            Card : {
                CardNumber : this.state.cardno,
                ExprireDate : this.state.exp,
                CVV: this.state.cvv
            },
            Products : this.state.Items,
            Amount: this.state.Total,
        }

        console.log(Order);

        await axios.post('http://localhost:8070/order/add/' , Order)
            .then((res) => this.setState({message: res.data, stat:res.status}))
            .catch((err) => console.log(err.message));

        setTimeout(() => this.OrderPlacing(), 2000)
      
    }

    async OrderPlacing() {
        if(this.state.stat === 200) {
            await axios.delete('http://localhost:8070/cart/deleteAll/' + this.state.Cart._id);

            OrderPlace("success", "Order Placed", this.state.message);
        }
        else {OrderPlace("error", "Error", this.state.message);}
    }

    render() {
        return (
            <div>
                <Header />

                <Typography variant="h4" sx={{marginLeft:"600px", marginTop:"25px"}} > Pay with Card </Typography>
                
                <Paper sx={{width:"800px", height:"auto", backgroundColor:"#4caf50", marginLeft:"300px", paddingTop:"15px", marginBottom:"-20px" }}>
                    <ImageListItem>
                        <img 
                            style={{width:"300px", height:"50px", marginBottom:"15px", marginLeft:"250px" }}
                            alt="card"
                            src="https://camo.githubusercontent.com/b45d680d48b4b642b19ac7308567ea61f995a566d8b2a9165def53740574f3b5/687474703a2f2f73746f726167652e6a302e686e2f6372656469742d636172642d6c6f676f732d322e706e67" />
                    </ImageListItem>

                    <FloatingLabel label="Card No" 
                        style={{
                                width:"600px",
                                marginLeft:"100px",
                                marginBottom:"15px",
                        }} >
                        <Form.Control
                            type="text"
                            id="cardno"
                            placeholder="Card Number"
                            onChange={(e) => this.onChange(e)}
                            style={{
                                width:"600px",
                                marginBottom:"15px",
                                borderRadius:"22px",
                                backgroundColor: "#cfd8dc"
                            }}
                        />
                    </FloatingLabel>   

                    <FloatingLabel label="Expire" 
                        style={{
                            width:"600px",
                            marginLeft:"100px",
                            marginBottom:"15px",
                        }}>
                        <Form.Control
                        type="text"
                        id="exp"
                        placeholder="Expire '12/25'"
                        onChange={(e) => this.onChange(e)}
                        style={{
                            width:"150px",
                            marginBottom:"15px",
                            borderRadius:"22px",
                            backgroundColor: "#cfd8dc"
                            }}
                        />
                    </FloatingLabel>  

                    <FloatingLabel label="CVV" 
                        style={{
                            width:"600px",
                            marginLeft:"600px",
                            position:"absolute",
                            marginTop:"-75px"
                        }}>
                        <Form.Control
                            type="number"
                            id="cvv"
                            placeholder="Expire '12/25'"
                            minLength={3}
                            onChange={(e) => this.onChange(e)}
                            style={{
                                width:"100px", 
                                marginBottom:"15px",
                                borderRadius:"22px",
                                backgroundColor: "#cfd8dc"
                            }}
                            
                        />
                    </FloatingLabel>

                    <InputGroup>

                        <FloatingLabel label="First Name" 
                            style={{
                                    width:"200px",
                                    marginLeft:"100px",
                                    marginBottom:"15px",
                            }} >
                            <Form.Control
                                type="text"
                                id="fname"
                                placeholder="First Name"
                                onChange={(e) => this.onChange(e)}
                                style={{
                                    width:"200px",
                                    marginBottom:"15px",
                                    borderRadius:"22px",
                                    backgroundColor: "#cfd8dc"
                                }}
                            />
                        </FloatingLabel> 

                        <FloatingLabel label="Last Name" 
                            style={{
                                    width:"200px",
                                    marginLeft:"100px",
                                    marginBottom:"15px",
                            }} >
                            <Form.Control
                                type="text"
                                id="lname"
                                placeholder="Last Name"
                                onChange={(e) => this.onChange(e)}
                                style={{
                                    width:"200px",
                                    marginBottom:"15px",
                                    borderRadius:"22px",
                                    backgroundColor: "#cfd8dc"
                                }}
                            />
                        </FloatingLabel>   
                    </InputGroup>       

                    <FloatingLabel label="Email" 
                        style={{
                                width:"600px",
                                marginLeft:"100px",
                                marginTop:"-15px",
                        }} >
                        <Form.Control
                            type="email"
                            id="email"
                            placeholder="Email"
                            onChange={(e) => this.onChange(e)}
                            style={{
                                width:"600px",
                                borderRadius:"22px",
                                backgroundColor: "#cfd8dc"
                            }}
                        />
                    </FloatingLabel>

                    <FloatingLabel label="Address" 
                        style={{
                                width:"600px",
                                marginLeft:"100px",
                                marginTop:"15px",
                        }} >
                        <Form.Control
                            type="text"
                            id="address"
                            placeholder="Address"
                            onChange={(e) => this.onChange(e)}
                            style={{
                                width:"600px",
                                borderRadius:"22px",
                                backgroundColor: "#cfd8dc"
                            }}
                        />
                    </FloatingLabel>

                    <FloatingLabel label="Mobile" 
                        style={{
                                width:"600px",
                                marginLeft:"100px",
                                marginTop:"15px",
                        }} >
                        <Form.Control
                            type="text"
                            id="mobile"
                            placeholder="Mobile"
                            onChange={(e) => this.onChange(e)}
                            style={{
                                width:"600px",
                                borderRadius:"22px",
                                backgroundColor: "#cfd8dc"
                            }}
                        />
                    </FloatingLabel>

                    {/* <TextField id="cardno" variant="outlined" label="Card Number" required
                        onChange={(e) => this.onChange(e)}
                        sx={{
                            backgroundColor:"lightgrey", 
                            color:"black",
                            marginLeft:"100px", 
                            width:"600px",
                            marginBottom:"15px" 
                            }} /> <br/>

                    <TextField id="exp" variant="filled" helperText="Expire Date" type="date" required
                        onChange={(e) => this.onChange(e)}
                        sx={{
                            backgroundColor:"lightgrey", 
                            color:"black",
                            marginLeft:"100px", 
                            width:"200px",
                            marginBottom:"30px" }} />
                    <TextField id="cvv" variant="filled" label="CVV" type="number" MAX_VALUE="999" required
                        onChange={(e) => this.onChange(e)}
                        sx={{
                            backgroundColor:"lightgrey", 
                            color:"black",
                            marginLeft:"180px" }} /> <br/>
                    
                    <TextField id="fname" variant="filled" label="First Name" required
                        onChange={(e) => this.onChange(e)}
                        sx={{
                            backgroundColor:"lightgrey", 
                            color:"black",
                            marginLeft:"100px", 
                            width:"220px",
                            marginBottom:"15px" }} />
                    
                    <TextField id="lname" variant="filled" label="Last Name" required
                        onChange={(e) => this.onChange(e)}
                        sx={{
                            backgroundColor:"lightgrey", 
                            color:"black",
                            marginLeft:"160px", 
                            width:"220px",
                            marginBottom:"15px" }} />  <br/>

                    <TextField id="email" variant="filled" label="Email" type="email" required
                        onChange={(e) => this.onChange(e)}
                        sx={{
                            backgroundColor:"lightgrey", 
                            color:"black",
                            marginLeft:"100px", 
                            width:"600px",
                            marginBottom:"15px" }} /> <br/>
                    
                    <TextField id="address" variant="filled" label="Address" required
                        onChange={(e) => this.onChange(e)}
                        sx={{
                            backgroundColor:"lightgrey", 
                            color:"black",
                            marginLeft:"100px", 
                            width:"600px",
                            marginBottom:"15px" }} /> <br/>

                    <TextField id="mobile" variant="filled" label="Mobile" required
                        onChange={(e) => this.onChange(e)}
                        sx={{
                            backgroundColor:"lightgrey", 
                            color:"black",
                            marginLeft:"100px", 
                            width:"600px",
                            marginBottom:"15px" }} /> <br/> */}

                    <Button onClick={() => this.onSubmit()} sx={{backgroundColor:"#76ff03", color:"black", marginLeft:"100px", width:"600px", marginBottom:"15px", marginTop:"15px"}} variant="contained" color="inherit"> COnfirm Order </Button>        
                </Paper>

                <Footer/>
            </div>
        )
    }
}