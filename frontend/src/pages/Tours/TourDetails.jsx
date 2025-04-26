import React,{useEffect, useContext, useState} from "react";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import "../Tours/tour.css";
import { tourDetails } from "../../utils/data";
import { NavLink } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import {
  Container,
  Row,
  Nav,
  Col,
  Tab,
  ListGroup,
  Accordion,
  Card,
  Stack,
} from "react-bootstrap";

const TourDetails = () => {
  const { isAuthenticated, accessToken, userId, logout, refreshAuthToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [itinerary, setItinerary] = useState([]);
  const [destPackage, setDestPackage]=useState([]);
  const [images, setImages] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [flights, setFlights] = useState([])
    const [filteredBookings, setFilteredBookings] = useState([])
  
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
  const fetchAllData = async () => {
    try {
      const [itinerariesData, packageData, bookingsData, flights] = await Promise.all([
        fetchWithAuth('http://localhost:8000/api/packages/1/itineraries'),
        fetchWithAuth('http://localhost:8000/api/packages/1'),
        fetchWithAuth('http://localhost:8000/api/bookings'),
        fetchWithAuth('http://localhost:8000/api/packages/1/flights')
      ]);
  
      setItinerary(itinerariesData);
      setDestPackage(packageData);
      setImages([{ original: packageData.image, thumbnail: packageData.image }]);
      setBookings(bookingsData);
      setFlights(flights)
      console.log(bookingsData)
      
      console.log("The user id is ", userId)
      console.log("The package id is ", packageData.id)
      const filter = bookingsData.filter(
        booking => booking.customer === userId && booking.package === packageData.id
      );

      console.log("Filtered Bookings is ", filter )
      setFilteredBookings(filter)

      console.log([{ original: packageData.image, thumbnail: packageData.image }]);
    } catch (error) {
      console.error('Error fetching data:', error);
      // alert(error);
      logout(() => navigate('/login'));
    }
  };
  console.log(flights)
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchAllData()
  }, [accessToken, isAuthenticated, navigate, logout, refreshAuthToken]);
  

  console.log(destPackage)
  console.log("Bookings is ", bookings)
  useEffect(() => {
    document.title = " Tours  Details  ";
    window.scroll(0, 0);
  }, []);
  if (!isAuthenticated) {
    return null; // or loading spinner
  }
  return (
    <>
      <Breadcrumbs
        title={destPackage?.name}
        pagename=<NavLink to="/tours">Tours</NavLink>
        childpagename={tourDetails.title}
      />

      <section className="tour_details py-5">
        <Container>
          <Row>
            <h1 className="fs-2 font-bold mb-4">{destPackage?.name} </h1>
            <ImageGallery
              items={images}
              showNav={false}
              showBullets={false}
              showPlayButton={false}
            />

            <Tab.Container id="left-tabs-example" defaultActiveKey="1">
              <Row className="py-5">
                <Col md={8} className="mb-3 mb-md-0">
                  <Col md={12}>
                    <Nav
                      variant="pills"
                      className="flex-row nav_bars rounded-2"
                    >
                      <Nav.Item>
                        <Nav.Link eventKey="1"> Overview </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="2">Itinerary</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="3">
                          {" "}
                          Inclusions & Exclusion{" "}
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="4">Flights </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>

                  <Tab.Content className="mt-4">
                    <Tab.Pane eventKey="1">
                      <div className="tour_details">
                        <h1 className="font-bold mb-2 h3 border-bottom pb-2">
                          Overview
                        </h1>
                        <p className="body-text">{destPackage?.overview}</p>

                        {/* <h5 className="font-bold mb-2 h5  mt-3">Tour Info</h5> */}

                        {/* <ListGroup>
                          {tourDetails.tourInfo.map((val, index) => {
                            return (
                              <ListGroup.Item
                                className="border-0 pt-0 body-text"
                                key={index}
                                dangerouslySetInnerHTML={{ __html: val }}
                              ></ListGroup.Item>
                            );
                          })}
                        </ListGroup> */}

                        <h5 className="font-bold mb-2 h5  mt-3">
                          Tour highlights
                        </h5> 

                        {tourDetails.highlights.map((val, index) => {
                          return (
                            <ListGroup.Item
                              className="border-0 pt-0 body-text"
                              key={index}
                            >
                              {val}
                            </ListGroup.Item>
                          );
                        })} 
                      </div>
                    </Tab.Pane>

                    <Tab.Pane eventKey="2">
                      <div className="tour_details">
                        <h1 className="font-bold mb-2 h3 border-bottom pb-2">
                          Itinerary
                        </h1>

                        <Accordion defaultActiveKey="0" className="mt-4">
                          {itinerary.map((val, index) => {
                            return (
                              <Accordion.Item
                                eventKey={index}
                                key={index}
                                className="mb-4"
                              >
                                <Accordion.Header>
                                  <h1
                                    dangerouslySetInnerHTML={{
                                      __html: `Day ${val.day_interval} - ${val.title}`,
                                    }}
                                  ></h1>
                                </Accordion.Header>
                                <Accordion.Body className="body-text">
                                  {val.description}
                                </Accordion.Body>
                              </Accordion.Item>
                            );
                          })}
                        </Accordion>
                      </div>
                    </Tab.Pane>

                    <Tab.Pane eventKey="3">
                      <div className="tour_details">
                        <h1 className="font-bold mb-2 h3 border-bottom pb-2">
                          Inclusions & Exclusions
                        </h1>

                        <h5 className="font-bold mb-3 h5  mt-3">Inclusion</h5>

                        {tourDetails.included.map((val, index) => {
                          return (
                            <ListGroup.Item
                              className="border-0 pt-0 body-text d-flex align-items-center"
                              key={index}
                            >
                              <i className="bi bi-check-lg me-2 text-success h4 m-0"></i>{" "}
                              {val}
                            </ListGroup.Item>
                          );
                        })}

                        <h5 className="font-bold mb-3 h5  mt-3">Exclusion</h5>

                        {tourDetails.exclusion.map((val, index) => {
                          return (
                            <ListGroup.Item
                              className="border-0 pt-0 body-text d-flex align-items-center"
                              key={index}
                            >
                              <i className="bi bi-x-lg me-2 text-danger h5 m-0"></i>{" "}
                              {val}
                            </ListGroup.Item>
                          );
                        })}
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="4">
                      <div className="tour_details">
                        <h1 className="font-bold mb-4 h3 border-bottom pb-2">
                          Flights
                        </h1>

                        <p>Name: {flights[0]?.name}</p>
                        <p>Arrival Time: {flights[0]?.arrival_datetime}</p>
                        <p>Departure Time: {flights[0]?.departure_datetime}</p>

                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>

                <Col md={4}>
                  <aside>
                    <Card className="rounded-3 p-2 shadow-sm mb-4 price-info">
                      <Card.Body>
                        <Stack gap={2} direction="horizontal">
                          <h1 className="font-bold mb-0 h2">
                            ${destPackage?.afterDiscount}
                          </h1>
                          <span className="fs-4"> /person</span>
                        </Stack>

                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <ListGroup horizontal>
                            <ListGroup.Item className="border-0 me-2 fw-bold">
                              {tourDetails.rating}
                            </ListGroup.Item>
                            <ListGroup.Item className="border-0 me-1 text-warning">
                              <i className="bi bi-star-fill"></i>
                            </ListGroup.Item>
                            <ListGroup.Item className="border-0 me-1 text-warning">
                              <i className="bi bi-star-fill"></i>
                            </ListGroup.Item>
                            <ListGroup.Item className="border-0 me-1 text-warning">
                              <i className="bi bi-star-fill"></i>
                            </ListGroup.Item>
                            <ListGroup.Item className="border-0 me-1 text-warning">
                              <i className="bi bi-star-fill"></i>
                            </ListGroup.Item>
                            <ListGroup.Item className="border-0 me-1 text-warning">
                              <i className="bi bi-star-half"></i>
                            </ListGroup.Item>
                          </ListGroup>
                          <h5 className="h6"> ({tourDetails.reviews})</h5>
                        </div>

                        {filteredBookings.length == 0 ? <NavLink to={`/booking/${destPackage.id}`} className="primaryBtn w-100 d-flex justify-content-center fw-bold">
                          Book Now
                        </NavLink>: <p>Already booked</p> }
                      </Card.Body>
                    </Card>

                    <Card className="card-info p-2 shadow-sm">
                      <Card.Body>
                        <h1 className="font-bold mb-2 h3">Need Help ?</h1>

                        <ListGroup>
                         
                          <ListGroup.Item className="border-0">
                          <i className="bi bi-telephone me-1"></i>  Call us on: <strong>+91 123 456 789</strong>
                          </ListGroup.Item>
                          <ListGroup.Item className="border-0">
                          <i className="bi bi-alarm me-1"></i> Timing: <strong>10AM to 7PM</strong>
                          </ListGroup.Item>
                          <ListGroup.Item className="border-0">
                          <strong> <i className="bi bi-headset me-1"></i> Let us call you</strong> 
                          </ListGroup.Item>
                          <ListGroup.Item className="border-0"><i className="bi bi-calendar-check me-1"></i> <strong> Book Appointments</strong> </ListGroup.Item>
                        </ListGroup>
                      </Card.Body>
                    </Card>
                  </aside>
                </Col>
              </Row>
            </Tab.Container>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default TourDetails;
