import React, { useState, useContext} from 'react';
import { Link } from 'react-router-dom';
import './CreateDestinationForm.css'
import { AuthContext } from '../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function CreateDestinationForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const { isAuthenticated, accessToken, logout, refreshAuthToken } = useContext(AuthContext);
  const [message, setMessage] = useState('');
const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const navigate = useNavigate()

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('image', image);

    try {
      const response = await fetchWithAuth('http://localhost:8000/api/destinations/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMessage('Destination created successfully!');
        setMessageType('success');
        // navigate('/');
        setName('');
        setDescription('');
        setImage(null);
      } else {
        setMessage('Failed to create destination');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('An error occurred');
      setMessageType('error');

    }
  };

  return (
      <div className="login_container">
            <div className="login_wrapper">
              <h1 className="login_title">Add Destination</h1>
              {message && (
  <div className={`message ${messageType}`}>
    {message}
  </div>
)}
          <form onSubmit={handleSubmit} className="login_form">
            {/* <h2>Login</h2> */}
            <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter destination name"
          />   
        <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter description"
          ></textarea>
           <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
                 <button type="submit" className="login_button" >Submit</button>
          </form>
          </div>
          </div>
  );
}
