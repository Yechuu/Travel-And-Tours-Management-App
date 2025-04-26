import React, { useState,useEffect, useContext } from "react";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import { Col, Container, Form, Row, Card, ListGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "../Booking/booking.css"
import { useParams } from 'react-router-dom';
import { AuthContext } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";
const Booking = () => {
  const { isAuthenticated, accessToken, userId, logout, refreshAuthToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);
  const { packageId } = useParams();
  console.log("The package id is ", packageId)
  console.log("The user id in Booking.jsx", userId)

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



const fetchFlights = async () => {
  try {
    const result = await fetchWithAuth('http://localhost:8000/api/packages/1/flights');
    setFlights(result);
  } catch (error) {
    console.error('Error fetching flights:', error);
    alert(error)
    // logout(() => navigate('/login'));
  }
};

  const postWithAuth = async (url, body) => {
    let token = accessToken;
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
  
    if (response.status === 401) {
      const newToken = await refreshAuthToken();
      if (!newToken) throw new Error('Token refresh failed');
  
      response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${newToken}`,
        },
        body: JSON.stringify(body),
      });
    }
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    return await response.json();
  };

  const makeBooking = async () => {
  try {
    const packageid = '1'
    // const packageId = packageId; // assuming it's set correctly
    const response = await postWithAuth('http://localhost:8000/api/bookings/', {
      customer: userId,
      package: packageid,
      flight: flights.id
    });

    console.log('Booking successful:', response);
    // Optionally navigate or show confirmation
    // navigate('/confirmation');
    alert('Booking successfully made!');
  } catch (error) {
    console.error('Error making booking:', error);
    alert(error)
    // logout(() => navigate('/login'));
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  makeBooking();
};

 useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchFlights();
    // fetchBookings();
  }, [accessToken, isAuthenticated, navigate, logout, refreshAuthToken]);

    
  
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  console.log(flights)

  useEffect(()=>{
    document.title ="Page Name  "
    window.scroll(0, 0)
  },[])

  return (
    <>
      <Breadcrumbs title="Booking" pagename="Booking" />
      <section className="booking-section py-5">
        <Container>
          <Row>
            <Col md="8" lg="8">
              <div className="booking-form-warp border rounded-3">
                <div className="form-title px-4 border-bottom py-3">
                  <h3 className="h4 font-bold m-0"> Your Details</h3>
                </div>

                <Form className="p-4" onSubmit={handleSubmit}>
                  <Row>
                    <Form.Group
                      as={Col}
                      md="6"
                      controlId="firstname"
                      className="mb-4"
                    >
                      <Form.Label>First name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="First name"
                      />
                    </Form.Group>

                    <Form.Group
                      as={Col}
                      md="6"
                      controlId="lastname"
                      className="mb-4"
                    >
                      <Form.Label>Last name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Last name"
                      />
                    </Form.Group>

                    <Form.Group
                      className="mb-4"
                      controlId="email.ControlInput1"
                      as={Col}
                      md="6"
                    >
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="name@example.com"
                      />
                    </Form.Group>

                    <Form.Group
                      className="mb-4"
                      controlId="phone"
                      as={Col}
                      md="6"
                    >
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control type="text" placeholder="Phone Number" />
                    </Form.Group>

                    <Form.Group
                      className="mb-4"
                      controlId="checkin"
                      as={Col}
                      md="6"
                    >
                      <Form.Label className="d-block">Check In</Form.Label>
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        className="form-control w-100"
                        dateFormat="dd, MMMM, yyyy"
                      />
                    </Form.Group>

                    <Form.Group
                      className="mb-4"
                      controlId="checkout"
                      as={Col}
                      md="6"
                    >
                      <Form.Label className="d-block">Check Out</Form.Label>
                      <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        startDate={endDate}
                        endDate={startDate}
                        dateFormat="dd, MMMM, yyyy"
                        className="form-control w-100"
                      />
                    </Form.Group>
                    <Col md="12">
                      <button className="primaryBtn " type="submit"> Submit Now</button>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>

            <Col md="4" lg="4">
              <Card className="card-info p-0 shadow-sm bg-white">
                <Card.Header>
                  {" "}
                  <h1 className="font-bold  h4 mt-2">Price Summary</h1>{" "}
                </Card.Header>
                <Card.Body className="pb-0">
                  <ListGroup>
                    <ListGroup.Item className="border-0 d-flex justify-content-between h5 pt-0">
                      <span> Base Price</span>
                      <strong>$28,660</strong>
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0 d-flex justify-content-between h5 pt-0">
                      <span> Total Discount <span className="badge bg-danger">
                        10%
                      </span></span>
                      <strong>$20</strong>
                    </ListGroup.Item>
                    <ListGroup.Item className="border-0 d-flex justify-content-between h5 pt-0">
                      <span> Taxes % Fees</span>
                      <strong>$28,660</strong>
                    </ListGroup.Item>

                  </ListGroup>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between py-4">
                  <span className="font-bold h5"> Payable Now</span>
                  <strong className="font-bold h5">$28,660</strong>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Booking;
