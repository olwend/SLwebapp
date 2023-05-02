import React from 'react'

import { Link } from 'react-router-dom'

import { Nav, NavDropdown } from 'react-bootstrap'

import { PersonIcon } from '@primer/octicons-react'

const UnauthUserNavBar = () =>
    <Nav>
        <NavDropdown title={ <PersonIcon/> } id="basic-nav-dropdown">
            <NavDropdown.Item as={ Link } to="/login">Login</NavDropdown.Item>
        </NavDropdown>
    </Nav>

export default UnauthUserNavBar
