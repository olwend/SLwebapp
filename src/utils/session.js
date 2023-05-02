import { getUserSession } from './aws'
import { setReduxSession, setIsLoaded } from '../redux/slices/sessionSlice'
import sessionDataObject from './data/session'

export const setSessionData = (dispatch, session) => dispatch(setReduxSession(sessionDataObject(session)))

export const loadSession = async (dispatch, userUuid) => {
    const session = await getUserSession(userUuid)
    if (session !== undefined) {
        setSessionData(dispatch, session)
    } else {
        dispatch(setIsLoaded(true));
    }
    
}
