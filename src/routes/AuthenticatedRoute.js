import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getUser } from '../redux/slices/userSlice'
import { getSession } from '../redux/slices/sessionSlice'


export const AuthenticatedRoute = ({ component: C, appProps, ...rest }) => {
    const isAuthenticated = useSelector(getUser).isAuthenticated
    return <Route {...rest} render={props => isAuthenticated ?
        <C {...props} {...appProps} /> :
        <Redirect to={`/login?redirect=${props.location.pathname}${props.location.search}`}/>}
    />
}

export const AdminRoute = ({ component: C, appProps, ...rest }) => {
    const user = useSelector(getUser)
    
    return <Route {...rest} render={props => !user.isLoaded
        ? <></>
        : !user.isAuthenticated 
            ? <Redirect to={`/login?redirect=${props.location.pathname}${props.location.search}`}/>
            : user.userAdmin 
                ? <C {...props} {...appProps} /> 
                : <Redirect to={`/`}/>}
    />
}

export const ActiveLabRoute = ({ component: C, appProps, ...rest }) => {

    const user = useSelector(getUser)
    const session = useSelector(getSession)

    return <Route {...rest} render={props => !user.isLoaded
        ? <></> 
        : user.isAuthenticated
            ? !session.isLoaded 
                ? <></>
                : session.isLabActive 
                    ? <C {...props} {...appProps} /> 
                    : <Redirect to={`/`}/>
            : <Redirect to={`/login?redirect=${props.location.pathname}${props.location.search}`}/>}
    />
}

export default AuthenticatedRoute
