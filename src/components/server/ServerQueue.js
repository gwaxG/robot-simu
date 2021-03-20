import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';

import axios from 'axios';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
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
        this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this);
        this.sent = false;
    }

    handleChange(event, nesting) {
        _.set(this.json, nesting, event.target.value)
        let update = !this.state.needUpdate
        this.setState({needUpdate: update});
    }

    handleSubmitUpdate(event) {
        console.log("Sending", this.json);
        let data = {
            "config": this.json,
            "task_id": this.props.task_id,
        }
        console.log(data)
        axios({
            method: 'POST',
            url: this.props.server+'/task/update',
            data: data,
        })
            .then((resp)=>{console.log("SERVER ANSWER", resp)})
            .catch(error => console.log("SERVER ERROR", error));
    }

    handleSubmitDelete(event) {
        let data = {
            "task_id": this.props.task_id,
        }
        this.props.parent_deleting()
        // var self = this;
        axios({
            method: 'POST',
            url: this.props.server+'/task/delete',
            data: data,
        })
            .then((resp)=>{
                this.props.parent_deleted()
            })
            .catch(error => console.log("SERVER ERROR", error));
    }

    form(obj, file, nesting="") {
        let sep = nesting === "" ? '' : '.';
        let fields = [];
        var wdt = "";
        var keys = Object.keys(obj);
        for (let i = 0; i<keys.length; i++) {
            if (typeof this.props.config[keys[i]] === 'object') {
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
    }

    render() {
        let fields = this.form(this.props.config, this.props.file, "");
        fields.push(<div key={"very unique button1"}><Button key={"unique config button1"} variant="secondary" onClick={this.handleSubmitUpdate}>Update</Button></div>);
        fields.push(<br key={"some unique brrrr"}/>);
        fields.push(<div key={"very unique button2"}><Button key={"unique config button2"} variant="secondary" onClick={this.handleSubmitDelete}>Delete</Button></div>);
        return (
            <div>
                <h2>
                    Waiting task {this.props.task_id}: {this.props.file.split('/').slice(-1)[0].replace("_launch.py", "")}
                    <br/>
                </h2>
                {this.props.file}
                {fields}
            </div>
        );
    }
}

class ServerQueue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resp: null,
            isDeleting: false,
            cards: null
        }
        this.deleting = this.deleting.bind(this)
        this.deleted = this.deleted.bind(this)
        this.request();
    }

    sleepFor( sleepDuration ){
        var now = new Date().getTime();
        while(new Date().getTime() < now + sleepDuration){ /* do nothing */ }
    }


    deleting() {
        this.setState({isDeleting: true})
    }

    deleted() {
        this.setState({isDeleting: false})
        this.request();
    }

    request() {
        var self = this;
        axios({
            method: 'get',
            url: this.props.server+'/queue',
        }).then(
            response => {
                self.setState({resp: response.data});
            }
        ).catch(error=>{
            console.log("Can not fetch data from /queue");
            console.error(error);
        });
    }

    formResponse() {
        console.log("DBG", this.state.resp === null, this.state.isDeleting);
        if (this.state.resp === null || this.state.isDeleting) {
            return (
                <Jumbotron>
                    <Row><h4 >Response from /queue is not ready</h4></Row>
                    <Row><h4><Spinner animation="grow" /></h4></Row>
                </Jumbotron>);
        } else {
            if (this.state.resp.queue === null) {
                return <Jumbotron><h4>Queue is empty</h4></Jumbotron>;
            }
            let cards = [];
            for (let i = 0; i < this.state.resp.queue.length; i++) {
                configCounter += 1;
                cards.push(
                    <Jumbotron key={"jumb"+i}>
                        <Container key={"cont"+i}>
                            <ConfigForm
                                key={"form"+i}
                                config={this.state.resp.queue[i]}
                                file={this.state.resp.launch_files[i]}
                                server={this.props.server}
                                task_id = {i}
                                parent_deleting = {this.deleting}
                                parent_deleted = {this.deleted}
                            />
                        </Container>
                    </Jumbotron>
                );
            }
            return cards;
        }
    }

    static  getDerivedStateFromProps(props, state){
        // this.request()
        return null;
    }

    render (){
        // this.state.cards = this.formResponse();
        return this.formResponse()
    }
}

export default ServerQueue;

