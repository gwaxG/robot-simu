import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';

import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Log from './Log';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import WaitComponent from "./WaitComp";
import Figure from "./Figure";
import * as cloneDeep from "lodash/cloneDeep";

/*
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Toast from 'react-bootstrap/Toast';
*/

class InputForm extends React.Component {
    constructor(props) {
        super(props);
        this.field = "";
        this.state = {needUpdate: false};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.field = event.target.value
        let update = !this.state.needUpdate
        this.setState({needUpdate: update});
        this.onChange(this.field);
    }

    onChange = (field) => {
        this.props.setField(field)
    }

    render(){
        return <input
            type="text"
            value={this.field} // this.json[keys[i]]
            onChange={(event) => {
                this.handleChange(event)}
            }
        />;
    }

}

class Figures extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            respCollections: null,
            respFigures: null,
            collection: null,
            needUpdate: false,
        }
        this.fields = "";
        this.requestCollections();
    }



    setField(value){
        this.fields = value;
    }

    requestCollections() {
        if (this.state.respCollections !== null)
        {
            return null
        }
        let self = this;
        axios({
            method: 'get',
            url: this.props.server+'/colls',
            params: {
                database: this.props.database,
            }
        }).then(
            response => {
                self.setState({respCollections: response.data});
            }
        ).catch(error=>{
            console.log("Can not fetch data from /colls");
            console.error(error);
        });
    }

    onClick(collection) {
        let fields = this.fields.split(" ")
        let self = this;
        axios({
            method: 'post',
            url: this.props.server+'/visualize',
            params: {
                database: this.props.database,
                collection: collection,
            },
            data: {
                data: fields,
            }
        }).then(
            response => {
                self.setState({respFigures: response.data});
            }
        ).catch(error=>{
            console.log("Can not fetch data from /visualize");
            console.error(error);
        });
    }

    unpackInfoCard(fields) {
        let row = [];
        let rows = [];
        if (fields == undefined )
            return (
                <Row>The "fields" variable is undefined for the figures component.</Row>
            );

        for (let i=0; i<fields.length; i++) {
            row.push(<Col key={fields[i]}>{fields[i]}</Col>);
            if (row.length % 2 === 0) {
                rows.push(<Row key={fields[i]}>{row}</Row>)
                row = []
            }
        }
        rows.push(<Row key={"unique"}>{row}</Row>)
        rows.push(<p key={"very unique key"} style={{margin: "5px", color: "blue", fontSize:"10px"}}>One database must have rollouts with the same document fields!</p>)
        return (
            <Row>
                <Card style={{margin: "15px"}}>
                    <Card.Header>
                        Fields
                    </Card.Header>
                    <Card.Body style={{fontSize: 15}}>{rows}</Card.Body>
                </Card>
            </Row>
        );
    }

    // return array of figures
    drawFigures(){
        let data = this.state.respFigures["data"];
        let figs = [];
        let log = false;
        for (const [key, value] of Object.entries(data)) {
            if (key !== 'log') {
                figs.push(<Col key={key}><Figure key={key} name={key} data={value}/></Col>);
            } else {
                log = true;
            }
        }
        if (log) {
            figs.push(<Log key={"log"} data={data.log}/>);
        }
        return figs;
    }

    form() {
        let rows = [];
        let name = "";

        // form info card
        let allFields = this.unpackInfoCard(this.state.respCollections["fields"][0]);

        // input field
        let inp = <InputForm setField={(e)=>this.setField(e)}/>;
        // collection buttons
        let row = [];
        for (let i = 0; i < this.state.respCollections.colls.length; i++) {
            name = this.state.respCollections["colls"][i];
            let button =
                <
                    Button
                    style={{margin: "15px"}}
                    key={"unique button "+name}
                    variant="dark" onClick={()=>this.onClick(this.state.respCollections["colls"][i])}
                    value={name}
                    id={"button "+name}
                >
                    {name}
                </Button>;
                row.push(button)
                if (row.length % 2 === 0) {
                    rows.push(<Row key={"row "+name}>{cloneDeep(row)}</Row>);
                    row = []
                }
        }
        rows.push(<Row key={"unique"}>{cloneDeep(row)}</Row>);
        let figures = "Empty";
        if (this.state.respFigures !== null) {
            figures = this.drawFigures();
        }
        return (
            <Row>
                <Col xs={"3"}>
                    <Row>{allFields}</Row>
                    <Row>{inp}</Row>
                    <Row>{rows}</Row>
                </Col>
                <Col xs={"9"}>
                    {figures}
                </Col>
            </Row>
        );
    }

    render (){
        console.log("Rendering main window");
        let toRender = null;
        if (this.state.respCollections === null) {
            toRender = <WaitComponent/>;
        } else {
            console.log("Requesting form");
            toRender = this.form(); // this.unpackFigures(this.state.respFigures);
        }
        return toRender;
    }
}

export default Figures;

