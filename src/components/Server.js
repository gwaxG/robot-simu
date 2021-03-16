import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState } from 'react';

import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';



const ExampleToast = ({ children }) => {
  const [show, toggleShow] = useState(true);

  return (
      <>
        {!show && <Button onClick={() => toggleShow(true)}>Show Toast</Button>}
        <Toast show={show} onClose={() => toggleShow(false)}>
          <Toast.Header>
            <strong className="mr-auto">React-Bootstrap</strong>
          </Toast.Header>
          <Toast.Body>{children}</Toast.Body>
        </Toast>Welcome To React-Bootstrap
      </>
  );
};

const Server = () => (

        <Row>
            <Col xs="2">
                <Container>
                    <ButtonGroup vertical>
                        <Button variant="secondary">Configurations</Button>
                        <Button variant="secondary">Queue</Button>
                        <Button variant="secondary">Pool</Button>
                    </ButtonGroup>
                </Container>

            </Col>
            <Col xs="7">
                <Jumbotron>
                    <h1 className="header">Welcome To React-Bootstrap</h1>
                    <ExampleToast>
                        We now have Toasts
                        <span role="img" aria-label="tada">
                            🎉
                        </span>
                    </ExampleToast>
                </Jumbotron>
                <Jumbotron>
                    <h1 className="header">Welcome To React-Bootstrap</h1>
                    <ExampleToast>
                        We now have Toasts
                        <span role="img" aria-label="tada">
                            🎉
                        </span>
                    </ExampleToast>
                </Jumbotron>
            </Col>
            <Col xs="2"></Col>
        </Row>


);

export default Server;
