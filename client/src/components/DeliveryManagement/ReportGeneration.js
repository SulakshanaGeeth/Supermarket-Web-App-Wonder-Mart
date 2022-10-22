import React from "react";
import axios from "axios";
import JsPDF from "jspdf";

import IconButton from "@mui/material/IconButton";
import ReplyIcon from "@mui/icons-material/Reply";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button  from '@mui/material/Button';

export default class ReportRiders extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            Riders: [],
        }
    }

    async componentDidMount() {
        await axios.get('http://localhost:8070/Dperson/')
        .then( (response) => {
            this.setState({Riders:response.data})
            console.log(response.data)
        })
        .catch((err) => console.log(err.message))
    }

    DownloadInvoice = () => {
        const report = new JsPDF("portrait", "px", "a1");
        report.html(document.querySelector("#RidersRep")).then(() => {
        report.save("RidersReport.pdf");
        })
    }
    
    render() {
        return (
            <div>
                <IconButton aria-label="delete" href="/admin/allPersons">
                    <ReplyIcon style={{ fontSize: "200%" }} />
                </IconButton>
                <br/> 
                <Table id="RidersRep" >
                    <TableHead>
                        <TableRow>
                            <TableCell>Rider ID</TableCell>
                            <TableCell>Rider Name</TableCell>
                            <TableCell>Rider Address</TableCell>
                            <TableCell>Rider Contact No</TableCell>
                            <TableCell>Rider NIC</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {
                            this.state.Riders.map((ride) => (
                                <TableRow>
                                    <TableCell> {ride._id}</TableCell> 
                                    <TableCell> {ride.name}</TableCell> 
                                    <TableCell> {ride.Address}</TableCell> 
                                    <TableCell> {ride.PhoneNumber}</TableCell> 
                                    <TableCell> {ride.IdNumber}</TableCell> 
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>

                <br/>
                <Button
                    variant="contained"
                    color="inherit"
                    onClick={() => this.DownloadInvoice()}
                > Download </Button>
            </div>
        )
    }
}