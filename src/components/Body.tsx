import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import BtnKey from './Body/BtnKey';
import FormScreen from './Body/FormScreen';
import Hero from './Body/Hero';

const Body: React.FC = () => {
  return (
    <Container className="h-100">
      <Row className="h-75">
        <Col xs={12} sm={6} className="d-flex align-items-center">
          <Hero />
        </Col>
        <Col xs={12} sm={6} className="d-flex align-items-end ">
          <FormScreen />
        </Col>
      </Row>
      <Row className="h-25">
        <Col className="d-flex align-items-center">
          <BtnKey />
        </Col>
      </Row>
    </Container>
  );
};

export default Body;
