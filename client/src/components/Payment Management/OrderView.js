import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

import logo from "./../../Images/Wonder mart Logo 2.jpg";
import Header from '../HeaderFooter/Header';
import Footer from '../HeaderFooter/Footer';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


const OrderView = () => {
    const params = useParams();
    const OrderID = params.id;

    const [Name, setName] = useState('');
    const [Address, setAddress] = useState('');
    const [Mobile, setMobile] = useState('');
    const [Email, setEmail] = useState('');
    // const [Card, setCard] = useState({});
    const [Products, setProducts] = useState([]);
    const [Amount, setAmount] = useState('');

    useEffect(() => {
        axios.get("http://localhost:8070/order/item/" + OrderID)
        .then((res) => {
            setName(res.data.Name);
            setAddress(res.data.Address);
            setMobile(res.data.Mobile);
            setEmail(res.data.Email);
            // setCard(res.data.Card);
            setProducts(res.data.Products);
            setAmount(res.data.Amount);
        })
        .catch((error) => console.log(error))

        // console.log(Products)

    }, []);

    return (
        <div>
            <Header />

            <img alt="WMlogo" src={logo} style={{width:"100px", height:"100px", marginTop:"25px", marginLeft:"60%",position:"absolute"}} />
            <Typography variant="h4" sx={{position:"absolute", marginTop:"8%", marginLeft:"57%"}} > Wonder Mart </Typography> 
            <Typography variant="h1" sx={{position:"relative", marginTop:"1%", marginLeft:"17%"}} > Invoice </Typography>

            <Typography variant="h5" sx={{position:"relative", marginTop:"1%", marginLeft:"17%"}} > Client Details </Typography>

            <Typography variant="h6" sx={{position:"relative", marginTop:"1%", marginLeft:"17%"}} > Name    : {Name} </Typography>
            <Typography variant="h6" sx={{position:"relative", marginTop:"0%", marginLeft:"17%"}} > Address : {Address} </Typography>
            <Typography variant="h6" sx={{position:"relative", marginTop:"0%", marginLeft:"17%"}} > Email   : {Email} </Typography>
            <Typography variant="h6" sx={{position:"relative", marginTop:"0%", marginLeft:"17%"}} > Mobile  : {Mobile} </Typography>

            <Box sx={{width:"350px", position:"absolute", marginTop:"-12%", marginLeft:"54%", outline:"none"}}>
                <Typography variant="h5" sx={{position:"relative", marginTop:"10%", marginLeft:"0%"}} > Order Details </Typography>

                <Typography variant="h6" sx={{position:"relative", marginTop:"2%", marginLeft:"0%"}} > Order No    : {OrderID} </Typography>
                <Typography variant="h6" sx={{position:"relative", marginTop:"0%", marginLeft:"0%"}} > Order Date : {Address} </Typography>
                {/* <Typography variant="h6" sx={{position:"relative", marginTop:"0%", marginLeft:"0%"}} > </Typography>
                <Typography variant="h6" sx={{position:"relative", marginTop:"0%", marginLeft:"0%"}} > </Typography> */}
            </Box>            

            <TableContainer sx={{ width:'1000px', marginLeft:'250px', marginTop:'10px' }} component={Paper}>
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
                                    <TableCell sx={{ width:'150px',textAlign: 'right',paddingRight:"100px"}}>{(item.Quantity*item.ProductPrice)}.00</TableCell>
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
                            <TableCell colSpan={3} sx={{textAlign: 'right',fontWeight:'bold',fontSize:'17px',paddingRight:"225px"}} >Sub Total</TableCell>                            
                            <TableCell sx={{ width:'150px',textAlign: 'right',fontWeight:'bold',paddingRight:"100px"}}>{Amount}.00</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={3} sx={{textAlign: 'right',fontWeight:'bold',fontSize:'17px',paddingRight:"225px"}} >Delivery Charge</TableCell>                            
                            <TableCell sx={{ width:'150px',textAlign: 'right',fontWeight:'bold',paddingRight:"100px"}}>200.00</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={3} sx={{textAlign: 'right',fontWeight:'bold',fontSize:'17px',paddingRight:"225px"}} >Total Amount</TableCell>                            
                            <TableCell sx={{ width:'150px',textAlign: 'right',fontWeight:'bold',paddingRight:"100px"}}>{(Amount+200)}.00</TableCell>
                        </TableRow>
                        
                    </TableBody>
                </Table>
                </TableContainer>

                <Typography variant="h4" sx={{marginLeft: '17%', marginTop: '2%'}} > Thank You for your business !</Typography>
                <Typography variant="h6" sx={{marginLeft: '17%'}} > If you have any question about this invoice Please contact us.</Typography>
                <Typography variant="body1" sx={{marginLeft: '17%'}} > Email : wondermart@gmail.com </Typography>
                <Typography variant="body1" sx={{marginLeft: '17%'}} > Mobile : 0714578658/0778745852 </Typography>

            <Footer/>
        </div>
    )
}

export default OrderView;