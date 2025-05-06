import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './DeleteDestination.css';
import { AuthContext } from '../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function DeleteDestinationForm() {
  const { isAuthenticated, accessToken, logout, refreshAuthToken, userId } = useContext(AuthContext);
  const navigate = useNavigate();
  const [destination, setDestination] = useState([]);
  const [popular, setPopular] = useState([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchWithAuth = async (url, options = {}) => {
    let token = accessToken;
    let response;
    
    try {
      response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
  
      // If unauthorized, try to refresh token once
      if (response.status === 401) {
        const newToken = await refreshAuthToken();
        if (!newToken) {
          throw new Error('Token refresh failed');
        }
        response = await fetch(url, {
          ...options,
          headers: {
            ...options.headers,
            'Authorization': `Bearer ${newToken}`,
            'Content-Type': 'application/json'
          },
        });
      }
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Check if response has content before parsing as JSON
      const contentLength = response.headers.get('content-length');
      if (contentLength === '0' || response.status === 204) {
        return null; // or return {} depending on what you need
      }
  
      return await response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [destinations, packages] = await Promise.all([
        fetchWithAuth('http://localhost:8000/api/destinations'),
        fetchWithAuth('http://localhost:8000/api/packages')
      ]);
      
      const filteredDestinations = destinations.filter(dest => dest.created_by === userId);
      const filteredPackages = packages.filter(pkg => pkg.created_by === userId);
      
      setDestination(filteredDestinations);
      setPopular(filteredPackages);

      if (filteredDestinations.length > 0) {
        setSelectedDestination(filteredDestinations[0].id);
      }
      if (filteredPackages.length > 0) {
        setSelectedPackage(filteredPackages[0].id);
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
      showMessage('Failed to fetch data. Please try again.', 'error');
      // logout(() => navigate('/login'));
    }
  };

  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 5000);
  };

  const handleDeleteDestination = async () => {
    if (!selectedDestination) {
      showMessage('Please select a destination first.', 'error');
      return;
    }

    try {
      setIsLoading(true);
      console.log("The selected destination is ", selectedDestination)
      await fetchWithAuth(`http://localhost:8000/api/destinations/${selectedDestination}`, {
        method: 'DELETE'
      });
      
      showMessage('Destination deleted successfully!', 'success');
      // Refresh the list after deletion
      await fetchData();
    } catch (error) {
      console.error('Error deleting destination:', error);
      showMessage('Failed to delete destination. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePackage = async () => {
    if (!selectedPackage) {
      showMessage('Please select a package first.', 'error');
      return;
    }

    try {
      setIsLoading(true);
      await fetchWithAuth(`http://localhost:8000/api/packages/${selectedPackage}`, {
        method: 'DELETE'
      });
      
      showMessage('Package deleted successfully!', 'success');
      // Refresh the list after deletion
      await fetchData();
    } catch (error) {
      console.error('Error deleting package:', error);
      showMessage('Failed to delete package. Please try again.', 'error');
    } finally {
      setIsLoading(false);
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
    return null;
  }

  return (
    <div className="login_container">
      {message && (
        <div className={`message ${messageType}`}>
          {message}
        </div>
      )}
      
      {/* Destination Dropdown */}
      <div className="destination-selector">
        <label htmlFor="destination-select">Select Destination: </label>
        <select 
          id="destination-select"
          value={selectedDestination || ''}
          onChange={(e) => setSelectedDestination(e.target.value)}
          disabled={isLoading || destination.length === 0}
        >
          {destination.length === 0 ? (
            <option value="">No destinations available</option>
          ) : (
            destination.map(d => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))
          )}
        </select>

        <button
          className="delete-button"
          onClick={handleDeleteDestination}
          disabled={isLoading || destination.length === 0}
        >
          {isLoading ? 'Deleting...' : 'Delete Destination'}
        </button>
      </div>
  
      {/* Packages for Selected Destination */}
      <div className="destination-selector">
        <label htmlFor="package-select">Select Package: </label>
        <select 
          id="package-select"
          value={selectedPackage || ''}
          onChange={(e) => setSelectedPackage(e.target.value)}
          disabled={isLoading || popular.length === 0}
        >
          {popular.length === 0 ? (
            <option value="">No packages available</option>
          ) : (
            popular.map(p => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))
          )}
        </select>
        
        <button
          className="delete-button"
          onClick={handleDeletePackage}
          disabled={isLoading || popular.length === 0}
        >
          {isLoading ? 'Deleting...' : 'Delete Package'}
        </button>
      </div>
    </div>
  );
}