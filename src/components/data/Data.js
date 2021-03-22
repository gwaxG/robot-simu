import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';

import ButtonGroup from 'react-bootstrap/ButtonGroup';
//import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import DataVisual from './DataVisual';
import DataHist from './DataHist';


class Data extends React.Component {
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
                            Config history
                        </Card.Header>
                        <Card.Body style={{fontSize: 15}}>To check databases and used experiment configurations</Card.Body>
                    </Card>
                    <Card style={{margin: "15px"}}>
                        <Card.Header>
                            Visualization
                        </Card.Header>
                        <Card.Body style={{fontSize: 15}}>To plot experiment data from a chosen database</Card.Body>
                    </Card>
                </Row>
            </Container>,
            visual: <DataVisual server={this.props.server}/>,
            hist: <DataHist server={this.props.server}/>,
        };
        this.state = {
            field:this.fields.empty,
        };
    }

   changeMainFieldVisual = () => {
        this.setState({field: this.fields.visual});
    }

    changeMainFieldHist = () => {
        this.setState({field: this.fields.hist});
    }

    render() {
        return <Row>
            <Col xs="2">
                    <ButtonGroup vertical>
                        <Button size="lg" variant="secondary" onClick={this.changeMainFieldHist}>Config history</Button>
                        <Button size="lg" variant="secondary" onClick={this.changeMainFieldVisual}>Visualization</Button>
                    </ButtonGroup>
            </Col>
            <Col xs="9">
                    {this.state.field}
            </Col>
            <Col/>
        </Row>;
    }
}



export default Data;
