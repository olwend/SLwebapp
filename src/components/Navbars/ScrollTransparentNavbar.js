import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'
import { getUser } from 'redux/slices/userSlice'
import AuthUserNavBar from 'components/AuthUserNavBar'
import NonAuthUserNavBar from 'components/NonAuthUserNavBar'
import {
  Collapse,
  NavbarBrand,
  Navbar,
  Container,
} from "reactstrap";

function ScrollTransparentNavbar() {
  const userInfo = useSelector(getUser)

  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const [navbarColor, setNavbarColor] = React.useState(
    (document.documentElement.scrollTop > 499 || document.body.scrollTop) > 499
      ? ""
      : " navbar-transparent"
  );

  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 499 ||
        document.body.scrollTop > 499
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 500 ||
        document.body.scrollTop < 500
      ) {
        setNavbarColor(" navbar-transparent");
      }
    };
    window.addEventListener("scroll", updateNavbarColor);
    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
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
      
      <Navbar className={"fixed-top " + navbarColor} color="white" expand="lg">
        <Container>
          
          <div className="navbar-translate">
            <NavbarBrand
              tag={ Link } 
              to="/"
              id="navbar-brand"
            >
              SkillsLounge
            </NavbarBrand>
          
          <button
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setCollapseOpen(!collapseOpen);
              }}
              aria-expanded={collapseOpen}
              className="navbar-toggler"
            >
              <span className="navbar-toggler-bar top-bar"></span>
              <span className="navbar-toggler-bar middle-bar"></span>
              <span className="navbar-toggler-bar bottom-bar"></span>
            </button>
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

export default ScrollTransparentNavbar;
