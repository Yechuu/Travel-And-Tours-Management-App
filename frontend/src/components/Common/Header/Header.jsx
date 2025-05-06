import React, { useEffect, useState, useContext} from "react";
import {
  Container,
  Row,
  Navbar,
  Offcanvas,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../Header/header.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../auth/AuthContext";
const Header = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  useEffect(()=>{
    window.addEventListener("scroll", isSticky);
    return ()=>{
      window.removeEventListener("scroll", isSticky)
    }
  })

  // sticky Header 
  const isSticky=(e)=>{
    const header = document.querySelector('.header-section');
    const scrollTop = window.scrollY;
    // scrollTop >= 120 ? header.classList.add('is-sticky') :
    // header.classList.remove('is-sticky')
  }

  const closeMenu =()=>{
    if(window.innerWidth <= 991){
      setOpen(false)
    }
  }
  const { isAuthenticated, accessToken, logout, userRole, refreshAuthToken } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    
    <header className="header-section is-sticky">
      <Container>
       
          <Navbar expand="lg" className="p-0">
            {/* Logo Section  */}
            <Navbar.Brand>
              <NavLink to="/"> TravelAndTours</NavLink>
            </Navbar.Brand>
            {/* End Logo Section  */}

            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-lg`}
              aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
              placement="start"
              show={open}
            >
              {/*mobile Logo Section  */}
              <Offcanvas.Header>
                <h1 className="logo">TravelAndTours</h1>
                <span className="navbar-toggler ms-auto"  onClick={toggleMenu}>
                  <i className="bi bi-x-lg"></i>
                </span>
              </Offcanvas.Header>
              {/*end mobile Logo Section  */}

              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <NavLink className="nav-link" to="/" onClick={closeMenu}>
                    Home
                  </NavLink>
                  {userRole == 'agent'  ? <> </>: <><NavLink className="nav-link" to="/about-us" onClick={closeMenu}>
                    ABOUT US
                  </NavLink>
                  </>}

                  {/* <NavDropdown
                    title="DESTINATION"
                    id={`offcanvasNavbarDropdown-expand-lg`} to='/destinations'
                  > 
                   
                      
                    <NavLink className="nav-link text-dark" to="/destinations" onClick={closeMenu}>
                    SPAIN TOURS
                  </NavLink> 
                   */}
                   
                  {/* </NavDropdown> */}
                  <NavLink className="nav-link" to="/gallery" onClick={closeMenu}>
                    GALLERY
                  </NavLink>
                  <NavLink className="nav-link" to="/contact-us" onClick={closeMenu}>
                    CONTACT
                  </NavLink>
               
                  {userRole == "agent" ? <>
                  <NavLink className="nav-link" to="/add-destinations" onClick={closeMenu}>
                    Add Destinations
                  </NavLink>
                  <NavLink className="nav-link" to="/add-packages" onClick={closeMenu}>
                    Add Packages
                  </NavLink>
                  <NavLink className="nav-link" to="/add-itineraries" onClick={closeMenu}>
                    Add Itineraries
                  </NavLink>
                  <NavLink className="nav-link" to="/delete" onClick={closeMenu}>
                    Delete
                  </NavLink>
                   </> : <></>}
                   <div className="ms-md-4 ms-2">
              {/* <NavLink className="primaryBtn d-none d-sm-inline-block">
                Book Now
              </NavLink> */}
             
              <li className="d-inline-block d-lg-none ms-3 toggle_btn">
                <i className={open ? "bi bi-x-lg" : "bi bi-list"}  onClick={toggleMenu}></i>
              </li>
            </div>
            <button className="primaryBtn d-none d-sm-inline-block" onClick={() => logout(() => navigate("/login"))}>
                    LOGOUT
                  </button>

                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
           
            
          </Navbar>
    
      </Container>
    </header>
  );
};

export default Header;
