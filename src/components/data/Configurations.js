import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';

import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Jumbotron from 'react-bootstrap/Jumbotron';
import WaitComponent from "./WaitComp";
import _ from 'lodash';

/*
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Toast from 'react-bootstrap/Toast';
*/


class Configurations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {resp: null, config: null}
        this.request();
    }

    request() {
        let self = this;
        axios({
            method: 'get',
            url: this.props.server+'/hist',
            params: {
                database: this.props.database,
            }
        }).then(
            response => {
                self.setState({resp: response.data});
            }
        ).catch(error=>{
            console.log("Can not fetch data from /queue");
            console.error(error);
        });
    }

    onClick(config) {
        this.setState({config: config});
    }

    flattenObject(obj){
        const flattened = {}
        Object.keys(obj).forEach((key) => {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                Object.assign(flattened, this.flattenObject(obj[key]))
            } else {
                flattened[key] = obj[key]
            }
        })
        return flattened
    }

    unpack(config) {
        if (this.state.config === null) {
            return <Jumbotron/>
        }
        let data = [];
        let flatten = this.flattenObject(config);
        for (const [key, value] of Object.entries(flatten)) {
            data.push(
                <Row key={key}>{key}: {value.toString()}</Row>
            );
        }
        return <Jumbotron>{data}</Jumbotron>;
    }

    form() {
        const { popoverOpen } = this.state;

        let row = [];
        let rows = [];
        let name = "";
        for (let i = 0; i < this.state.resp.configs.length; i++) {
            name = this.state.resp.configs[i]["name"];
            let button =
                <Button
                    style={{margin: "15px"}}
                    key={"unique button "+name}
                    variant="dark" onClick={()=>this.onClick(this.state.resp.configs[i]["config"])}
                    value={name}
                    id={"button "+name}
                >
                    {name}
                </Button>;

            row.push(button);
            if (row.length % 6 === 0){
                rows.push(<Row key={"row "+name}>{_.deeplyCopy(row)}</Row>);
                row = [];
            }
        }
        rows.push(<Row key={"row last"}>{row}</Row>);
        return <Row>
            <Col>
                {rows}
            </Col>
            <Col>
                {this.unpack(this.state.config)}
            </Col>
        </Row>;
    }

    render (){
        let toRender = null;
        if (this.state.resp === null) {
            toRender = <WaitComponent/>;
        } else {
            return  this.form();
        }
        return toRender;
    }
}

export default Configurations;

