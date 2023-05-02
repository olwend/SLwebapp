import React from "react";

// Import components
import AboutUsHeader from "components/Headers/AboutUsHeader.js";
import ScrollTransparentNavbar from "components/Navbars/ScrollTransparentNavbar.js";
import Footer from "components/Footers/Footer.js";

// Import reactstrap components
import {
  Container,
  Row,
  Col,
  Card,
} from "reactstrap";

function Home() {
  return (
    <div className="landing-page" data-cy="skillslounge-landin-page">
      <ScrollTransparentNavbar />
      <div className="wrapper">
        <AboutUsHeader />
        <div className="features-8 section-image">
          <Col className="ml-auto mr-auto text-center" md="8">
            <h2 className="title">Feature rich training environments</h2>
            <h4 className="description">
              <p>Whether you are trying to improve your skills in a particular programming language, or trying to master the latest products on the market, SkillsLounge gives you a training environment with all the learning materials and tools you need to make learning a breeze.
              When you're done, SkillsLounge cleans it all up for you. No fuss, no muss.
              </p>
              <p>SkillsLounge makes learning fun and easy.</p>
            </h4>
          </Col>
          <Container>
            <Row>
              <Col md="3" className="d-flex align-items-stretch">
                <Card>
                  <div className="card-image">
                    <img
                      alt="..."
                      className="rounded"
                      style={{objectFit: "cover", height: "20vh", width: "100%"}}
                      src={require("assets/img/hassle-free.jpg")}
                    ></img>
                  </div>
                  <div className="info text-center">
                    <div className="icon">
                      <i className="now-ui-icons objects_spaceship"></i>
                    </div>
                    <h4 className="info-title">Hassle Free</h4>
                    <p className="description">
                    No installation steps neccessary.
All tools and dependencies are automatically provisioned.<br></br><br></br><br></br><br></br>
                    </p>
                  </div>
                </Card>
              </Col>
              <Col md="3" className="d-flex align-items-stretch">
                <Card>
                  <div className="card-image">
                    <img
                      alt="..."
                      className="rounded"
                      style={{objectFit: "cover", height: "20vh", width: "100%"}}
                      src={require("assets/img/relevant_training.jpg")}
                    ></img>
                  </div>
                  <div className="info text-center">
                    <div className="icon">
                      <i className="now-ui-icons education_glasses"></i>
                    </div>
                    <h4 className="info-title">Relevant Training</h4>
                    <p className="description">
                    Choose from a vast library of labs that have been specifically designed to guide you through scenarios that resemble real world challenges.
                    </p><br></br>
                  </div>
                </Card>
              </Col>
              <Col md="3" className="d-flex align-items-stretch">
                <Card>
                  <div className="card-image">
                    <img
                      alt="..."
                      className="rounded"
                      style={{objectFit: "cover", height: "20vh", width: "100%"}}
                      src={require("assets/img/theia-screenshot.png")}
                    ></img>
                  </div>
                  <div className="info text-center">
                    <div className="icon">
                      <i className="now-ui-icons tech_tv"></i>
                    </div>
                    <h4 className="info-title">Enriched Workspace</h4>
                    <p className="description">
                      SkillsLounge labs are provisioned with Eclipse Theia that supports a varity of plugins and programming languages that offers a more realstic, enriched, working environment.
                    </p>
                  </div>
                </Card>
              </Col>
              <Col md="3" className="d-flex align-items-stretch">
                <Card>
                  <div className="card-image">
                    <img
                      alt="..."
                      className="rounded"
                      style={{objectFit: "cover", height: "20vh", width: "100%"}}
                      src={require("assets/img/self-paced.png")}
                    ></img>
                  </div>
                  <div className="info text-center">
                    <div className="icon">
                      <i className="now-ui-icons tech_watch-time"></i>
                    </div>
                    <h4 className="info-title">Self Paced Learning</h4>
                    <p className="description">
                     Learn at a pace that is managable and convient for you.
                    </p>
                  </div>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="about-description text-center pb-0">
          <div className="features-3 pt-0">
            <Container>
              <Row>
                <Col className="mr-auto ml-auto" md="8">
                  <h2 className="title">Technologies</h2>
                </Col>
              </Row>
              <Row>
                <Col md="2">
                  <div className="info info-hover">
                    <div className="icon icon-circle">
                    <i ><img alt="jenkins logo" src={require("assets/img/logos/jenkins_logo.png")} className="p-4"></img></i>
                    </div>
                    <h4 className="info-title">Jenkins</h4>
                  </div>
                </Col>
                <Col md="2">
                  <div className="info info-hover">
                    <div className="icon  icon-circle">
                    <i ><img alt="prometheus logo" src={require("assets/img/logos/prometheus_logo.png")} className="p-4"></img></i>
                    </div>
                    <h4 className="info-title">Prometheus</h4>
                  </div>
                </Col>
                <Col md="2">
                  <div className="info info-hover">
                    <div className="icon  icon-circle">
                      <i ><img alt="docker logo" src={require("assets/img/logos/docker.png")} className="p-4"></img></i>
                    </div>
                    <h4 className="info-title">Docker</h4>
                  </div>
                </Col>
                <Col md="2">
                  <div className="info info-hover">
                    <div className="icon  icon-circle">
                    <i ><img alt="ansible logo" src={require("assets/img/logos/ansible_logo.png")} className="p-4"></img></i>
                    </div>
                    <h4 className="info-title">Ansible</h4>
                  </div>
                </Col>
                <Col md="2">
                  <div className="info info-hover">
                    <div className="icon  icon-circle">
                    <i ><img alt="vault logo" src={require("assets/img/logos/vault_logo.png")} className="p-4"></img></i>
                    </div>
                    <h4 className="info-title">Vault</h4>
                  </div>
                </Col>
                <Col md="2">
                  <div className="info info-hover">
                    <div className="icon  icon-circle">
                    <i ><img alt="git logo" src={require("assets/img/logos/git_logo.png")} className="p-4"></img></i>
                    </div>
                    <h4 className="info-title">Git</h4>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md="2">
                  <div className="info info-hover">
                    <div className="icon  icon-circle">
                    <i ><img alt="grafana logo" src={require("assets/img/logos/grafana_logo.png")} className="p-4"></img></i>
                    </div>
                    <h4 className="info-title">Grafana</h4>
                  </div>
                </Col>
                <Col md="2">
                  <div className="info info-hover">
                    <div className="icon  icon-circle">
                    <i ><img alt="harbor logo" src={require("assets/img/logos/harbor_logo.png")} className="p-4"></img></i>
                    </div>
                    <h4 className="info-title">Harbor</h4>
                  </div>
                </Col>
                <Col md="2">
                  <div className="info info-hover">
                    <div className="icon  icon-circle">
                    <i ><img alt="snyk logo" src={require("assets/img/logos/synk_logo.png")} className="p-4"></img></i>
                    </div>
                    <h4 className="info-title">Snyk</h4>
                  </div>
                </Col>
                <Col md="2">
                  <div className="info info-hover">
                    <div className="icon  icon-circle">
                    <i ><img alt="sonaqube logo" src={require("assets/img/logos/sonarqube_logo.png")} className="p-4"></img></i>
                    </div>
                    <h4 className="info-title">SonarQube</h4>
                  </div>
                </Col>
                <Col md="2">
                  <div className="info info-hover">
                    <div className="icon  icon-circle">
                    <i ><img alt="trivy logo" src={require("assets/img/logos/trivy_logo.png")} className="p-4"></img></i>
                    </div>
                    <h4 className="info-title">Trivy</h4>
                  </div>
                </Col>
                <Col md="2">
                  <div className="info info-hover">
                    <div className="icon icon-circle">
                      <i className="now-ui-icons design_bullet-list-67"></i>
                    </div>
                    <h4 className="info-title">... and more</h4>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
