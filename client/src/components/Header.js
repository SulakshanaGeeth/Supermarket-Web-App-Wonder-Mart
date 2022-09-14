import React, {useState} from 'react';
import {AppBar, Tab, Tabs, Toolbar, Typography} from "@mui/material";
import ShopIcon from '@mui/icons-material/Shop';
import { NavLink} from 'react-router-dom';
const Header=()=>{
    const [value,setValue] = useState();
    return <div>
        <AppBar sx={{ backgroundColor:"#1b5e20"}} position = "sticky">
            <Toolbar>
                <Typography>
                    <ShopIcon/>
                </Typography>
                    <Tabs
                        sx={ {ml:"auto"} }
                        textColor="inherit"
                          indicatorColor="secondary"
                          value={value}
                          onChange={(e,val) =>setValue(val)}>


                        <Tab LinkComponent={NavLink} to="/add" label="Add Product"/>
                        <Tab LinkComponent={NavLink} to="/products" label="Products"/>
                        <Tab LinkComponent={NavLink} to="/about" label="About Us"/>
                    </Tabs>
            </Toolbar>
        </AppBar>
    </div>;
};

export default Header;