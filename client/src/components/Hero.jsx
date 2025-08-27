import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="h-[calc(100vh-112px)] ">
      <div className="flex flex-col items-center mx-56 gap-9  ">
        <h1 className="font-extrabold text-[50px] text-center mt-16">
          <span className="text-[#f56551]">
            Discover Your Next Adventure with AI: <br />
          </span>
          Personalized Itineraries at Your Fingertips
        </h1>

        <p className="text-xl text-gray-500 text-center ">
          Your personal trip planner and travel curator, creating custom
          itineraries tailored to your interests and budget.
        </p>

        <button
          onClick={(e) => navigate("/create-trip")}
          className="relative cursor-pointer text-white overflow-hidden px-6 py-3 font-semibold  bg-gray-700 rounded-lg group"
        >
          <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
            Get Started, It's Free
          </span>
          <span className="absolute inset-0 bg-black scale-0 group-hover:scale-100 transition-transform duration-500 origin-center rounded-lg"></span>
        </button>
      </div>
    </div>
  );
};

export default Hero;
