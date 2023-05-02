import { createSession, getUserSession } from '../utils/aws'
import { checkLabSessionStatus } from '../utils/lab'
import { setSessionData } from '../utils/session'
import { surroundWithProgressTrackingPromise } from '../utils'
import { checkUntilUrlIsAvailable } from '../utils/http'

const run = async (item, userUuid, setPbValue, dispatch, setDpgLoading, setApiError, setShowError, history) => {
    
    let sessionData = {
        labId: item.uuid,
        labName: item.labName,
        containerDefinition: item.containerDefinition,
        timer: item.timer,
        startDateTime: Date.now(),
        userUuid: userUuid,
        ide: item.ide,
        shell: item.shell,
        basePorts: item.basePorts
    }

    const wettyAndTheiaCheckPromise = async (sessionData) => {
        let wettyURL = `https://${sessionData.uuid}-9998.sessions.${process.env.REACT_APP_URL}/`
        let theiaURL = `https://${sessionData.uuid}-9999.sessions.${process.env.REACT_APP_URL}/`

        const promises = []
        if (sessionData.ide) promises.push(checkUntilUrlIsAvailable(wettyURL))
        if (sessionData.shell) promises.push(checkUntilUrlIsAvailable(theiaURL))
        return surroundWithProgressTrackingPromise(80, 100, 20000, 1, setPbValue, Promise.all(promises), true)
    }

    const statusCheckPromise = sessionUuid =>
        // surroundWithProgressTrackingPromise(0, 80, 1800, 1, setPbValue, checkSfnStatus(sessionUuid, dispatch))
        surroundWithProgressTrackingPromise(0, 80, 4000, 1, setPbValue, checkLabSessionStatus(dispatch)
        )

    const onError = error => {
        setDpgLoading(false)
        setPbValue(0)
        setApiError({
            header: 'Problem with Start Labs',
            message: 'There is some problems with starting Lab, please refresh page or try it later.',
            data: error
        })
        console.error(error)
        setShowError(true)
    }

    const setProgressValueWithPause = (value, pauseInSeconds) => {
        setPbValue(value)
        return new Promise(resolve => setTimeout(resolve, pauseInSeconds * 1000))
    }

    try {
        setPbValue(0)

        await createSession(sessionData)

        try {
            // Check for the task to finish provisioning
            await statusCheckPromise() 
            
            // refresh sessionData with new created lab data
            sessionData = await getUserSession(userUuid);

            setSessionData(dispatch, sessionData)
            await setProgressValueWithPause(80, 1.5)          

            // Wait for IDE and terminal to come up
            await wettyAndTheiaCheckPromise(sessionData)
            history.push("/sandbox")
            setDpgLoading(false)
            setPbValue(0)
        } catch (e) {
            onError(e)
        }
    } catch (e) {
        onError(e)
    }
}

export const task = { run }