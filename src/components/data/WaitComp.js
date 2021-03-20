import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';



export default class WaitComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <Jumbotron>
                <Row>
                    <h4 style={{margin:"15px"}}>Response is not ready</h4>
                    <Spinner style={{margin:"15px"}} animation="grow" />
                </Row>
            </Jumbotron>
        );
    }
}
