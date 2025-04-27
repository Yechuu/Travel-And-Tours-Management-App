import React, { useState, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import './CreateItineraries.css'

export default function CreateItinerariesForm() {
  const [title, setTitle] = useState('');
  const navigate=useNavigate()
  const [description, setDescription] = useState('');
  const [allPackages, setAllPackages] = useState([])
  const { isAuthenticated, accessToken, logout, refreshAuthToken } = useContext(AuthContext);
  const [selectedPackage, setSelectedPackage] = useState("")
  const [day_interval, setDayInterval] = useState(1)



  const fetchWithAuth = async (url, options = {}) => {
    let token = accessToken;
    let response = await fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401) {
      const newToken = await refreshAuthToken();
      if (!newToken) {
        throw new Error('Token refresh failed');
      }
      response = await fetch(url, {
        ...options,
        headers: {
          ...(options.headers || {}),
          Authorization: `Bearer ${newToken}`,
        },
      });
    }

    return response;
  };


  const fetchData = async () => {
    try {
      const [response] = await Promise.all([
        fetchWithAuth('http://localhost:8000/api/packages')
      ]);
      const packages = await response.json()
      console.log("Fetching destination", packages)
      setAllPackages(packages);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert(error)
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

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('day_interval', day_interval)
    formData.append('package', selectedPackage)
    formData.append('order', 0)


    try {
      const response = await fetchWithAuth('http://localhost:8000/api/itineraries/', {
        method: 'POST',
        body: formData,
      });        
      console.log("response is ", response)
      const response1 = await response.json()
      console.log("Post package is ", response1)

      
        if (response.ok) {
          alert('Itinerary created successfully!');
          navigate('/')
          setTitle('');
          setDescription('');
        //   setImage(null);
        } else {
        //   alert(response)
          alert('Failed to create itinerary');
        }
      } catch (error) {
        console.error('Error submitting form:', error);  // This will log the catch block errors
        // alert('An error occurred');
        alert(error)
      }
    }      

  return (
      <div className="login_container">
            <div className="login_wrapper">
              <h1 className="login_title">Add Itinerary</h1>
          <form onSubmit={handleSubmit} className="login_form">
            {/* <h2>Login</h2> */}
            <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Short Title i.e Airport Pickup"
          />   
        <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter description"
          ></textarea>

           <div className="mb-3">
      {/* <label htmlFor="destination" className="form-label">Select Package</label> */}
      <select
        id="destination"
        name="destination"
        className="form-select"
        value={selectedPackage}
        onChange={(e) => setSelectedPackage(e.target.value)}
      >
        <option value="">-- Select Destination --</option>
        {allPackages?.map((ind_package) => (
          <option key={ind_package.id} value={ind_package.id}>
            {ind_package.name}
          </option>
        ))}
      </select>
    </div>
 
                <input
        type="number"
        id="day_interval"
        value={day_interval}
        onChange={(e) => setDayInterval(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Enter Day Number"
        />
    
                 <button type="submit" className="login_button" >Submit</button>
          </form>
          </div>
          </div>
  );
}
