import React from 'react'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
} from "react-router-dom";

import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap'
import Server from './Server';
import Data from './Data';

class BootstrapNavbar extends React.Component{


    render(){
        return(
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <Router>
                            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                                <Navbar.Brand href="#home">Robot simu</Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="mr-auto">
                                        <Nav.Link href="/">Server</Nav.Link>
                                        <Nav.Link href="/data">Data</Nav.Link>
                                   </Nav>
                                </Navbar.Collapse>
                            </Navbar>
                            <br />
                            <Switch>
                                <Route exact path="/">
                                    <Server />
                                </Route>
                                <Route path="/data">
                                    <Data />
                                </Route>

                           </Switch>
                        </Router>
                    </div>
                </div>
            </div>
        )
    }
}


export default BootstrapNavbar;