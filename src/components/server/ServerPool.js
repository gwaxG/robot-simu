import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';

import axios from 'axios';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import _ from 'lodash';
/*
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Toast from 'react-bootstrap/Toast';
*/

let configCounter = 0;

class ConfigForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {needUpdate: false};
        this.json = _.cloneDeep(props.config);
        this.jsonSave = _.cloneDeep(props.config);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitDelete = this.handleSubmitDelete.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmitDelete(event) {
        let data = {
            "task_id": this.props.task_id,
        }
        // this.props.parent_deleting()
        axios({
            method: 'POST',
            url: this.props.server+'/task/delete_active',
            data: data,
        })
            .then((resp)=>{
                this.props.parent_deleted()
            })
            .catch(error => console.log("SERVER ERROR", error));
    }

    handleChange(event, nesting) {
        _.set(this.json, nesting, event.target.value)
        let update = !this.state.needUpdate
        this.setState({needUpdate: update});
    }

    handleSubmit(event) {
        // console.log("Sending", this.json);
        let data = {
            "config": this.json,
            "launch_file": this.props.file,
            "msg": ""
        }
        console.log(data)
        axios({
            method: 'POST',
            url: this.props.server+'/task/create',
            data: data,
        })
            .then((resp)=>{console.log("SERVER ANSWER", resp)})
            .catch(error => console.log("SERVER ERROR", error));
    }

    form(obj, file, nesting="") {
        let sep = nesting === "" ? '' : '.';
        let fields = [];
        var wdt = "";
        var keys = Object.keys(obj);
        for (let i = 0; i<keys.length; i++) {
            if (typeof this.props.config[keys[i]] === 'object' ) {
                let res = this.form(obj[keys[i]], "", nesting+sep+keys[i]);
                fields = fields.concat(res);
            } else {
                if (keys[i].includes("path")) {
                    wdt = "500px";
                } else {
                    wdt = "200px";
                }
                fields.push(
                    <Row key={"row"+configCounter.toString()+i.toString()+nesting}>
                        <label key={"lbl"+configCounter.toString()+i.toString()+nesting}>
                            {nesting+sep+keys[i].toString()+ ", default: " + _.get(this.jsonSave, keys[i])}
                            <br key={"br"+configCounter.toString()+i.toString()+nesting}/>
                            <input
                                key={"input"+configCounter.toString()+i.toString()+nesting}
                                type="text"
                                style={{ width: wdt }}
                                value={_.get(this.json, nesting+sep+keys[i])} // this.json[keys[i]]
                                onChange={(event) => {
                                    this.handleChange(event, nesting+sep+keys[i])}
                                }
                            />
                        </label>
                    </Row>
                );
            }
        };
        return fields;
        // return <div key={"div"+configCounter.toString()+nesting}>{fields}</div>;
    }

    render() {
        let fields = this.form(this.props.config, this.props.file, "");
        // fields.push(<Button key={"unique config button"} variant="secondary" onClick={this.handleSubmit}>Create</Button>);
        fields.push(<div key={"very unique button2"}><Button key={"unique config button2"} variant="secondary" onClick={this.handleSubmitDelete}>Delete</Button></div>);
        return (
            <div>
                <h2>
                    Task of configuration: {this.props.file.split('/').slice(-1)[0].replace("_launch.py", "")}
                    <br/>
                </h2>
                {this.props.file}
                {fields}
            </div>
        );
    }
}

class ServerPool extends React.Component {
    constructor(props) {
        super(props);
        this.state = {resp: null}
        this.request();
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
            return <Jumbotron><h4>Response from /pool is not ready</h4></Jumbotron>;
        } else {
            if (this.state.resp.pool === null) {
                return <Jumbotron><h4>Pool is empty</h4></Jumbotron>;
            }
            let cards = [];
            for (let i = 0; i < this.state.resp.pool.length; i++) {
                configCounter += 1;
                cards.push(
                    <Jumbotron key={"jumb"+i}>
                        <Container key={"cont"+i}>
                            <ConfigForm
                                key={"form"+i}
                                config={this.state.resp.pool[i]}
                                file={this.state.resp.launch_files[i]}
                                server={this.props.server}
                            />
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

export default ServerPool;

