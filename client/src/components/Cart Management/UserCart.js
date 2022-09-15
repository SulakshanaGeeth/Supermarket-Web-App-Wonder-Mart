import React from "react";
import axios from "axios";

import {AlertDeleteCart} from "./Alert/Alert";
import Header from "../HeaderFooter/Header";
import Footer from "../HeaderFooter/Footer";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import ButtonGroup from '@mui/material/ButtonGroup';
import Toolbar from '@mui/material/Toolbar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import ReportRoundedIcon from '@mui/icons-material/ReportRounded';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default class UserCart extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            UserID:localStorage.getItem("id"),
            CartDet:[],
            Items: [],
            Qty : 0,
            Total: 0,
            remCart : false,
            cartID:"",
            snackbar:false,
            message:"",
            variant:"error"
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8070/cart/' + this.state.UserID)
        .then((res) => {
            this.setState({CartDet: res.data, Items: res.data.Products, Total: res.data.Total})
            //console.log(this.state.CartDet)
        })
        .catch((err) => console.error(err.message))

    }

    async clickPlus(pid, qty, price) {

        qty += 1;

        const Item = {
            ProductID : pid,
            Quantity : qty,
            ProductPrice : price
        }

        await axios.put('http://localhost:8070/cart/edit/' + this.state.UserID, Item)
        .then((res) => console.log(res.data))
        .catch((err) => console.error(err.message))

        this.componentDidMount();
    }

    async clickMinus(pid, qty, price) {

        if(qty > 1) {
            qty -= 1;

            const Item = {
                ProductID : pid,
                Quantity : qty,
                ProductPrice : (-price)
            }
            
            await axios.put('http://localhost:8070/cart/edit/' + this.state.UserID, Item)
            .then((res) => console.log(res.data))
            .catch((err) => console.error(err.message))
            
            this.componentDidMount();
        }
    }

    cartRemoveModal() { this.setState({remCart:true}) }
    cartRemoveModalClose() { this.setState({remCart:false})}

    async ItemRemove(pid) {
        // console.log(pid);

        const Remove = {            
            ProductID : pid,
            UserID:"U001"
        }
        console.log(Remove);

        await axios.delete('http://localhost:8070/cart/delete/' + this.state.UserID + "/" + pid)
        .then((res) => {console.log(res.data); this.setState({message:res.data});})
        .catch((err) => console.error(err.message))

        this.componentDidMount();
        this.snackbar()
    }

    async RemoveCart(id){
        //console.log(id);
        this.cartRemoveModalClose();

        await axios.delete('http://localhost:8070/cart/deleteAll/' + id)
        .then((res) => {AlertDeleteCart("success", "Deleted", res.data); })
        .catch((err) => console.error(err.message))
       
    }

    snackbar() {
        if(this.state.snackbar === false) {
            this.setState({snackbar:true})
          }else{
            this.setState({snackbar:false})
          }
    }

    render() {
        return (
            <div>
                 <Header/>
                <h1 style={{marginLeft:"300px"}}>Shopping Cart</h1>

                <Button onClick={() => this.cartRemoveModal()} variant="outlined" size="medium" sx={{backgroundColor:"#e53935", color:"black", marginLeft:"1000px"}}> Remove All </Button>

                {
                    this.state.Items.map((item) => (
                        <Card sx={{ width: "850px",maxHeight: "450px", marginLeft: "300px", marginBottom:"15px", marginTop:"15px", display: "inline-block"}}>
                            <br/>
                            <CardMedia
                                component="img"
                                height="150"
                                src={item.Image}
                                sx={{width:"200px", marginLeft: "10px", position:"relative", marginBottom:"-25px"}}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" sx={{color:"black", marginLeft:"220px", marginTop:"-120px"}}>
                                    {item.ProductName} <br/>
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{fontWeight:"bold", marginLeft:"220px"}}>
                                    
                                    Price : LKR {item.ProductPrice} <br/>  
                                </Typography>
                                <Typography variant="body2" color="text.secondary">

                                <Chip label="available" color="success" sx={{marginLeft:"220px", marginTop:"15px"}}/>
                                </Typography>
                            </CardContent>
                            <CardActions>

                            <ButtonGroup variant="outlined" aria-label="outlined button group">
                            <Fab onClick={() => this.clickMinus(item.ProductID, item.Quantity, item.ProductPrice) } color="default" aria-label="add" sx={{marginLeft:"400px", marginTop:"-100px"}}>
                                <RemoveRoundedIcon />
                            </Fab>
                            <Typography variant="body2" color="text.secondary" sx={{fontWeight:"bold", marginTop:"-85px", marginLeft:"25px", fontSize:"25px"}}>
                                    
                                    {item.Quantity} 
                                </Typography>
                            <Fab onClick={() => this.clickPlus(item.ProductID, item.Quantity, item.ProductPrice) } color="default" aria-label="add" sx={{marginLeft:"30px", marginTop:"-100px", position: "relative"}}>
                                <AddIcon />
                            </Fab>
                            </ButtonGroup>

                            

                                <Button onClick={() => this.ItemRemove(item.ProductID)} variant="outlined" size="small" sx={{ width:"150px", color:"black", marginLeft:"650px", marginBottom:"170px", backgroundColor:"#ffb300", position:"absolute"}}>Remove</Button>
                            </CardActions>
                    </Card>
                    ))}

                    <Toolbar sx={{backgroundColor:"#b2fab4", width: "808px", marginLeft:"300px"}} >
                        <Typography variant="body2" color="text.secondary" sx={{fontWeight:"bold", marginLeft:"100px", fontSize:"30px"}}>
                                    
                                    Total Amount   
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{fontWeight:"bold", marginLeft:"260px",  fontSize:"30px"}}>
                                    
                                    : LKR {this.state.Total}.00 <br/>  
                        </Typography>
                    </Toolbar>
                
                    <Dialog
                        open={this.state.remCart}
                        onClose={this.cartRemoveModalClose}
                        maxWidth="sm"
                     >
                        <ReportRoundedIcon  sx={{color:"#d32f2f", fontSize:"80px", marginLeft:"80px"}}/> <br/>
                         <DialogTitle id="alert-dialog-title" sx={{fontWeight:"bold"}}>
                            Delete Cart Detals ?
                        </DialogTitle>

                        <DialogActions sx={{display:"left"}}>
                            <Button onClick={() => this.cartRemoveModalClose()} sx={{backgroundColor:"#b2ff59", color:"black", marginRight:"150px", position:"absolute"}} >Cancel</Button>
                            <Button onClick={() => this.RemoveCart(this.state.CartDet._id)} sx={{backgroundColor:"#ffc947", color:"black"}} autoFocus>
                                Confirm
                            </Button>
                        </DialogActions>

                    </Dialog>

                    <Snackbar
                        open={this.state.snackbar}
                        onClose={() => this.snackbar()}
                        autoHideDuration={3000}
                        >
                        <Alert severity="success">{this.state.message}</Alert>                        
                                                    
                    </Snackbar>



                {/* <Button onClick={() => this.RemoveCart(this.state.CartDet._id)}> Remove All </Button>

                {
                    this.state.Items.map((item) => (
                        <Card onStart={() => this.TotalAmountCal(item.Quantity, item.ProductPrice)} style={{ backgroundColor:"aqua", width:"650px", height:"150px", marginLeft:"25px", marginTop:"15px", marginBottom:"10px" }}>
                            <Card.Title>Item Details</Card.Title>

                            <Card.Text>
                                Product ID : {item.ProductID} <br/>
                                Product Name : {item.ProductName} <br/>
                                Product Price : ${item.ProductPrice} <br/>
                                Product Quantity :  
                                <Button onClick={() => this.clickMinus(item.ProductID, item.Quantity, item.ProductPrice) } variant="primary" style={{ marginLeft:"10px", marginRight:"10px", height:"30px", width:"30px", borderRadius:"20px", fontSize:"15px", textAlign:"center"}}> - </Button>
                                    {item.Quantity}
                                <Button onClick={() => this.clickPlus(item.ProductID, item.Quantity, item.ProductPrice) } variant="primary" style={{ marginLeft:"10px", marginRight:"10px", height:"30px", width:"30px", borderRadius:"20px", fontSize:"15px", textAlign:"center"}}> + </Button> <br/>
                                <Button onClick={() => this.ItemRemove(item.ProductID)}> Remove </Button>
                            </Card.Text>
                        </Card>
                    ))
                }

                <Container fluid>
                    <Row style={{ marginLeft:"25px", backgroundColor:"lightgreen" , width:"650px"}}>
                        <Col> Total Amount : ${this.state.Total} </Col>
                    </Row>
                </Container> */}

                <Footer/>
            </div>
        )
    }
}