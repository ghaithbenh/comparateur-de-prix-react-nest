import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [signUpInfo, setSignUpInfo] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    await axios.post(
      "http://localhost:3333/auth/signup",
      {
        email: signUpInfo.email,
        password: signUpInfo.password,
      },
      {
        withCredentials: true,
      }
    );

    navigate("/login");
  };

  return (
    <div className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500">
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-purple-700 uppercase">
            Sign up
          </h1>
          <form onSubmit={handleSignup} className="mt-6">
            <div className="mb-2">
              <label
                for="email"
                className="block text-sm font-semibold text-gray-800"
              >
                Email
              </label>
              <input
                value={signUpInfo.email}
                onChange={(e) =>
                  setSignUpInfo({ ...signUpInfo, email: e.target.value })
                }
                type="email"
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label
                for="password"
                className="block text-sm font-semibold text-gray-800"
              >
                Password
              </label>
              <input
                value={signUpInfo.password}
                onChange={(e) =>
                  setSignUpInfo({ ...signUpInfo, password: e.target.value })
                }
                type="password"
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-8 text-xs font-light text-center text-gray-700">
            {" "}
            You Already Have An Acoount ?{" "}
            <Link
              to="/login"
              className="font-medium text-purple-600 hover:underline"
            >
              Login in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
