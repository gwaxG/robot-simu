import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';

import ButtonGroup from 'react-bootstrap/ButtonGroup';
//import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import ServerConfig from './ServerConfig';
import ServerQueue from './ServerQueue';
import ServerPool from './ServerPool';

class Server extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            field: <Container><h1>Empty</h1></Container>,
        };
        this.fields = {
            empty: <Container><h1>Empty</h1></Container>,
            config: <ServerConfig server="http://localhost:10000"/>,
            queue: <ServerQueue server="http://localhost:10000"/>,
            pool: <ServerPool server="http://localhost:10000"/>,
        };
        this.state = {
            field:this.fields.empty,
        };
    }

    requestConfig() {}
    requestQueue() {}
    requestPool() {}

    changeMainFieldConfig = () => {
        this.setState({field: this.fields.config});
    }

    changeMainFieldQueue = () => {
        this.setState({field: this.fields.queue});
    }

    changeMainFieldPool = () => {
        this.setState({field: this.fields.pool});
    }

    render() {
        return <Row>
            <Col xs="2">
                <Container>
                    <ButtonGroup vertical>
                        <Button variant="secondary" onClick={this.changeMainFieldConfig}>Configurations</Button>
                        <Button variant="secondary" onClick={this.changeMainFieldQueue}>Queue</Button>
                        <Button variant="secondary" onClick={this.changeMainFieldPool}>Pool</Button>
                    </ButtonGroup>
                </Container>
            </Col>
            <Col xs="7">
                <Container>
                    {this.state.field}
                </Container>
            </Col>
            <Col xs="2">
            </Col>
        </Row>;
    }
}



export default Server;
