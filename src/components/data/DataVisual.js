import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';

import axios from 'axios';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import WaitComponent from "./WaitComp";
/*
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Toast from 'react-bootstrap/Toast';
*/


class DataVisual extends React.Component {
    constructor(props) {
        super(props);
        this.state = {resp: null}
        //this.request();
    }

    request() {
        var self = this;
        axios({
            method: 'get',
            url: this.props.server+'/pool',
        }).then(
            response => {
                self.setState({resp: response.data});
            }
        ).catch(error=>{
            console.log("Can not fetch data from /pool");
            console.error(error);
        });
    }

    formResponse() {
        if (this.state.resp === null) {
            return <WaitComponent/>;
        } else {
            if (this.state.resp.pool === null) {
                return <Jumbotron><h4>Pool is empty</h4></Jumbotron>;
            }
            let cards = [];
            for (let i = 0; i < this.state.resp.pool.length; i++) {
                cards.push(
                    <Jumbotron key={"jumb"+i}>
                        <Container key={"cont"+i}>
                        </Container>
                    </Jumbotron>
                );
            }
            return cards;
        }
    }

    render (){
        return this.formResponse()
    }
}

export default DataVisual;

