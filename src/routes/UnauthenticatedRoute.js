import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getUser } from '../redux/slices/userSlice'
import { querystring } from '../utils'

const UnauthenticatedRoute = ({ component: C, appProps, ...rest }) => {
  const userInfo = useSelector(getUser)
  const redirect = querystring('redirect', window.location.href)
  return <Route {...rest} render={props => !userInfo.isAuthenticated ?
      <C {...props} {...appProps} /> :
      <Redirect to={redirect === "" || redirect === null ? "/" : redirect}/>}
  />
}

export default UnauthenticatedRoute
