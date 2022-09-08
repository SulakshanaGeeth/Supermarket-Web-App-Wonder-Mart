import React, {useState} from 'react';
import {AppBar, Tab, Tabs, Toolbar, Typography} from "@mui/material";
import ShopIcon from '@mui/icons-material/Shop';
const Header=()=>{
    const [value,setValue] = useState();
    return <div>
        <AppBar sx={{backgroundColor=""}} position = "sticky">
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
                        <Tab label="Add Product"/>
                        <Tab label="Products"/>
                        <Tab label="About Us"/>
                    </Tabs>
            </Toolbar>
        </AppBar>
    </div>;
};

export default Header;