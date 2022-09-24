import React from 'react';
import axios from 'axios';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button  from '@mui/material/Button';

export default class CancelledOrders extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            OrdersPen: [],
            OrderRef:[]
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
                                        <TableCell> <Button variant='outlined' color='primary'sx={{backgroundColor:'#03a9f4', color:'black'}} > View Details </Button> </TableCell>
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
            </div>
        )
    }
}