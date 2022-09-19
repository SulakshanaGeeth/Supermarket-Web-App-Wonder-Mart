import React from "react";

import Receiving from "./Receiving";
import Delivered from "./Delivered";
import Delivering from "./Delivering";
import Header from "../HeaderFooter/Header";
import Footer from "../HeaderFooter/Footer";

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Container from '@mui/material/Container';

export default class Orders extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            value:"one",
            receiveShow:"true",
            deliveredShow: "none"
        }
    }

    handleChange(val) {
        this.setState({value:val})

        if(val === "one")
            this.setState({receiveShow:"true", deliveredShow:"none"})
        else
            this.setState({deliveredShow:"true", receiveShow:"none"})
    }

    render() {
        return (
            <div>
                <Header />

                <Tabs
                    value={this.state.value}
                    onChange={() => this.handleChange()}
                    textColor="primary"
                    indicatorColor="primary"
                    centered
                    sx={{backgroundColor:"#f5f5f5", color:"black", width:"340px", marginLeft:"550px", marginTop:"25px" }}
                >
                    <Tab value="one" label="To Receive" onClick={() => this.handleChange("one")} sx={{width:"170px"}} />
                    <Tab value="two" label="Delivered" onClick={() => this.handleChange("two")} sx={{width:"170px"}}/>
                </Tabs>

                <Container sx={{display:this.state.receiveShow, marginTop:"25px", marginBottom:"25px"}} >
                    <Receiving/>
                    <Delivering/>
                </Container>
                
                <Container sx={{display:this.state.deliveredShow, marginTop:"25px", marginBottom:"25px"}} >
                    <Delivered/>
                </Container>

                <Footer/>
            </div>
        )
    }
}