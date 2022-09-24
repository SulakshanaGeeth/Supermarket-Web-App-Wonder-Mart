import React from 'react';

import AdminDashboard from '../AdminDashboard';

import IconButton from "@mui/material/IconButton";
import ReplyIcon from "@mui/icons-material/Reply";

export default class ViewOrder extends React.Component {

    render() {
        return (
            <div>
                <div>
                    <AdminDashboard/>
                </div>

                <div style={{marginLeft:'250px', marginTop:'70px'}} >
                    <IconButton aria-label="delete" href="/admin/Orders">
                        <ReplyIcon style={{ fontSize: "200%" }} />
                    </IconButton>
                </div>                                
            </div>
        )
    }
}