import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';

import ButtonGroup from 'react-bootstrap/ButtonGroup';
//import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';

import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
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
            empty: <Container>
                    <div><h3>Select action on the left</h3></div>
                    <Row>
                        <Card style={{margin: "15px"}}>
                            <Card.Header>
                                Configurations
                            </Card.Header>
                            <Card.Body style={{fontSize: 15}}>To check available experiment configurations</Card.Body>
                        </Card>
                        <Card style={{margin: "15px"}}>
                            <Card.Header>
                                Queue
                            </Card.Header>
                            <Card.Body style={{fontSize: 15}}>To observe waiting task queue</Card.Body>
                        </Card>
                        <Card style={{margin: "15px"}}>
                            <Card.Header>
                                Pool
                            </Card.Header>
                            <Card.Body style={{fontSize: 15}}>To observe current active tasks</Card.Body>
                        </Card>
                    </Row>
            </Container>,
            config: <ServerConfig server={this.props.server}/>,
            queue: <ServerQueue server={this.props.server}/>,
            pool: <ServerPool server={this.props.server}/>,
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
                        <Button size="lg" variant="secondary" onClick={this.changeMainFieldConfig}>Configurations</Button>
                        <Button size="lg" variant="secondary" onClick={this.changeMainFieldQueue}>Queue</Button>
                        <Button size="lg" variant="secondary" onClick={this.changeMainFieldPool}>Pool</Button>
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
