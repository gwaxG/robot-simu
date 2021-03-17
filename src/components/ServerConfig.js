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


/*
a = {a:{b:{c:{d:4}}}}
l = ["a", "b" , "c", "d"];
s = a
for (k of l) {
  s = s[k]
}
console.log(s)
* */

let configCounter = 0;
class ConfigForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {needUpdate: false};
        this.json = props.config;
        this.jsonSave = props.config;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event, nesting) {
        _.set(this.json, nesting, event.target.value)
        let update = !this.state.needUpdate
        this.setState({needUpdate: update});
    }

    handleSubmit(event) {
        console.log(this.state.value);
    }

    getObjects(obj, key, val, newVal) {
        var newValue = newVal;
        var objects = [];
        for (var i in obj) {
            if (!obj.hasOwnProperty(i)) continue;
            if (typeof obj[i] == 'object') {
                objects = objects.concat(this.getObjects(obj[i], key, val, newValue));
            } else if (i == key && obj[key] == val) {
                obj[key] = newVal;
            }
        }
        return obj;
    }

    getValue(obj, key) {
        var objects = [];
        for (var i in obj) {
            if (!obj.hasOwnProperty(i)) continue;
            if (typeof obj[i] == 'object') {
                return this.getValue(obj[i], key);
            } else if (i == key) {
                return obj[key];
            }
        }
        return null;
    }

    form(obj, file, nesting="") {
        let sep = nesting === "" ? '' : '.';
        let fields = [];
        var keys = Object.keys(obj);
        for (let i = 0; i<keys.length; i++) {
            if (typeof this.props.config[keys[i]] === 'object') {
                let res = this.form(obj[keys[i]], "", nesting+sep+keys[i]);
                fields = fields.concat(res);
            } else {
                fields.push(
                    <Row key={"row"+configCounter.toString()+i.toString()+nesting}>
                        <label key={"lbl"+configCounter.toString()+i.toString()+nesting}>
                            {nesting+sep+keys[i].toString()+ ", default: " + _.get(this.jsonSave, keys[i])}
                            <br key={"br"+configCounter.toString()+i.toString()+nesting}/>
                            <input
                                key={"input"+configCounter.toString()+i.toString()+nesting}
                                type="text"
                                value={_.get(this.json, nesting+sep+keys[i])} // this.json[keys[i]]
                                onChange={(event) => {
                                    this.handleChange(event, nesting+sep+keys[i])}
                                }
                            />
                        </label>
                    </Row>
                );
                console.log(nesting+'.'+keys[i]);
            }
        };
        //
        // <Button variant="secondary" onClick={this.handleSubmit}>Submit</Button>
        return <div key={"div"+configCounter.toString()+nesting}>{fields}</div>;
    }

    render() {
        return <div><h2>Configuraiton</h2>{this.form(this.props.config, this.props.file, "")}</div>;
    }
}

class ServerConfig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {resp: null}
        this.request();
    }

    request() {
        var self = this;
        axios({
            method: 'get',
            url: this.props.server+'/configs',
        }).then(
            response => {
                self.setState({resp: response.data});
            }
        ).catch(error=>{
            console.log("Can not fetch data from /configs");
            console.error(error);
        });
    }

    formResponse() {
        if (this.state.resp === null) {
            return <Jumbotron><h4>Response from /configs is not ready</h4></Jumbotron>;
        } else {
            let cards = [];
            for (let i = 0; i < this.state.resp.configs.length; i++) {
                configCounter += 1;
                cards.push(
                    <Jumbotron key={"jumb"+i}>
                        <Container key={"cont"+i}>
                            <ConfigForm
                                key={"form"+i}
                                config={this.state.resp.configs[i]}
                                file={this.state.resp.launch_files[i]}
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

export default ServerConfig;

