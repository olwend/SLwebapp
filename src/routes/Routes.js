import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from '../views/Home'
import Labs from '../views/Labs'
import Registration from '../views/Register'
import Login from '../views/Login'
import Activate from '../views/Activate'
import Sandbox from '../views/Sandbox'
import Editor from '../views/Editor'
import Admin from '../views/Admin'
import GroupsManagement from '../views/GroupsManagement'
import UserPreferences from '../views/UserPreferences'
import AppliedRoute from './AppliedRoute'
import {AuthenticatedRoute, AdminRoute, ActiveLabRoute} from './AuthenticatedRoute'
import UnauthenticatedRoute from './UnauthenticatedRoute'
import ForgotPassword from '../views/ForgotPassword'
import ForgotPasswordSubmit from '../views/ForgotPasswordSubmit'


const Routes = props =>
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={props} />
      <UnauthenticatedRoute path="/register" exact component={Registration} appProps={props}/>
      <UnauthenticatedRoute path="/activate" exact component={Activate} appProps={props}/>
      <UnauthenticatedRoute path="/login" exact component={Login} appProps={props}/>
      <UnauthenticatedRoute path="/forgotpassword" exact component={ForgotPassword} appProps={props}/>
      <UnauthenticatedRoute path="/forgotpasswordsubmit" exact component={ForgotPasswordSubmit} appProps={props}/>
      <AuthenticatedRoute path="/labs" exact component={Labs} appProps={props} />
      <ActiveLabRoute path="/sandbox" exact component={Sandbox} appProps={props} />
      <AuthenticatedRoute path="/userdetails" exact component={UserPreferences} />
      <AuthenticatedRoute path="/edititem/:id" exact component={Editor} appProps={props} />
      <AuthenticatedRoute path="/additem" exact component={Editor} appProps={props} />
      <AdminRoute path="/usersmgmt" exact component={Admin} appProps={props} />
      <AdminRoute path="/groupsmgmt" exact component={GroupsManagement} appProps={props} />
      <Route component={Home} />
    </Switch>

export default Routes
