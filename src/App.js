import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Container } from "reactstrap";
import Routes from "./routes/Routes";
import "./App.css";
import { Auth } from "aws-amplify";
import { useDispatch, useSelector } from "react-redux";
import { setIsLabRunning, getSession, setRemainingMins } from './redux/slices/sessionSlice';
import { setIsLoaded } from './redux/slices/userSlice';
import { setUserData } from "./utils/authentication";
import { loadSession } from "./utils/session";

function App() {

  // Set initial states
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const dispatch = useDispatch();
  const sessionInfo = useSelector(getSession);
  const minInMs = 60000;
  const [ wasCalled, setWasCalled ] = useState(false);
  const [ firstCall, setFirstCall ] = useState(true);

  useEffect(() => {
    onLoad();
  // eslint-disable-next-line
  },[]);

  // This is the code that gets the timer
  // eslint-disable-next-line
  useEffect(() => {
    if(sessionInfo.isLabActive && !wasCalled){
      let timerVal = sessionInfo.session.timer.value * 60 * 1000;
      if(firstCall){
        setFirstCall(false);
        remainingTime(timerVal);
      }
      setWasCalled(true);
      let timerSec = sessionInfo.remainingMins === 0 ? 1000 : minInMs;
      
      setTimeout(() => {
        remainingTime(timerVal);
      }, timerSec);
    }
  });

  async function onLoad() {

  // Check if the user is authenticated
    try {
      await Auth.currentAuthenticatedUser({ bypassCache: false })
        .then((user) => { 
          setUserData(dispatch, user);
          loadSession(dispatch, user.username);
          dispatch(setIsLabRunning(false));
        })
        .then(setIsAuthenticating(false))
        .catch((err) => {
          console.log(err)
          dispatch(setIsLoaded(true))
        });      
    } catch (e) {
      if (e !== "No current user") {
        alert(e);
      }
    }
  }

  function remainingTime(timer) {
      const endTime = sessionInfo.session.startDateTime + timer;
      const timeNow = Date.now();
      let mins = 0;
      
      if(endTime > timeNow){
        mins = ((endTime-timeNow) / minInMs).toFixed(0);
        dispatch(setIsLabRunning(true));
      }

      dispatch(setRemainingMins(mins));
      setWasCalled(false);
    // }
    }
    
  return (
    !isAuthenticating && (
      <Container fluid className="px-0 vh-100">
        <Routes />
      </Container>
    )
  );
}

export default withRouter(App);
