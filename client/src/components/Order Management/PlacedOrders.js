import React from 'react';
import axios from 'axios';

import {RiderAssign, DeliveredOrder} from './Alert/Alert';

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
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

export default class PlacedOrders extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            Orders: [],
            Sending:[],
            rider:false,
            id:null,
            deliver:false,
            open:false,
            OrderID:"",
            RidersDet: [],
            riderName:"",
            RID:"",
        }
    }

    async componentDidMount() {
        await axios.get('http://localhost:8070/order/place')
        .then( (response) => {
            this.setState({Orders:response.data})
            //console.log(response.data)
        })
        .catch((err) => console.log(err.message))

        await axios.get('http://localhost:8070/order/sending')
        .then( (response) => {
            this.setState({Sending:response.data})
            //console.log(response.data)
        })
        .catch((err) => console.log(err.message))

        await axios.get('http://localhost:8070/Dperson/')
        .then( (response) => {
            this.setState({RidersDet:response.data})
            console.log(response.data)
        })
        .catch((err) => console.log(err.message))
    }

    viewOrder(id){
        window.location = '/admin/OrdersView/' + id;
    }

    async assignRider() {
        this.RiderAssignModalClose();

        const Rider = {
            RiderID: this.state.id
        }
        
        await axios.put('http://localhost:8070/order/assignRider/' + this.state.OrderID, Rider)
        .then( (response) => {
            if(response.status === 200)
                RiderAssign("success", "Assign Rider ", response.data);
            else
                RiderAssign("error", "Error", response.data);
        })
        .catch((err) => console.log(err.message))

        //console.log(this.state.id)

        this.componentDidMount();
    }

    async Delivered(id) {
        this.DeliveredModalClose();
        
        await axios.put('http://localhost:8070/order/Deliver/' + id)
        .then( (response) => {
            if(response.status === 200)
                DeliveredOrder("success", "Order Delivered", response.data);
            else
                DeliveredOrder("error", "Error", response.data);
        })
        .catch((err) => console.log(err.message))

        //console.log(this.state.id)

        this.componentDidMount();
    }

    RiderAssignModal(ID, name) { 
        this.handleClose();

        this.setState({rider:true, id:ID, riderName:name }); 
    }
    RiderAssignModalClose() { this.setState({rider:false})}

    DeliveredModal(ID) { this.setState({deliver:true, id:ID }); }
    DeliveredModalClose() { this.setState({deliver:false})}

    handleClickOpen = (id) => {
        this.setState({open:true, OrderID:id})
      };
    
    handleClose = () => {
        this.setState({open:false})
      };
    

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
                            </TableRow>
                        </TableHead>
            
                        <TableBody>
                        {
                                this.state.Orders.map((order) => (
                                    <TableRow hover >
                                        <TableCell> {order._id} </TableCell>
                                        <TableCell> {order.Name} </TableCell>
                                        <TableCell> {order.Address} </TableCell>
                                        <TableCell> {order.Mobile} </TableCell>
                                        <TableCell sx={{textAlign: 'right',paddingRight:"50px"}} > {order.Amount}.00 </TableCell>
                                        <TableCell> 
                                            <Button 
                                                variant='outlined' 
                                                color='primary'
                                                onClick={() => this.viewOrder(order._id)}
                                                sx={{
                                                    backgroundColor:'#03a9f4', 
                                                    color:'black'
                                                }}> View Details 
                                            </Button> 
                                        </TableCell>
                                        <TableCell> 
                                            <Button 
                                                variant='outlined' 
                                                color='success'
                                                //onClick={() => this.RiderAssignModal(order._id)}
                                                onClick={() => this.handleClickOpen(order._id)}
                                                sx={{
                                                    backgroundColor:'#3DEF46', 
                                                    color:'black'
                                                }} > Rider Assign 
                                            </Button> 
                                        </TableCell>
                                    </TableRow>
                                ))
                            }

{
                                this.state.Sending.map((order) => (
                                    <TableRow hover >
                                        <TableCell> {order._id} </TableCell>
                                        <TableCell> {order.Name} </TableCell>
                                        <TableCell> {order.Address} </TableCell>
                                        <TableCell> {order.Mobile} </TableCell>
                                        <TableCell sx={{textAlign: 'right',paddingRight:"50px"}} > {order.Amount}.00 </TableCell>
                                        <TableCell> 
                                            <Button 
                                                variant='outlined' 
                                                color='primary'
                                                onClick={() => this.viewOrder(order._id)}
                                                sx={{
                                                    backgroundColor:'#03a9f4', 
                                                    color:'black'
                                                }}> View Details 
                                            </Button> 
                                        </TableCell>
                                        <TableCell> 
                                            <Button 
                                                variant='outlined' 
                                                color='success'
                                                onClick={() => this.DeliveredModal(order._id)}
                                                sx={{
                                                    backgroundColor:'#ffeb3b', 
                                                    color:'black'
                                                }} > Dilivered
                                            </Button> 
                                        </TableCell>
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
                    open={this.state.rider}
                    onClose={this.RiderAssignModalClose}
                    maxWidth="xs"
                    fullWidth="xs">

                    <ReportRoundedIcon  sx={{color:"#d32f2f", fontSize:"80px", marginLeft:"180px"}}/> <br/>
                        <DialogTitle id="alert-dialog-title" sx={{fontWeight:"bold", marginLeft:"100px", fontSize:'25px', marginTop:"-20px"}}>
                        Assign Rider {this.state.riderName} ?
                    </DialogTitle>

                    <DialogActions sx={{display:"left"}}>
                        <Button variant="contained" color="inherit" onClick={() => this.RiderAssignModalClose()} sx={{backgroundColor:"#b2ff59", color:"black", marginRight:"275px", position:"absolute", width:"150px"}} >Cancel</Button>
                        <Button variant="contained" color="inherit" onClick={() => this.assignRider()} sx={{backgroundColor:"#ffc947", color:"black",marginRight:"0px", width:"150px"}} autoFocus>
                            Confirm
                        </Button>
                    </DialogActions>

                </Dialog>

                <Dialog
                    open={this.state.deliver}
                    onClose={this.DeliveredModalClose}
                    maxWidth="xs"
                    fullWidth="xs"
                    >

                    <ReportRoundedIcon  sx={{color:"#d32f2f", fontSize:"80px", marginLeft:"180px"}}/> <br/>
                        <DialogTitle id="alert-dialog-title" sx={{fontWeight:"bold", marginLeft:"100px", fontSize:'25px', marginTop:"-20px"}}>
                        Delivered Order ?
                    </DialogTitle>

                    <DialogActions sx={{display:"left"}}>
                        <Button variant="contained" color="inherit" onClick={() => this.DeliveredModalClose()} sx={{backgroundColor:"#b2ff59", color:"black", marginRight:"275px", position:"absolute", width:"150px"}} >Cancel</Button>
                        <Button variant="contained" color="inherit" onClick={() => this.Delivered(this.state.id)} sx={{backgroundColor:"#ffc947", color:"black",marginRight:"0px", width:"150px"}} autoFocus>
                            Confirm
                        </Button>
                    </DialogActions>

                </Dialog>

                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Assign a Rider to deliver Order"}
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Select a rider from this table
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>Contact No</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {
                                    this.state.RidersDet.map((rider) => (
                                        <TableRow>
                                            <TableCell> {rider.name} </TableCell>
                                            <TableCell> {rider.Address}</TableCell>
                                            <TableCell> {rider.PhoneNumber}</TableCell>
                                            <TableCell> <Button onClick={() => this.RiderAssignModal(rider._id, rider.name)}>Select</Button> </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                        
                    
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}