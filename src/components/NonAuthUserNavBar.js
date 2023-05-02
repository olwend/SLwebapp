import React from "react";

import { Link } from "react-router-dom";

import {
  Nav,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";

import { PersonIcon } from "@primer/octicons-react";

const NonAuthUserNavBar = () => (
  <Nav navbar>
    <UncontrolledDropdown nav inNavbar>
      <DropdownToggle nav caret data-cy="dropdown-login-menu">
        <PersonIcon />
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem tag={Link} to="/login" data-cy="dropdown-login-button">
          Login
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  </Nav>
);

export default NonAuthUserNavBar;
