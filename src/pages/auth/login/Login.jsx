/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import { useLoginUserMutation } from "../../../redux/features/auth/authApi";

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from "../../../redux/features/auth/authSlice";


const Login = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation();

  const navigate = useNavigate();
    // console.log("Loging user Api", loginUser);
  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
        email,
        password,
      }
    
    try {
      const response= await loginUser(data).unwrap();
      console.log(response)
      const { token, user } = response;
      dispatch(setUser({ user }));
      alert('Login successful');
      navigate('/');
      
    } catch (err) {
      setMessage("Please provide a valid email and password!");
    }
  };



  return (
    <>
    <div className='bg-white dark:bg-primary p-8 min-h-screen'>
    <div className='max-w-sm dark:text-white bg-gray-200 dark:bg-gray-900 mx-auto p-8'>
      <h2 className='text-2xl font-semibold pt-5'>Please login</h2>
      <form onSubmit={handleLogin} className='space-y-5 max-w-sm mx-auto pt-8'>
        <input type="text" value={email} 
         className='w-full bg-primary text-gray-200 dark:text-white focus:outline-none px-5 py-3'
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email" required />

        <input type="password" value={password} 
        className='w-full bg-primary text-gray-200 dark:text-white focus:outline-none px-5 py-3'
        onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        {
          message && <p className="text-red-500">{message}</p>  // Display error message if any
        }
        <button type="submit" disabled={loginLoading}
         className='w-full mt-5 bg-pink-500 hover:bg-pink-500 text-white font-medium py-3 rounded-md'
        >Login</button>
      </form>
     
        <p className='my-5 text-center'>Don't have an account? 
          <Link to="/register" className='text-pink-600 italic'> Register </Link> here.
        </p>
    </div>
    </div>
    </>

  );
};

export default Login;