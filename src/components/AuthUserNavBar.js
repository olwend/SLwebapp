import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getSession } from '../redux/slices/sessionSlice'
import { getUser } from '../redux/slices/userSlice'
import { BeakerIcon, PersonIcon, TerminalIcon } from '@primer/octicons-react'


// Import utils
import { logout } from '../utils/authentication'

// Import reactstrap components
import {
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    NavItem,
    NavLink,
    Nav,
  } from "reactstrap";

const AuthUserNavBar = () => {

    const sessionInfo = useSelector(getSession)
    const userInfo = useSelector(getUser)
    const dispatch = useDispatch()

    return(
        <Nav navbar>
            <NavItem>
                <NavLink tag={ Link } to="/labs" data-cy="navbar-labs-button">{ <BeakerIcon/> } Labs</NavLink>
            </NavItem>
            { sessionInfo.isLabActive && <NavItem><NavLink tag={ Link } to="/sandbox" data-cy="navbar-sandbox-button">{ <TerminalIcon/> } Sandbox</NavLink></NavItem>}
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret data-cy="dropdown-login-menu">
                    <PersonIcon/>
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem tag={ Link } to="/userdetails" data-cy="dropdown-userdetails-button">
                        User preferences
                    </DropdownItem>
                    {userInfo.userAdmin ? (<>
                    <DropdownItem divider />
                    <DropdownItem tag={ Link } disabled to="/" >Admin Panel</DropdownItem> 
                    <DropdownItem tag={ Link } to="/usersmgmt" data-cy="dropdown-usermanagement-button">User Management</DropdownItem> 
                    <DropdownItem tag={ Link } to="/groupsmgmt" data-cy="dropdown-groupmanaement-button">Groups Management</DropdownItem> 
                    </>)
                    : null
                }
                 <DropdownItem divider />
                    <DropdownItem onClick={ logout(dispatch) } data-cy="dropdown-logout-button">
                        Logout
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        </Nav>
    )
}

export default AuthUserNavBar
