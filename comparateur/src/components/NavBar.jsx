import React from "react";
import { Link } from "react-router-dom";
import nav from "../assets/logo.png";

export default function Navbar() {
  return (
    <>
      <nav className="mb-0 flex flex-wrap items-center justify-between px-2 py-0h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 ">
        <div className="container px-4 mx-auto flex flex-wrap items-center">
          <div className="w-full ">
            <div
              className="flex justify-between items-center text-sm font-bold leading-relaxed mr-4 py-2 whitespace-nowrap uppercase text-white"
              href="#pablo"
            >
              <img
                className="w-20 h-20 flex justify-center item-center"
                src={nav}
                alt=""
              />

              <div className="cursor-pointer">
                <Link
                  to="/login"
                  className="font-medium  hover:underline px-28"
                >
                  login
                </Link>

                <Link
                  to="/signup"
                  className="font-medium  hover:underline px-28"
                >
                  Sign up
                </Link>

                <a
                  href="#contact"
                  className="font-medium  hover:underline px-28"
                >
                  contact
                </a>

                <Link to="/" className="font-medium  hover:underline px-8">
                  home
                </Link>
              </div>
            </div>
          </div>
        </div>
        <br className="bg-black" />
      </nav>
    </>
  );
}
