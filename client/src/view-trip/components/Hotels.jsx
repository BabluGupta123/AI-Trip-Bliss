import React from "react";
import logo from "../../assets/flight.png";
import { Link } from "react-router-dom";
import HotelCardItem from "./HotelCardItem";

const Hotels = ({ trip }) => {
  const hotels = trip?.tripData?.tripPlan?.hotels || [];

  return (
    <div className="my-10">
      <h2 className="font-bold text-2xl mb-5">Hotel Recommendation</h2>
      <div className="  grid grid-cols-1 md:grid-cols-2 gap-6">
        {hotels.map((item, index) => (
          <HotelCardItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Hotels;
