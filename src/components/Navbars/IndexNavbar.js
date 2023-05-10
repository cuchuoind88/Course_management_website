import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
import "./IndexNavbar.scss";
export default function IndexNavbar({ formModal, setFormModal }) {
  console.log(formModal);
  const LXCstate = useSelector((state) => state);
  console.log(LXCstate);
  const dispatch = useDispatch();
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const [collapseOut, setCollapseOut] = React.useState("");
  const [isCoursePage, setIsCoursePage] = useState(() => {
    if (window.location.pathname === "/courses") {
      return true;
    } else {
      return false;
    }
  });
  console.log(isCoursePage);
  const x = isCoursePage ? "bg-info" : "navbar-transparent";
  const [color, setColor] = React.useState(`${x}`);
  const changeColor = () => {
    if (
      document.documentElement.scrollTop > 49 ||
      document.body.scrollTop > 49
    ) {
      setColor("bg-info");
    } else if (
      (document.documentElement.scrollTop < 50 ||
        document.body.scrollTop < 50) &&
      !isCoursePage
    ) {
      setColor("navbar-transparent");
    }
  };
  React.useEffect(() => {
    window.addEventListener("scroll", changeColor);
    return function cleanup() {
      window.removeEventListener("scroll", changeColor);
    };
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("You are logged out");
    dispatch({
      type: "LOG_OUT",
    });
  };
  const toggleCollapse = () => {
    document.documentElement.classList.toggle("nav-open");
    setCollapseOpen(!collapseOpen);
  };
  const onCollapseExiting = () => {
    setCollapseOut("collapsing-out");
  };
  const onCollapseExited = () => {
    setCollapseOut("");
  };
  const scrollToDownload = () => {
    document
      .getElementById("download-section")
      .scrollIntoView({ behavior: "smooth" });
  };
  return (
    <Navbar className={"fixed-top " + color} color-on-scroll="100" expand="lg">
      <Container>
        <div className="navbar-translate">
          <NavbarBrand to="/" tag={Link} id="navbar-brand">
            <span>LXC• </span>
            Learn everything
          </NavbarBrand>
          <UncontrolledTooltip placement="bottom" target="navbar-brand">
            from UIT with Love
          </UncontrolledTooltip>
          <button
            aria-expanded={collapseOpen}
            className="navbar-toggler navbar-toggler"
            onClick={toggleCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className={"justify-content-end " + collapseOut}
          navbar
          isOpen={collapseOpen}
          onExiting={onCollapseExiting}
          onExited={onCollapseExited}
        >
          <div className="navbar-collapse-header">
            <Row>
              <Col className="collapse-brand" xs="6">
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  LXC•
                </a>
              </Col>
              <Col className="collapse-close text-right" xs="6">
                <button
                  aria-expanded={collapseOpen}
                  className="navbar-toggler"
                  onClick={toggleCollapse}
                >
                  <i className="tim-icons icon-simple-remove" />
                </button>
              </Col>
            </Row>
          </div>
          <Nav navbar>
            <NavItem className="p-0">
              <NavLink
                data-placement="bottom"
                href="https://twitter.com/CreativeTim"
                rel="noopener noreferrer"
                target="_blank"
                title="Follow us on Twitter"
              >
                <i className="fab fa-twitter" />
                <p className="d-lg-none d-xl-none">Twitter</p>
              </NavLink>
            </NavItem>
            <NavItem className="p-0">
              <NavLink
                data-placement="bottom"
                href="https://www.facebook.com/CreativeTim"
                rel="noopener noreferrer"
                target="_blank"
                title="Like us on Facebook"
              >
                <i className="fab fa-facebook-square" />
                <p className="d-lg-none d-xl-none">Facebook</p>
              </NavLink>
            </NavItem>
            <NavItem className="p-0">
              <NavLink
                data-placement="bottom"
                href="https://www.instagram.com/CreativeTimOfficial"
                rel="noopener noreferrer"
                target="_blank"
                title="Follow us on Instagram"
              >
                <i className="fab fa-instagram" />
                <p className="d-lg-none d-xl-none">Instagram</p>
              </NavLink>
            </NavItem>
            {LXCstate.auth.username && (
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  data-toggle="dropdown"
                  href="#pablo"
                  nav
                  onClick={(e) => e.preventDefault()}
                >
                  <i className="fa fa-cogs d-lg-none d-xl-none" />
                  Account
                </DropdownToggle>
                <DropdownMenu className="dropdown-with-icons">
                  <DropdownItem onClick={handleLogout}>
                    <i className="tim-icons icon-user-run" s />
                    Log out
                  </DropdownItem>
                  <DropdownItem tag={Link} to="/profile-page">
                    <i className="tim-icons icon-single-02" />
                    Profile Page
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            )}
            {!LXCstate.auth.username && (
              <>
                <NavItem>
                  <Button
                    className="nav-link d-none d-lg-block sign-in"
                    color="primary"
                    target="_blank"
                    href=""
                    onClick={() => setFormModal(true)}
                  >
                    <i className="tim-icons icon-spaceship" /> Sign In
                  </Button>
                </NavItem>
                <NavItem>
                  <Button
                    className="nav-link d-none d-lg-block sign-up"
                    color="default"
                    onClick={scrollToDownload}
                  >
                    <Link to="/register-page">Sign up</Link>
                  </Button>
                </NavItem>
              </>
            )}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}
