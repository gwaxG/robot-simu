import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState } from 'react';

import axios from 'axios';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';


// Forms https://reactjs.org/docs/forms.html
// yourVariable === 'object' && yourVariable !== null

class Card extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return "A";
    }
}

class ServerConfig extends React.Component {
    cards;
    constructor(props) {
        super(props);
        this.state = {data: ""}
        this.request();
    }

    callback(dat) {
        this.setState({data: dat})
    }

    request() {
        axios({
            method: 'get',
            url: this.props.server+'/configs',
        }).then(
            response => {
                this.callback(response.data)
            }
        ).catch(error=>{
            console.log("ERROR AAA");
            console.log("Can not fetch data from /configs");
        });
    }

    formResponse() {
        this.cards = [];
        if (this.state.data.msg !== "") {
            this.cards.push(<p>{this.state.data.msg}</p>)
        }

        for (const [i, launch_file] of this.state.data.launch_files.entries()) {
            this.cards.push(<Card config={this.state.data.configs[i]} launch_file={launch_file}/>)
        }

        const cardItems = this.cards.map((card) =>  <Jumbotron>{card}</Jumbotron>);
        return cardItems;
    }

    render() {
        return this.formResponse();
    }
}

export default ServerConfig;
