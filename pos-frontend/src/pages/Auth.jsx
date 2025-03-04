import restaurant from "../assets/images/restaurant-img.jpg";
import logo from "../assets/images/logo.png";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import { useState } from "react";

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      {/* Left section */}
      <div className="w-1/2 flex items-center justify-center bg-cover relative">
        {/* Background image */}
        <img
          className="w-full h-full object-cover"
          src={restaurant}
          alt="Restaurant Image"
        />

        {/* Black overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-80"></div>

        {/* Quote at bottom */}
        <blockquote className="absolute bottom-10 px-8 mb-10 text-2xl italic text-white">
          &quot;The restaurant business is about creating moments of joy and
          satisfaction for every customer.&quot;
          <br />
          <span className="block m-4 text-[#f6b100]">
            - Founder of EasyOrder
          </span>
        </blockquote>
      </div>

      {/* Right section */}
      <div className="w-1/2 min-h-screen bg-[#1a1a1a] p-10">
        <div className="flex flex-col items-center gap-2">
          <img
            src={logo}
            alt="Logo"
            className="h-14 w-14 border-2 rounded-full p-1"
          />
          <h1 className="text-lg font-semibold text-[#f5f5f5] tracking-wide">
            EasyOrder
          </h1>
        </div>

        <h2 className="text-4xl text-center mt-10 font-semibold text-[#f6b100] mb-10">
          {isRegister ? "Employee Registration" : "Employee Login"}
        </h2>

        {/* components */}
        {isRegister ? <Register /> : <Login />}

        <div className="flex justify-center mt-6">
          <p className="text-sm text-[#ababab]">
            {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
            <a
              onClick={() => setIsRegister(!isRegister)}
              href="#"
              className="text-[#f6b100] font-semibold hover:underline"
            >
              {isRegister ? "Register" : "Login"}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
