import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getSession } from '../redux/slices/sessionSlice'
import { initialAchievementValues } from '../utils/constants/initialAchievementValues'
import NoDataIndication from './NoDataIndication'
import { getAchievementsId } from '../utils/aws'
import './Achievements.css'

import { Progress } from 'reactstrap'

// Import CSS
import '../views/Sandbox.css'

import { LockIcon } from '@primer/octicons-react'

import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardFooter,
    CardTitle
  } from "reactstrap";

const Achievements = () => {

    const sessionInfo = useSelector(getSession)

    const [setShowError] = useState(false)
    const [setApiError] = useState({})

    const [initialAchievements, setInitialAchievements] = useState(initialAchievementValues);

    const alertErrorFnc = (header, message, error) => {
        setApiError({ header: header, message: message, data: error })
        console.error(error)
        setShowError(true)
      }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
      
      
    

    useEffect(() => {
        
            // Load Achievements
            if ( (sessionInfo.session.achievements === true) ) {
                try {
                  getAchievementsId(sessionInfo.session.achievementsId).then((item) => {
                    if (typeof item === 'undefined' || item !== null) {
                        // Get Achievements every 30 seconds
                        sleep(30000).then(() => { setInitialAchievements(item); });
                    }
                  });
                } catch (error) {
                  alertErrorFnc(
                    "Getting Lab Achievements Failed",
                    "Getting Lab Achievements Failed, please refresh page or try again later.",
                    error
                  );
                  console.error(error);
                }
              }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialAchievements])

    if (typeof initialAchievements.achievements === 'undefined' || initialAchievements.achievements.length === 0) {  
                return(
                    <>
                        <div className={'no-data-indication'}><NoDataIndication /></div>
                    </>
                )
    } else {

                return(
                    <>
                    <div className="progress-container progress-info">
                    <h4 className="info-title">Score</h4>
                        <Progress max={initialAchievements.maxpoints} value={initialAchievements.actualpoints}>
                            <span className="progress-value" style={{fontSize: "20px"}}>{initialAchievements.actualpoints} / {initialAchievements.maxpoints}</span>
                        </Progress>
                        <br></br><br></br>
                    </div>
                    <h4 className="info-title">Details</h4>
                    <Container className="achievement-container">
                    {

                    JSON.parse(initialAchievements.achievements) && JSON.parse(initialAchievements.achievements
                            ).sort((a, b) => a.number - b.number).map((d)=>{
                                return(
                
                                        <Row key={d.number}>
                                        <Col>
                                            <Card>
                                                <CardBody>
                                                <h6 className="category text-danger" style={d.acquired ? { fontStyle: 'strong'} : { fontStyle: 'italic'}}>
                                                    
                                                    {d.acquired ? <i className="now-ui-icons sport_trophy"></i> : <LockIcon/> }
                                                    
                                                    &nbsp;&nbsp;Achievement {d.number} {d.acquired ? "" : " - LOCKED"}
                                                </h6>
                                                <CardTitle style={d.acquired ? { fontStyle: 'strong'} : { fontStyle: 'italic'}}>
                                                    {d.title}
                                                </CardTitle>
                                                <p className="card-description" style={d.acquired ? { fontStyle: 'strong'} : { fontStyle: 'italic'}}>
                                                {d.description}
                                                </p>
                                                <CardFooter>
                                                <div className="stats stats-left">
                                                <i className={d.acquired ?  "now-ui-icons ui-1_check" : "now-ui-icons ui-1_simple-remove"} 
                                                        style={d.acquired ? { color: "green" } : { color: "red" }}></i>
                                                </div>
                                                    <div className="stats stats-right" style={d.acquired ? { fontStyle: 'strong'} : { fontStyle: 'italic'}}>
                                                    <i className="now-ui-icons ui-1_calendar-60"></i>
                                                    {d.date}<br></br>
                                                    <i className="now-ui-icons location_bookmark"></i>
                                                    {d.points} / {d.maxpoints}
                                                    </div>
                                                </CardFooter>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        </Row>
                                )
                        })
                    }
                    </Container>
                    </>
                )
    }
}

export default Achievements
