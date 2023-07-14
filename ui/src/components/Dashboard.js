import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Maploc from './Maploc';
import {Route} from 'react-router-dom'
import Navbar from './Navbar'
import './navbar.css'
function Dashboard() {
  const [user, setUser] = useState(null);
  const [cookies, setCookie] = useCookies(['user']);
  
  useEffect(() => {
    // Retrieve user information from the server
    console.log(user && user.name);
    const token = cookies.user.data.token;
    axios
      .get('http://127.0.0.1:8000/api/user', {
        headers: {
          Authorization:  `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error('Dashboard error:', error);
        // Redirect to the login page if not authenticated
        window.location = '/login';
      });
  }, []);

  return (
    <div>
      <div className="logo"></div>
      <Navbar />
      <div/>
      <h2>Welcome, {user && user.name}</h2>
      {/* Display Map here */}
      <Maploc />
    </div>
  );
}

export default Dashboard;

