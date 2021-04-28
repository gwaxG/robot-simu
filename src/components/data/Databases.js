import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';

import axios from 'axios';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import WaitComponent from "./WaitComp";
import _ from "lodash";
import * as cloneDeep from "lodash/cloneDeep";
/*
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Toast from 'react-bootstrap/Toast';
*/


class Databases extends React.Component {
    constructor(props) {
        super(props);
        this.state = {resp:null}
        this.request();
    }

    request() {
        var self = this;

        axios({
            method: 'get',
            url: this.props.server+'/dbs',
        }).then(
            response => {
                self.setState({resp: response.data});
            }
        ).catch(error=>{
            console.log("Can not fetch data from /dbs");
            console.error(error);
        });
        if (this.state.resp !== null) {
            console.log("requested", this.state.server+'/dbs', this.props.resp);
        }
    }

    onClick = (e) => {
        this.props.select_database(e.target.value)
    }

    getDatabaseButtons() {
        let row = [];
        let rows = [];
        let name = "";
        for (let i = 0; i < this.state.resp.data.length; i++) {
            name = this.state.resp.data[i];
            let button =
                <Button
                    style={{margin: "15px"}}
                    key={"unique button "+name}
                    variant="dark" onClick={this.onClick}
                    value={name}
                >
                    {name}
                </Button>;
            row.push(button);
            if (row.length % 5 === 0){
                rows.push(<Row key={"row "+name}>{cloneDeep(row)}</Row>);
                row = [];
            }
        }
        rows.push(<Row key={"row "+name}>{row}</Row>);
        return rows;
    }

    render (){
        let toRender;
        if (this.state.resp === null) {
            toRender = <WaitComponent/>;
        } else {
            toRender = this.getDatabaseButtons();
        }
        return toRender;
    }
}

export default Databases;

