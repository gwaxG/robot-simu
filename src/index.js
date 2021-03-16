import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import {render} from 'react-dom'
import {
    BrowserRouter as Router,
    Route,
    NavLink
} from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Navbar from './components/BootstrapNavbar'
import Server from './components/Server'
import Data from './components/Data'
import Container from 'react-bootstrap/Container';
import BootstrapNavbar from "./components/BootstrapNavbar";

// import registerServiceWorker from './components/registerServiceWorker'

render(
    <BootstrapNavbar/>,
    document.getElementById('root')
)