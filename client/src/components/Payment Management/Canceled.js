import React from "react";
import axios from "axios";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import  Box  from "@mui/material/Box";
import Button from '@mui/material/Button';

export default class Cancelled extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            Orders:[],
            UserID:localStorage.getItem("id"),
        }
    }

    componentDidMount(){
        axios.get("http://localhost:8070/order/cancelled/" + this.state.UserID)
        .then((res) => {
            this.setState({Orders:res.data});
            console.log(res.data)
        })
        .catch((err) => console.error(err.message))
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
                                    marginTop:"-110px",
                                    width:"180px" }} >                                    
                                View Order
                            </Button> 

                        </Card>
                    ))
                }
            </div>
        )
    }
}