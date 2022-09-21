import React from "react";
import axios from "axios";

import {CancelOrder} from "./Alert/Alert";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import  Box  from "@mui/material/Box";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import ReportRoundedIcon from '@mui/icons-material/ReportRounded';

export default class Receiving extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            Orders:[],
            UserID:localStorage.getItem("id"),
            cancelOrd: false, 
            cancelID:""
        }
    }

    componentDidMount(){
        axios.get("http://localhost:8070/order/place/" + this.state.UserID)
        .then((res) => {
            this.setState({Orders:res.data});
            console.log(res.data)
        })
        .catch((err) => console.error(err.message))
    }

    async cancelOrders() {
        this.cancelOrdModalClose()
        
        await axios.put('http://localhost:8070/order/cancelled/' + this.state.cancelID)
        .then((res) => {
            if(res.status === 200) 
                CancelOrder("success", "Cancelled", res.data);
            else
                CancelOrder("error", "Error", res.data);
        })
        .catch((err) => console.error(err.message))
    }

    cancelOrdModal(id) { this.setState({cancelOrd:true, cancelID:id}) }
    cancelOrdModalClose() { this.setState({cancelOrd:false})}

    onOrderViewClick(id) {
        window.location = "/Orders/" + id;
    }

    render() {
        return (
            <div>

                {
                    this.state.Orders.map((item) => (
                        <Card sx={{backgroundColor: '#f5f5f5', 
                            width:"700px", 
                            height:"150px", 
                            marginTop:"20px", 
                            marginLeft:"200px", 
                            padding:"10px 10px 10px 10px", }}>

                            <CardContent> 

                                <Box sx={{ width:"450px"}} >
                                    <Grid container spacing={0.5}>
                                        
                                        <Grid item xs={4}>
                                            <Typography variant="subtitle1" > Order ID </Typography> 
                                        </Grid>
                                        <Grid item xs={7}>
                                        <Typography variant="subtitle1" > {item._id} </Typography> 
                                        </Grid> <Divider/>

                                        <Grid item xs={4}>
                                            <Typography variant="subtitle1" > Invoice Date </Typography> 
                                        </Grid>
                                        <Grid item xs={7}>
                                        <Typography variant="subtitle1" > 12/23</Typography> 
                                        </Grid> <Divider/>

                                        <Grid item xs={4}>
                                            <Typography variant="subtitle1" > Amount </Typography> 
                                        </Grid>
                                        <Grid item xs={7}>
                                        <Typography variant="subtitle1" > {item.Amount} </Typography> 
                                        </Grid> 

                                        <Grid item xs={4}>
                                            <Typography variant="subtitle1" > Products </Typography> 
                                        </Grid>
                                        <Grid item xs={3}>
                                        <Typography variant="subtitle1" > {item.Products.length} </Typography> 
                                        </Grid> <br/>                                
                                    </Grid>
                                </Box>                        
                            </CardContent>

                        
                            <Button variant="outlined" color="success"
                                sx={{position: 'absolute', 
                                    backgroundColor:"#00e676", 
                                    color:"black",
                                    marginLeft:"500px",
                                    marginTop:"-140px",
                                    width:"180px" }} 
                                    onClick={() => this.onOrderViewClick(item._id)} >                                    
                                View Order
                            </Button> 

                            <Button variant="outlined" color="warning"
                                sx={{position: 'absolute',  
                                    backgroundColor:"#ffc107", 
                                    color:"black",
                                    marginTop:"-60px",
                                    marginLeft:"500px",
                                    width:"180px"
                                    }}
                                onClick={() => this.cancelOrdModal(item._id)} >
                                Cancel Order
                            </Button>

                        </Card>
                    ))
                }

                    <Dialog
                        open={this.state.cancelOrd}
                        onClose={this.cancelOrdModalClose}
                        maxWidth="sm"
                     >
                        <ReportRoundedIcon  sx={{color:"#d32f2f", fontSize:"80px", marginLeft:"80px"}}/> <br/>
                         <DialogTitle id="alert-dialog-title" sx={{fontWeight:"bold"}}>
                            Delete Cart Detals ?
                        </DialogTitle>

                        <DialogActions sx={{display:"left"}}>
                            <Button onClick={() => this.cancelOrdModalClose()} sx={{backgroundColor:"#b2ff59", color:"black", marginRight:"150px", position:"absolute"}} >Cancel</Button>
                            <Button onClick={() => this.cancelOrders()} sx={{backgroundColor:"#ffc947", color:"black"}} autoFocus> Confirm </Button>
                        </DialogActions>

                    </Dialog>
                
            </div>
        )
    }
}