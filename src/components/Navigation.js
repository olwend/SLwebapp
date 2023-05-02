import React from 'react'

import { Link } from 'react-router-dom'

import { Navbar } from 'react-bootstrap'

import { useSelector } from 'react-redux'
import { getUser } from '../redux/slices/userSlice'

import iconImg from '../img/icon.png'

import AuthUserNavBar from './AuthUserNavBar'
import NonAuthUserNavBar from './NonAuthUserNavBar'

import './Navigation.css'

const Navigation = () => {

    const userInfo = useSelector(getUser)

    return (
      <Navbar className="sticky-nav-top" fixed="top" expand="lg">
      <Navbar.Brand as={ Link } to="/">
        <img src={ iconImg } width="30" height="30" className="d-inline-block align-top" alt="React Bootstrap logo" />
        SkillsLounge
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            { userInfo.isAuthenticated ? <AuthUserNavBar /> : <NonAuthUserNavBar /> }
          </Navbar.Collapse>
      </Navbar>
    )
}

export default Navigation
