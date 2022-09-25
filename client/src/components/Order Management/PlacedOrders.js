import React from 'react';
import axios from 'axios';

import {RiderAssign} from './Alert/Alert';

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

export default class PlacedOrders extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            Orders: [],
            rider:false,
            id:null,
        }
    }

    async componentDidMount() {
        await axios.get('http://localhost:8070/order/place')
        .then( (response) => {
            this.setState({Orders:response.data})
            console.log(response.data)
        })
        .catch((err) => console.log(err.message))
    }

    viewOrder(id){
        window.location = '/admin/OrdersView/' + id;
    }

    async assignRider(id) {
        this.RiderAssignModalClose();
        await axios.put('http://localhost:8070/order/Rider/' + id)
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

    RiderAssignModal(ID) { this.setState({rider:true, id:ID }); }
    RiderAssignModalClose() { this.setState({rider:false})}

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
                                                onClick={() => this.RiderAssignModal(order._id)}
                                                sx={{
                                                    backgroundColor:'#3DEF46', 
                                                    color:'black'
                                                }} > Rider Assign 
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
                    maxWidth="sm">

                    <ReportRoundedIcon  sx={{color:"#d32f2f", fontSize:"80px", marginLeft:"80px"}}/> <br/>
                        <DialogTitle id="alert-dialog-title" sx={{fontWeight:"bold"}}>
                        Delete Cart Detals ?
                    </DialogTitle>

                    <DialogActions sx={{display:"left"}}>
                        <Button onClick={() => this.RiderAssignModalClose()} sx={{backgroundColor:"#b2ff59", color:"black", marginRight:"150px", position:"absolute"}} >Cancel</Button>
                        <Button onClick={() => this.assignRider(this.state.id)} sx={{backgroundColor:"#ffc947", color:"black"}} autoFocus>
                            Confirm
                        </Button>
                    </DialogActions>

                </Dialog>
            </div>
        )
    }
}