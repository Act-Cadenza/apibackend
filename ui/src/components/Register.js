import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    axios
      .post('http://127.0.0.1:8000/api/register', {
        name: name,
        email: email,
        password: password,
      })
      .then((response) => {
        // Save the token in local storage or session storage
        localStorage.setItem('token', response.data.token);
        // Redirect to the dashboard
        window.location = '/dashboard';
      })
      .catch((error) => {
        console.error('Registration error:', error);
      });
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
