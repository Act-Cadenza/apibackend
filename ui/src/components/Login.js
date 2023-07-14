import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { Link } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || "/";
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cookies, setCookie] = useCookies(['user']);

    const [error, setError] = useState(false);

    const loginSubmit = async (e) => {
      // console.log(from);
      // console.log(location.state);
      // console.log(cookies);
      console.log(cookies.user)
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login',
                JSON.stringify({ email, password }),
                {
                    headers:
                    {
                        'Content-Type': 'application/json',
                    },
                },
            );
            const user = response?.data;
            setCookie('user', user);
            navigate(from, { replace: true, state: { loginSuccess: true } });
        } catch (err) {
            if (err?.response) {
                setError(true);
            } else if (err.reponse?.status === 400) {
                //errror na missing email or password error
                console.log('No email or password');
            } else if (err.response?.status === 401) {
              console.log('No email or password');
            } else {
              console.log('Error');
                // mga rrore
            }
        }
    }

    return (
        <div className='section'>
            <form className='form-login' onSubmit={loginSubmit}>
                <h3 className='text-center'>LOGIN FORM</h3>
                <div>
                    <label className='form-label'>Email</label>
                    <input className={error ? 'form-control error' : 'form-control'} type="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email} required></input>
                </div>
                <div>
                    <label className='form-label'>Password</label>
                    <input className={error ? 'form-control error' : 'form-control'} type="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} required></input>
                </div>
                <div className='submit-btn pt-3 text-center'>
                    <input className='btn btn-primary' type="submit" value="Submit" />
                </div>
                <div className='login-to-register-text'>
                    <p>No user account yet?
                        <Link to={'/register'}>
                            <span>Register</span>
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default Login;

// import React, { useState } from 'react';
// import axios from 'axios';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

  
//   const handleLogin = () => {
    
//     axios
//       .post('http://127.0.0.1:8000/api/login', {
//         email: email,
//         password: password,
//       })
//       .then((response) => {
//         // Save the token in local storage or session storage
//         const { token } = response.data.data; // Extract the token from the response
//         localStorage.setItem('token', response.data.token);
//         console.log('Token:', token);
//         // Redirect to the dashboard
//         window.location = '/products';
//       })
//       .catch((error) => {
//         console.error('Login error:', error);
//       });
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// }

// export default Login;

