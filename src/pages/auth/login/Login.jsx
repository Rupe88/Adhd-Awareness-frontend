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

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = { email, password };

    try {
      const response = await loginUser(data).unwrap();
      const { token, user } = response;
      dispatch(setUser({ user }));
      alert('Login successful');
      navigate('/');
    } catch (err) {
      setMessage("Please provide a valid email and password!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen dark:bg-gray-800 px-4 sm:px-6 lg:px-8">
      <div className="max-w-sm w-full bg-white dark:bg-gray-900 shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Welcome Back!
        </h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          {message && <p className="text-red-500 text-center">{message}</p>}
          <button
            type="submit"
            disabled={loginLoading}
            className="w-full py-3 bg-pink-500 text-white rounded-lg font-semibold hover:bg-pink-600 transition duration-300"
          >
            {loginLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center text-gray-600 dark:text-gray-300 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-pink-600 dark:text-pink-400 hover:underline">
            Register
          </Link>{' '}
          here.
        </p>
      </div>
    </div>
  );
};

export default Login;
