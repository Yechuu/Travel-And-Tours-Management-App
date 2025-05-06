import React, { useState, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import './CreatePackages.css'
import { AuthContext } from '../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function CreatePackageForm() {
  const [name, setName] = useState('');
  const navigate=useNavigate()
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [overview, setOverview] = useState("")
  const [tourHighlights, setTourHighlights] = useState("")
  const [allDestinations, setAllDestinations] = useState([])
  const { isAuthenticated, accessToken, logout, refreshAuthToken } = useContext(AuthContext);
  const [selectedDestination, setSelectedDestination] = useState("")
  const [duration, setDuration] = useState("")
  const [available_dates, setAvailableDates] = useState("")
  const [price, setPrice] = useState();
  const [afterDiscount, setAfterDiscount] = useState()
  const [tourInfo, setTourInfo] = useState("")
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');


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
        fetchWithAuth('http://localhost:8000/api/destinations')
      ]);
      const destinations = await response.json()
      console.log("Fetching destination", destinations)
      setAllDestinations(destinations);
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
    formData.append('name', name);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('overview', overview);
    formData.append('tour_highlights', tourHighlights)
    formData.append('duration', duration)
    formData.append('available_dates', available_dates)
    formData.append('price', price)
    formData.append('afterDiscount', afterDiscount)
    formData.append('destination', selectedDestination)
    formData.append('tour_info', tourInfo)
    console.log(selectedDestination)
    console.log(formData)

    try {
      const response = await fetchWithAuth('http://localhost:8000/api/packages/', {
        method: 'POST',
        body: formData,
      });        
      console.log("response is ", response)
      const response1 = await response.json()
      console.log("response is ", response1)

      
        if (response.ok) {
          setMessage('Package created successfully!');
          // Reset form fields
          setName('');
          setDescription('');
          setImage(null);
          setOverview('');
          setTourHighlights('');
          setDuration('');
          setAvailableDates('');
          setPrice('');
          setAfterDiscount('');
          setSelectedDestination('');
          setTourInfo('');
    
        } else {
        //   alert(response)
        setError(response.detail || 'Failed to create package');        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setError('An unexpected error occurred. Please try again.');
      }
    }      

  return (
      <div className="login_container">
            <div className="login_wrapper">
              <h1 className="login_title">Add Package</h1>
              {message && <div className="success-message">{message}</div>}
{error && <div className="error-message ">{error}</div>}
          <form onSubmit={handleSubmit} className="login_form">
            {/* <h2>Login</h2> */}
            <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter Package name"
          />   
        <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter description"
          ></textarea>

        <textarea
            id="Overview"
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter overview"
          ></textarea>
           <textarea
            id="Tour Highlights"
            value={tourHighlights}
            onChange={(e) => setTourHighlights(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter Tour Highlights"
          ></textarea>
          <textarea
            id="tourInfo"
            value={tourInfo}
            onChange={(e) => setTourInfo(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter Tour Info"
          ></textarea>
           <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
           <div className="mb-3">
      {/* <label htmlFor="destination" className="form-label">Select Destination</label> */}
      <select
        id="destination"
        name="destination"
        className="form-select"
        value={selectedDestination}
        onChange={(e) => setSelectedDestination(e.target.value)}
      >
        <option value="">-- Select Destination --</option>
        {allDestinations?.map((destination) => (
          <option key={destination.id} value={destination.id}>
            {destination.name}
          </option>
        ))}
      </select>
    </div>
    <input
            type="text"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter Duration"
          />   
           <input
            type="text"
            id="available_dates"
            value={available_dates}
            onChange={(e) => setAvailableDates(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter Available Dates"
          />   
                <input
        type="number"
        id="price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Enter Price"
        />
          <input
        type="number"
        id="afterDiscount"
        value={afterDiscount}
        onChange={(e) => setAfterDiscount(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Enter After Discount"
        />
    
                 <button type="submit" className="login_button" >Submit</button>
          </form>
          </div>
          </div>
  );
}
