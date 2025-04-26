import React, { useState,useEffect, useContext } from "react";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { Container, Row, Col, Offcanvas } from "react-bootstrap";
import PopularCard from "../../components/Cards/PopularCard";
import { popularsData } from "../../utils/data";
import Filters from "./Filters";
import "../Tours/tour.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import { useParams } from "react-router-dom";
const Tours = () => {
  const [show, setShow] = useState(false);
  const { destinationId } = useParams();
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    const { isAuthenticated, accessToken, logout, refreshAuthToken } = useContext(AuthContext);
    const navigate = useNavigate();
  useEffect(() => {
    document.title = " Tours   ";
    window.scroll(0, 0);
  }, []);

  const [insideDestination, setInsideDestination] = useState([]);
  
  const fetchWithAuth = async (url) => {
    let token = accessToken;
    let response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    // If unauthorized, try to refresh token once
    if (response.status === 401) {
      const newToken = await refreshAuthToken();
      if (!newToken) {
        throw new Error('Token refresh failed');
      }
      response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${newToken}`,
        },
      });
    }
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    return await response.json();
  };
  
  const fetchData = async () => {
    try {
      const [packages_inside_destination] = await Promise.all([
        fetchWithAuth(`http://localhost:8000/api/destinations/${destinationId}/packages/`),
      ]);
      
      setInsideDestination(packages_inside_destination)
    } catch (error) {
      console.error('Error fetching data:', error);
      alert(error)
      // logout(() => navigate('/login'));
    }
  };
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchData();
  }, [accessToken, isAuthenticated, navigate, logout, refreshAuthToken]);
  
  if (!isAuthenticated) {
    return null; // or loading spinner
  }
  return (
    <>
      <Breadcrumbs title="Tours" pagename="Tours" />
      <section className="py-5 tour_list">
        <Container>
          <Row>
            <Col xl="3" lg="4" md="12" sm="12">
            <div className="d-lg-none d-block">
                    <button className="primaryBtn mb-4" onClick={handleShow}>
                       <i className="bi bi-funnel"></i> Filters
                    </button>
            </div>
            <div className="filters d-lg-block d-none">
            <Filters />
            </div>

            </Col>
            <Col xl="9" lg="8" md="12" sm="12">
              <Row>
                {insideDestination.map((val, inx) => {
                  return (
                    <Col xl={4} lg={6} md={6} sm={6} className="mb-5" key={inx}>
                      <PopularCard val={val} />
                    </Col>
                  );
                })}
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filters</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <Filters />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Tours;
