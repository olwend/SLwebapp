import React from 'react'

import { Link } from 'react-router-dom'

import { Navbar } from 'react-bootstrap'

import { useSelector } from 'react-redux'
import { getUser } from '../redux/slices/userSlice'

import iconImg from '../img/icon.png'

import AuthUserNavBar from '../components/AuthUserNavBar'
import UnauthUserNavBar from '../components/UnauthUserNavBar'

import './Navigation.css'

const Navigation = () => {

    const userInfo = useSelector(getUser)

    return (
      <Navbar className="sticky-nav-top" fixed="top" expand="lg">
      <Navbar.Brand as={ Link } to="/" data-cy="homepage-logo-button">
        <img src={ iconImg } width="30" height="30" className="d-inline-block align-top" alt="React Bootstrap logo" />
        SkillsLounge
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            { userInfo.isAuthenticated ? <AuthUserNavBar /> : <UnauthUserNavBar /> }
          </Navbar.Collapse>
      </Navbar>
    )
}

export default Navigation
