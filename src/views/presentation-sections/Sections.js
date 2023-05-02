import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import { Button, Container, Row, Col, Card, CardImg, CardBody, CardText } from "reactstrap";

// core components

function Sections() {
  return (
    <>
      <div className="section section-sections" data-background-color="gray">
        <Container>
          <Col className="ml-auto mr-auto" md="8">
            <div className="section-description text-center">
              <h2 className="title">Sections you will love</h2>
              <h5 className="description">
                Build pages in no time using pre-made sections! From headers to
                footers, you will be able to choose the best combination for
                your project. We have created multiple sections for you to put
                together and customise into pixel perfect example pages.
              </h5>
              <Button
                className="btn-round"
                to="/sections"
                color="info"
                tag={Link}
              >
                View All Sections
              </Button>
            </div>
          </Col>
        </Container>
        <Container fluid>
          <div className="section-cols">
            <Row>
              <Col md="3">
                <Card >
                    <CardImg alt="..." src={require("assets/img/presentation-page/header3.jpg")} top></CardImg>
                    <CardBody>
                      <CardText>
                        <Row>
                          <Col>Text here</Col>
                          <Col>Time here</Col>
                        </Row>
                      </CardText>
                    </CardBody>
                </Card>
              </Col>
              <Col md="3">
              <Card >
                  <CardImg alt="..." src={require("assets/img/presentation-page/header3.jpg")} top></CardImg>
                  <CardBody>
                    <CardText>
                      <Row>
                        <Col>Text here</Col>
                        <Col>Time here</Col>
                      </Row>
                    </CardText>
                  </CardBody>
              </Card>
              </Col>
              <Col md="3">
              <Card >
                  <CardImg alt="..." src={require("assets/img/presentation-page/header3.jpg")} top></CardImg>
                  <CardBody>
                    <CardText>
                      <Row>
                        <Col>Text here</Col>
                        <Col>Time here</Col>
                      </Row>
                    </CardText>
                  </CardBody>
              </Card>
              </Col>
              <Col md="3">
              <Card >
                  <CardImg alt="..." src={require("assets/img/presentation-page/header3.jpg")} top></CardImg>
                  <CardBody>
                    <CardText>
                      <Row>
                        <Col>Text here</Col>
                        <Col>Time here</Col>
                      </Row>
                    </CardText>
                  </CardBody>
              </Card>
              </Col>
            </Row>
            <Row>
              <Col md="3">
              <Card >
                  <CardImg alt="..." src={require("assets/img/presentation-page/header3.jpg")} top></CardImg>
                  <CardBody>
                    <CardText>
                      <Row>
                        <Col>Text here</Col>
                        <Col>Time here</Col>
                      </Row>
                    </CardText>
                  </CardBody>
              </Card>
              </Col>
              <Col md="3">
              <Card >
                  <CardImg alt="..." src={require("assets/img/presentation-page/header3.jpg")} top></CardImg>
                  <CardBody>
                    <CardText>
                      <Row>
                        <Col>Text here</Col>
                        <Col>Time here</Col>
                      </Row>
                    </CardText>
                  </CardBody>
              </Card>
              </Col>
              <Col md="3">
              <Card >
                  <CardImg alt="..." src={require("assets/img/presentation-page/header3.jpg")} top></CardImg>
                  <CardBody>
                    <CardText>
                      <Row>
                        <Col>Text here</Col>
                        <Col>Time here</Col>
                      </Row>
                    </CardText>
                  </CardBody>
              </Card>
              </Col>
              <Col md="3">
              <Card >
                  <CardImg alt="..." src={require("assets/img/presentation-page/header3.jpg")} top></CardImg>
                  <CardBody>
                    <CardText>
                      <Row>
                        <Col>Text here</Col>
                        <Col>Time here</Col>
                      </Row>
                    </CardText>
                  </CardBody>
              </Card>
              </Col>
            </Row>
            <Row>
              <Col md="3">
              <Card >
                  <CardImg alt="..." src={require("assets/img/presentation-page/header3.jpg")} top></CardImg>
                  <CardBody>
                    <CardText>
                      <Row>
                        <Col>Text here</Col>
                        <Col>Time here</Col>
                      </Row>
                    </CardText>
                  </CardBody>
              </Card>
              </Col>
              <Col md="3">
              <Card >
                  <CardImg alt="..." src={require("assets/img/presentation-page/header3.jpg")} top></CardImg>
                  <CardBody>
                    <CardText>
                      <Row>
                        <Col>Text here</Col>
                        <Col>Time here</Col>
                      </Row>
                    </CardText>
                  </CardBody>
              </Card>
              </Col>
              <Col md="3">
              <Card >
                  <CardImg alt="..." src={require("assets/img/presentation-page/header3.jpg")} top></CardImg>
                  <CardBody>
                    <CardText>
                      <Row>
                        <Col>Text here</Col>
                        <Col>Time here</Col>
                      </Row>
                    </CardText>
                  </CardBody>
              </Card>
              </Col>
              <Col md="3">
              <Card >
                  <CardImg alt="..." src={require("assets/img/presentation-page/header3.jpg")} top></CardImg>
                  <CardBody>
                    <CardText>
                      <Row>
                        <Col>Text here</Col>
                        <Col>Time here</Col>
                      </Row>
                    </CardText>
                  </CardBody>
              </Card>
              </Col>
            </Row>
            
          </div>
        </Container>
      </div>
    </>
  );
}

export default Sections;
