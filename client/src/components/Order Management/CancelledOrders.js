import React from 'react';
import axios from 'axios';

import {Refunded} from "./Alert/Alert";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button  from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import ReportRoundedIcon from '@mui/icons-material/ReportRounded';

export default class CancelledOrders extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            OrdersPen: [],
            OrderRef:[],
            refund:false,
            id:null,
        }
    }

    async componentDidMount() {
        await axios.get('http://localhost:8070/order/cancelled/pen')
        .then( (response) => {
            this.setState({OrdersPen:response.data})
            console.log(response.data)
        })
        .catch((err) => console.log(err.message))

        await axios.get('http://localhost:8070/order/cancelled/')
        .then( (response) => {
            this.setState({OrderRef:response.data})
            console.log(response.data)
        })
        .catch((err) => console.log(err.message))
    }

    viewOrder(id){
        window.location = '/admin/OrdersView/' + id;
    }

    async Refunded(id) {
        this.RefundModalClose();

        await axios.put('http://localhost:8070/order/refund/' + id)
        .then( (response) => {
            if(response.status === 200)
                Refunded("success", "Order Refund", response.data);
            else
                Refunded("error", "Error", response.data);
        })
        .catch((err) => console.log(err.message))

        this.componentDidMount();
    }

    RefunddModal(ID) { this.setState({refund:true, id:ID }); }
    RefundModalClose() { this.setState({refund:false})}


    render() {
        return (
            <div>
                <TableContainer sx={{ width:"1200px", height:"auto", marginLeft:"25px", marginTop:"25px"}} >
                    <Table sx={{width:"1200px"}} stickyHeader aria-label="sticky table" >
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{backgroundColor:'#b0bec5', textAlign: 'center'}} > Order ID </TableCell>
                                <TableCell sx={{backgroundColor:'#b0bec5', textAlign: 'center'}} > Name </TableCell>
                                <TableCell sx={{backgroundColor:'#b0bec5', textAlign: 'center'}} > Address </TableCell>
                                <TableCell sx={{backgroundColor:'#b0bec5', textAlign: 'center'}} > Mobile </TableCell>
                                <TableCell sx={{backgroundColor:'#b0bec5', textAlign: 'center'}} > Amount (LKR) </TableCell>                                
                                <TableCell sx={{backgroundColor:'#b0bec5', textAlign: 'center'}} > Refund Status </TableCell>
                            </TableRow>
                        </TableHead>
            
                        <TableBody>
                        {
                                this.state.OrdersPen.map((order) => (
                                    <TableRow hover >
                                        <TableCell> {order._id} </TableCell>
                                        <TableCell> {order.Name} </TableCell>
                                        <TableCell> {order.Address} </TableCell>
                                        <TableCell> {order.Mobile} </TableCell>
                                        <TableCell sx={{textAlign: 'right',paddingRight:"50px"}} > {order.Amount}.00 </TableCell>
                                        <TableCell sx={{textAlign: 'center', color: '#F3842A'}}> Pending... </TableCell>
                                        <TableCell> <Button onClick={() => this.viewOrder(order._id)} variant='contained' color='primary'sx={{backgroundColor:'#03a9f4', color:'black'}} > View Details </Button> </TableCell>
                                        <TableCell> <Button onClick={() => this.RefunddModal(order._id)} variant='contained' color='inherit'sx={{backgroundColor:'#eeff41', color:'black'}} > Paid </Button> </TableCell>
                                    </TableRow>
                                ))
                            }

{
                                this.state.OrderRef.map((order) => (
                                    <TableRow hover >
                                        <TableCell> {order._id} </TableCell>
                                        <TableCell> {order.Name} </TableCell>
                                        <TableCell> {order.Address} </TableCell>
                                        <TableCell> {order.Mobile} </TableCell>
                                        <TableCell sx={{textAlign: 'right',paddingRight:"50px"}} > {order.Amount}.00 </TableCell>
                                        <TableCell sx={{textAlign: 'center', color:"#2F61CEC3"}}> Refunded </TableCell>
                                        <TableCell> <Button variant='outlined' color='primary'sx={{backgroundColor:'#03a9f4', color:'black'}} > View Details </Button> </TableCell>
                                    </TableRow>
                                ))
                            }

                            {/* <TableRow hover >
                                <TableCell> 632ed3680d068eba89bb97c4 </TableCell>
                                <TableCell> Janindu Sachinthana </TableCell>
                                <TableCell> Kandana </TableCell>
                                <TableCell> 774138745 </TableCell>
                                <TableCell> 1178.00 </TableCell>
                            </TableRow>

                            <TableRow hover >
                                <TableCell> 632ed3680d068eba89bb97c4 </TableCell>
                                <TableCell> Janindu Sachinthana </TableCell>
                                <TableCell> Kandana </TableCell>
                                <TableCell> 774138745 </TableCell>
                                <TableCell> 1178.00 </TableCell>
                            </TableRow> */}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Dialog
                    open={this.state.refund}
                    onClose={this.RefundModalClose}
                    maxWidth="xs"
                    fullWidth="xs"
                    >

                    <ReportRoundedIcon  sx={{color:"#d32f2f", fontSize:"80px", marginLeft:"180px"}}/> <br/>
                        <DialogTitle id="alert-dialog-title" sx={{fontWeight:"bold", marginLeft:"100px", fontSize:'25px', marginTop:"-20px"}}>
                        Refunded Order ?
                    </DialogTitle>

                    <DialogActions sx={{display:"left"}}>
                        <Button variant="contained" color="inherit" onClick={() => this.RefundModalClose()} sx={{backgroundColor:"#b2ff59", color:"black", marginRight:"275px", position:"absolute", width:"150px"}} >Cancel</Button>
                        <Button variant="contained" color="inherit" onClick={() => this.Refunded(this.state.id)} sx={{backgroundColor:"#ffc947", color:"black",marginRight:"0px", width:"150px"}} autoFocus>
                            Confirm
                        </Button>
                    </DialogActions>

                </Dialog>
            </div>
        )
    }
}