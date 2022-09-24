import React from 'react';

import AllOrders from './AllOrders';
import CancelledOrders from './CancelledOrders';
import PlacedOrders from './PlacedOrders';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Container from '@mui/material/Container';

export default class OrdersAdmin extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value:"one",
            receiveShow:"true",
            deliveredShow: "none",
            cancelledShow: "none"
        }
    }

    handleChange(val) {
        this.setState({value:val})

        if(val === "one")
            this.setState({receiveShow:"true", deliveredShow:"none", cancelledShow: "none"})
        else if(val === "two")
            this.setState({deliveredShow:"true", receiveShow:"none", cancelledShow: "none"})
        else 
            this.setState({cancelledShow:"true", receiveShow:"none", deliveredShow:"none",})
    }

    render() {
        return (
            <div>
                <Tabs
                    value={this.state.value}
                    onChange={() => this.handleChange()}
                    textColor="primary"
                    indicatorColor="primary"
                    centered
                    sx={{backgroundColor:"#f5f5f5", color:"black", width:"720px", marginLeft:"250px", marginTop:"25px" }}
                >
                    <Tab value="one" label="Placed Orders" onClick={() => this.handleChange("one")} sx={{width:"240px"}} />
                    <Tab value="two" label="Cancelled Orders" onClick={() => this.handleChange("two")} sx={{width:"240px"}}/>
                    <Tab value="three" label="Order History" onClick={() => this.handleChange("three")} sx={{width:"240px"}}/>
                </Tabs>

                <Container sx={{display:this.state.receiveShow, marginTop:"25px", marginBottom:"25px"}} >
                    <PlacedOrders/>
                </Container>
                
                <Container sx={{display:this.state.deliveredShow, marginTop:"25px", marginBottom:"25px"}} >
                    <CancelledOrders/>
                </Container>

                <Container sx={{display:this.state.cancelledShow, marginTop:"25px", marginBottom:"25px"}} >                    
                    <AllOrders/>
                </Container>
            </div>
        )
    }
}