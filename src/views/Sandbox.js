import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getSession, setReadme } from '../redux/slices/sessionSlice'
import { getUser } from '../redux/slices/userSlice'
import Iframe from 'react-iframe'
import { TrashcanIcon } from '@primer/octicons-react'

// Import utils
import { s3Download } from '../utils/aws'
import { checkLabSessionStatus } from '../utils/lab'
import { initialAchievementValues } from '../utils/constants/initialAchievementValues'


// Import components
import FixedWhiteNavbar from "components/Navbars/FixedWhiteNavbar.js";
import AlertModal from '../components/AlertModal'
import BaseListObjects from '../components/BaseListObjects'
import LabsListObjects from '../components/LabsListObjects'
import BaseListIframes from '../components/BaseListIframes'
import LabsListIframes from '../components/LabsListIframes'
import Achievements from '../components/Achievements'
import DestroySessionModal from '../components/DestroySessionModal'
import Slides from "./Slides";

// Import reactstrap
import { Container, Tab, Card, Row, Nav, Col, Button } from 'react-bootstrap'

// Import CSS
import './Sandbox.css'

const Sandbox = () => {

  const sessionInfo = useSelector(getSession)

  const [initialAchievements] = useState(initialAchievementValues);
  const userInfo = useSelector(getUser)

  const history = useHistory()

  const dispatch = useDispatch()

  const [showError, setShowError] = useState(false)
  const [apiError, setApiError] = useState({})

  // DestroySessionModal states
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const onLoad = async () => {
      if (sessionInfo.isLoaded && sessionInfo.isLabActive) {
        if (!sessionInfo.isLabRunning && (sessionInfo.session.cDef.length > 0 || sessionInfo.session.shell || sessionInfo.session.ide)) {
          await checkLabSessionStatus(dispatch)
            .catch(error => {
              alertErrorFnc('Problem with Check Status', 'There is some problems with Check Status task, please refresh page or try it later.', error)
            })

        }

        if (sessionInfo.readme === '') {
          try {
            await s3Download(sessionInfo.session.labId)
              .then(data => data.Body.text()
                .then(text => dispatch(setReadme(text))))
          } catch (error) {
            dispatch(setReadme('Downloading of README.md went wrong!'))
            alertErrorFnc('Problem with Loading Readme', 'There is some problems with Loading Readme, please refresh page or try it later.', error)
          }
        }
      }
    }
    onLoad()
  }, [sessionInfo, history, dispatch, userInfo, initialAchievements]);

  const alertErrorFnc = (header, message, error) => {
    setApiError({ header: header, message: message, data: error })
    console.error(error)
    setShowError(true)
  }


  return (
    <div className="vh-100">
      <FixedWhiteNavbar />
      <Container style={{ height: "calc(100vh - 53px)" }} fluid>
        <Tab.Container defaultActiveKey="general">
          <Row className="h-100">
            <Col className="h-100 p-3 side-menu" sm={2}>
              <Button variant="danger" className="my-2" block onClick={handleShow} data-cy="sandbox-endlab-button">
                <TrashcanIcon /> End Lab</Button>
              <hr className="half-rule" />
              <Nav className="flex-column" defaultActiveKey="general">
                <Nav.Item>
                  <Nav.Link eventKey="general" data-cy="sandbox-general-link">General</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link disabled={!sessionInfo.session.achievements} eventKey="achievements" data-cy="sandbox-achievements-link">Achievements <i className="now-ui-icons sport_trophy"></i></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="slides" data-cy="sandbox-slides-link">Slides</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link disabled={!sessionInfo.session.shell} eventKey="terminal" data-cy="sandbox-terminal-link">Terminal</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link disabled={!sessionInfo.session.ide} eventKey="ide" data-cy="sandbox-ide-link">IDE</Nav.Link>
                </Nav.Item>
                {sessionInfo.session.achievementsDebug ?
                  <Nav.Item>
                    <Nav.Link eventKey="debug" data-cy="sandbox-debug-link"><i>* DEBUG *</i></Nav.Link>
                  </Nav.Item> : null
                }
                <hr className="half-rule" />
                {sessionInfo.session.integratedWebsite ?
                  <Nav.Item>
                    <Nav.Link eventKey="integratedWebsite" data-cy="sandbox-integratedwebsite-link">Website</Nav.Link>
                  </Nav.Item> : null
                }
                <Nav.Item>
                  <Nav.Link disabled data-cy="sandbox-services-link">Available Services</Nav.Link>
                </Nav.Item>
                {sessionInfo.isLabRunning ? <BaseListObjects /> : null}
                {sessionInfo.isLabRunning ? <LabsListObjects /> : null}
              </Nav>
            </Col>
            <Col className="p-0 h-100" sm={10}>
              <Tab.Content className="h-100">
                <Tab.Pane className="p-3" eventKey="general">
                  <Card>
                    <Card.Header>Name</Card.Header>
                    <Card.Body>
                      <Card.Text data-cy="sandbox-session-labname">{sessionInfo.session.labName}</Card.Text>
                    </Card.Body>
                  </Card>
                  <br />
                  <Card>
                    <Card.Header>Time reamining</Card.Header>
                    <Card.Body>
                      <Card.Text data-cy="sandbox-session-time">
                        {sessionInfo.remainingMins} min remaining
                    </Card.Text>
                    </Card.Body>
                  </Card>
                </Tab.Pane>


                <Tab.Pane className="p-3" eventKey="achievements">
                  <h1>Achievements</h1>
                  <div>(Page will automatically refresh every 30 seconds)</div>
                  <Achievements />
                </Tab.Pane>
                <Tab.Pane className="full-size-no-padding" eventKey="slides">
                  <Slides readme={sessionInfo.readme} />
                </Tab.Pane>
                <Tab.Pane className="full-size-no-padding" eventKey="terminal">
                  {sessionInfo.isLabRunning && sessionInfo.session.shell ? <Iframe id="wetty" className="full-size-no-padding" url={'https://' + (sessionInfo.session.uuid || sessionInfo.sessionId) + '-9999.sessions.' + process.env.REACT_APP_URL} /> : null}
                </Tab.Pane>
                <Tab.Pane className="full-size-no-padding" eventKey="ide">
                  {sessionInfo.isLabRunning && sessionInfo.session.ide ? <Iframe id="theia" className="full-size-no-padding" url={'https://' + (sessionInfo.session.uuid || sessionInfo.sessionId) + '-9998.sessions.' + process.env.REACT_APP_URL} /> : null}
                </Tab.Pane>
                <Tab.Pane className="full-size-no-padding" eventKey="debug">
                  {sessionInfo.isLabRunning && sessionInfo.session.achievementsDebug ? <Iframe id="achDebug" className="full-size-no-padding" url={'https://' + (sessionInfo.session.uuid || sessionInfo.sessionId) + '-9901.sessions.' + process.env.REACT_APP_URL} /> : null}
                </Tab.Pane>
                <Tab.Pane className="full-size-no-padding" eventKey="integratedWebsite">
                  {sessionInfo.isLabRunning && sessionInfo.session.integratedWebsite ? <Iframe id="integratedWebsiteURL" className="full-size-no-padding" url={sessionInfo.session.integratedWebsiteURL} /> : null}
                </Tab.Pane>
                {sessionInfo.isLabRunning ? <BaseListIframes /> : null}
                {sessionInfo.isLabRunning ? <LabsListIframes /> : null}
              </Tab.Content>
            </Col>
          </Row>
          <DestroySessionModal sessionInfo={sessionInfo} show={show} handleClose={handleClose} history={history} history_path="/labs" />
        </Tab.Container>
        {apiError !== {} ? <AlertModal err={apiError} show={showError} onHide={() => { setShowError(false); setApiError({}) }} /> : null}
      </Container>
    </div>
  )
}

export default Sandbox
