import React from "react";
import axios from "axios";

import Header from "../HeaderFooter/Header";
import Footer from "../HeaderFooter/Footer";

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import TextField from '@mui/material/TextField';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import Slide from '@mui/material/Slide';

export default class AllProducts extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            Products: [],
            Item: [],
            UserID:localStorage.getItem("id"),
            open: false,
            imge: "",
            snackbar : false,
            message:"",
            variant:"error",
            status:""
        }
    }

    componentDidMount(){
        axios.get('http://localhost:8070/products/')
        .then((res) => {
            this.setState({Products: res.data.products})
            //console.log(this.state.Products)
        })
        .catch((err) => console.log(err))
    }

    async InsertCart  (id) {
        //console.log(id);

        await axios.get('http://localhost:8070/products/' + id)
        .then((res) => {
            this.setState({Item: res.data.product})
            //console.log(this.state.Item)
        })
        .catch((err) => console.log(err.message))

        if(this.state.Item._id != null) {
           // console.log(this.state.Item);

            const Cart = {
                Products : {
                    ProductID : this.state.Item._id ,
                    ProductName: this.state.Item.productName,
                    ProductPrice: this.state.Item.price,
                    ProductCategory:this.state.Item.productCategory,
                    Quantity: 1,
                    Image : this.state.Item.image
                }
            }

            console.log(Cart);

            await axios.post('http://localhost:8070/cart/add/' + this.state.UserID, Cart)
            .then((res) => {console.log(res); this.setState({message:res.data, status:res.status});})
            .catch((err) => console.log(err.message))

            this.setState({Item:[]});

            if(this.state.status === 200)
               this.setState({variant:"success"});

            this.snackbar()

        } else {

            this.InsertCart(id);
            //console.log(id)
        }
    }    

    catogaryOpen() {
        if(this.state.open === false) {
            this.setState({open:true})
          }else{
            this.setState({open:false})
          }
    }

    snackbar() {
        if(this.state.snackbar === false) {
            this.setState({snackbar:true})
          }else{
            this.setState({snackbar:false})
          }
    }

    async ItemsByCategory(category) {
        //console.log(category)

        this.catogaryOpen();

        if(category === "All")
            this.componentDidMount();

        else {
            await axios.get('http://localhost:8070/cart/getProduct/' + category)
            .then((res) => {
                this.setState({Products: res.data})
                console.log(this.state.Products)
            })
            .catch((err) => console.log(err.message))
        }        
    }

    render() {
        return (
            <div>

                <Header />
                
                <ButtonGroup variant="contained" aria-label="split button" sx={{ position:"absolute", marginLeft:"320px", marginTop:"-10px"}}>
                    <Button sx={{ backgroundColor:"white", color:"black", width:"200px"}} onClick={() => this.catogaryOpen()} endIcon={<ArrowDropDownIcon />} >Catogory</Button>
                    
                    <Menu
                        id="menu-appbar"
                        sx={{
                        marginTop:"140px", marginLeft:"305px"
                        }}
                        anchorEl={this.state.logo}
                        anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                        }}
                        open={this.state.open}
                        onClose={() => this.catogaryOpen()}
                     >
                        <MenuList sx={{display:"block"}} >
                            <MenuItem sx={{width:"200px"}} onClick={() => this.ItemsByCategory("All")} > All </MenuItem> <Divider />
                            <MenuItem sx={{width:"200px"}} onClick={() => this.ItemsByCategory("Snacks")} > Snacks  </MenuItem> <Divider />
                            <MenuItem sx={{width:"200px"}} onClick={() => this.ItemsByCategory("Tea & Coffe")} >  Tea & Coffe </MenuItem> <Divider />
                            <MenuItem sx={{width:"200px"}} onClick={() => this.ItemsByCategory("Dairy")} >  Dairy </MenuItem> <Divider />
                            <MenuItem sx={{width:"200px"}} onClick={() => this.ItemsByCategory("Personal Care")} >  Personal Care </MenuItem> <Divider />
                        </MenuList>
                       
                    </Menu>

                    <TextField                        
                        id="filled-required"
                        sx={{backgroundColor:"white", color:"black", outlined:"none", width:"450px"}}
                        />
                    
                    <Button variant="contained" color="inherit" sx={{backgroundColor:"#80e27e", color:"black",width:"150px"}} startIcon={<SearchRoundedIcon fontSize="medium" hover="true" />}>
                        Search
                    </Button>
                </ButtonGroup>

                <div style={{marginBottom:"50px"}} ></div>

                {
                    this.state.Products.map((product) =>(
                        <Card sx={{ maxWidth: "250px",maxHeight: "550px", width:"250px", marginLeft: "100px", marginBottom:"15px", marginTop:"15px", display: "inline-block"}}>
                            <CardMedia
                                component="img"
                                height="250"
                                src={product.image}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {product.productName} <br/>
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{fontWeight:"bold"}}>
                                    
                                    Price : LKR {product.price} <br/> 
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                Available : {product.quentity}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button onClick={() => this.InsertCart(product._id)} size="small" sx={{color:"black", marginLeft:"60px", backgroundColor:"#ffb300"}}>Add to Cart</Button>
                            </CardActions>
                        </Card>

                ))}
                <br/>

                <Snackbar
                    open={this.state.snackbar}
                    onClose={() => this.snackbar()}
                    autoHideDuration={3000}
                    anchorOrigin={{ vertical:'bottom', horizontal:'center' }}
                    sx={{marginBottom:"20px"}}
                    TransitionComponent={Slide}
                 >
                   <Alert severity={this.state.variant}>{this.state.message}</Alert>
                                            
                </Snackbar>
                
            <Footer/>
                
            </div>
            
        )
    }
}