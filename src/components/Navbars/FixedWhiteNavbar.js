import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'
import { getUser } from 'redux/slices/userSlice'

import AuthUserNavBar from 'components/AuthUserNavBar'
import NonAuthUserNavBar from 'components/NonAuthUserNavBar'

// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  Container,
} from "reactstrap";

function FixedWhiteNavbar() {
  const [collapseOpen, setCollapseOpen] = React.useState(false);

  const userInfo = useSelector(getUser)

  return (
    <>
      {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar className="bg-white  mb-0" expand="lg">
        <Container>
          
          <div className="navbar-translate">
            <NavbarBrand
              tag={ Link } 
              to="/"
              id="navbar-brand"
            >
              SkillsLounge
            </NavbarBrand>
          </div>
          <Collapse
            className="justify-content-end"
            isOpen={collapseOpen}
            navbar
          >
              { userInfo.isAuthenticated ? <AuthUserNavBar /> : <NonAuthUserNavBar /> }
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default FixedWhiteNavbar;
