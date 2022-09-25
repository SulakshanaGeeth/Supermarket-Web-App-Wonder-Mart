import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

import AdminDashboard from '../AdminDashboard';

import IconButton from "@mui/material/IconButton";
import ReplyIcon from "@mui/icons-material/Reply";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const ViewOrder = () => {
    const params = useParams();
    const OrderID = params.id;

    const [Name, setName] = useState('');
    const [Address, setAddress] = useState('');
    const [Mobile, setMobile] = useState('');
    const [Email, setEmail] = useState('');
    const [Products, setProducts] = useState([]);
    const [Amount, setAmount] = useState('');
    const [User, setUser] = useState('');

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
       await axios.get("http://localhost:8070/order/item/" + OrderID)
        .then((res) => {
            setUser(res.data.UserID)
            setName(res.data.Name);
            setAddress(res.data.Address);
            setMobile(res.data.Mobile);
            setEmail(res.data.Email);
            setProducts(res.data.Products);
            setAmount(res.data.Amount);        
        })
        .catch((error) => console.log(error))
        
        // console.log(Products)
    };    

    return (
        <div>
            <div>
                <AdminDashboard/>
            </div>

            <div style={{marginLeft:'250px', marginTop:'70px', paddingBottom:"25px"}} >
                <IconButton aria-label="delete" href="/admin/Orders">
                    <ReplyIcon style={{ fontSize: "200%" }} />
                </IconButton>
                
                {/* <Typography variant="h4" sx={{position:"absolute", marginTop:"8%", marginLeft:"250px"}} > Wonder Mart </Typography>  */}
                <Typography variant="h1" sx={{position:"relative", marginTop:"1%", marginLeft:"350px"}} > Invoice </Typography>

                <Typography variant="h5" sx={{position:"relative", marginTop:"1%", marginLeft:""}} > Client Details </Typography>

                <Typography variant="h6" sx={{position:"relative", marginTop:"1%", }} > User    : {User} </Typography>
                <Typography variant="h6" sx={{position:"relative", marginTop:"0%", }} > Name    : {Name} </Typography>
                <Typography variant="h6" sx={{position:"relative", marginTop:"0%", }} > Address : {Address} </Typography>
                <Typography variant="h6" sx={{position:"relative", marginTop:"0%", }} > Email   : {Email} </Typography>
                <Typography variant="h6" sx={{position:"relative", marginTop:"0%", }} > Mobile  : {Mobile} </Typography>

                <Box sx={{width:"400px", position:"absolute", marginTop:"-12%", marginLeft:"50%", outline:"none"}}>
                    <Typography variant="h5" sx={{position:"relative", marginTop:"10%", marginLeft:"0%"}} > Order Details </Typography>

                    <Typography variant="h6" sx={{position:"relative", marginTop:"2%", marginLeft:"0%"}} > Order No    : {OrderID} </Typography>
                    <Typography variant="h6" sx={{position:"relative", marginTop:"0%", marginLeft:"0%"}} > Order Date : {Address} </Typography>
                    {/* <Typography variant="h6" sx={{position:"relative", marginTop:"0%", marginLeft:"0%"}} > </Typography>
                    <Typography variant="h6" sx={{position:"relative", marginTop:"0%", marginLeft:"0%"}} > </Typography> */}
                </Box>            

                <TableContainer sx={{ width:'1000px', marginTop:'10px'}} component={Paper}>
                    <Table sx={{ width:'1000px'}} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{textAlign: 'center', fontWeight:'bold', fontSize:'17px'}} >Product Name</TableCell>
                                <TableCell sx={{ width:'100px', textAlign: 'center',fontWeight:'bold', fontSize:'17px'}}>Quantity</TableCell>
                                <TableCell sx={{ width:'150px',textAlign: 'center', fontWeight:'bold', fontSize:'17px'}}>Product Price</TableCell>
                                <TableCell sx={{ width:'150px',textAlign: 'center', fontWeight:'bold', fontSize:'17px'}}>Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                Products.map((item) => (
                                    <TableRow>
                                        <TableCell sx={{}} > {item.ProductName} </TableCell>
                                        <TableCell sx={{ width:'100px', textAlign: 'center'}}> {item.Quantity} </TableCell>
                                        <TableCell sx={{ width:'150px',textAlign: 'right',paddingRight:"50px"}}> {item.ProductPrice} .00</TableCell>
                                        <TableCell sx={{ width:'150px',textAlign: 'right',paddingRight:"40px"}}>{(item.Quantity*item.ProductPrice)}.00</TableCell>
                                    </TableRow>
                                ))
                            }
                            
                            {/* <TableRow>
                                <TableCell sx={{}} >Raigam Soy Devilled Chicken Flavor 110g</TableCell>
                                <TableCell sx={{ width:'100px', textAlign: 'center'}}>12</TableCell>
                                <TableCell sx={{ width:'150px',textAlign: 'right',paddingRight:"50px"}}>2500.00</TableCell>
                                <TableCell sx={{ width:'150px',textAlign: 'right',paddingRight:"100px"}}>5000.00</TableCell>
                            </TableRow> */}

                            <TableRow>
                                <TableCell colSpan={3} sx={{textAlign: 'right',fontWeight:'bold',fontSize:'17px',paddingRight:"225px"}} >Sub Total (LKR)</TableCell>                            
                                <TableCell sx={{ width:'150px',textAlign: 'right',fontWeight:'bold',paddingRight:"40px"}}>{Amount}.00</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={3} sx={{textAlign: 'right',fontWeight:'bold',fontSize:'17px',paddingRight:"225px"}} >Delivery Charge (LKR)</TableCell>                            
                                <TableCell sx={{ width:'150px',textAlign: 'right',fontWeight:'bold',paddingRight:"40px"}}>200.00</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={3} sx={{textAlign: 'right',fontWeight:'bold',fontSize:'17px',paddingRight:"225px"}} >Total Amount (LKR)</TableCell>                            
                                <TableCell sx={{ width:'150px',textAlign: 'right',fontWeight:'bold',paddingRight:"40px"}}>{(Amount+200)}.00</TableCell>
                            </TableRow>
                            
                        </TableBody>
                    </Table>
                    </TableContainer>
            </div>                                
        </div>
    )
};
export default ViewOrder;