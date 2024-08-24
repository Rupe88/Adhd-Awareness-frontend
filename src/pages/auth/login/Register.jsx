import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../../redux/features/auth/authApi";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const [registerUser, { isLoading, error }] = useRegisterUserMutation();
  const handleRegister = async (e) => {
    e.preventDefault();
    const data = {
      username,
      email,
      password,
    };

    try {
      await registerUser(data).unwrap();
      alert("Regisger SuccessFul!");
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("Register Failed!");
      setMessage("Registration Failed");
    }
  };
  return (
    <>
      <div className="bg-white dark:bg-primary  min-h-screen p-10 ">
        <div className="max-w-sm bg-gray-200 dark:bg-gray-900 mx-auto p-8">
          <h2 className="text-2xl font-semibold pt-5 dark:text-pink-500">
            Please Register
          </h2>
          <form
            onSubmit={handleRegister}
            className="space-y-5 mx-w-sm mx-auto pt-8"
          >
            <input
              type="text"
              value={username}
              className="w-full bg-primary text-gray-200 dark:text-white focus:outline-none px-5 py-3"
              required
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />

            <input
              type="email"
              value={email}
              className="w-full text-gray-200 dark:text-white bg-primary focus:outline-none px-5 py-3"
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-gray-200 dark:text-white bg-primary focus:outline-none px-5 py-3"
              required
              placeholder="Password"
            />

            {message && <p className="text-red-600">{message}</p>}

            <button className="w-full mt-5 py-2.5 bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-md">
              Register
            </button>
          </form>
          <p className="mt-5 text-center dark:text-white">
            Already have an Account{" "}
            <Link to={"/login"} className="text-pink-600 italic">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
