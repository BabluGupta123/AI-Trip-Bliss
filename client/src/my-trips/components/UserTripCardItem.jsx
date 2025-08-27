import React, { useEffect, useState } from "react";
import logo from "../../assets/flight.png";

import { Link } from "react-router-dom";
import { GetPlaceDetails, PHOTO_REF_URL } from "../../service/GlobalApi";

const UserTripCardItem = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const placeName =
      trip?.tripData?.tripPlan?.itinerary?.[0]?.places?.[0]?.placeName ||
      trip?.userSelection?.location?.label;

    if (!placeName) {
      console.warn("No place name found for trip:", trip);
      return;
    }

    try {
      const resp = await GetPlaceDetails({ textQuery: placeName });

      if (!resp.data.places?.length || !resp.data.places[0].photos) {
        console.warn(
          "No photos found for place, using fallback logo:",
          resp.data
        );
        setPhotoUrl(null);
        return;
      }

      const photoName = resp.data.places[0].photos[0].name;
      const PhotoUrl = PHOTO_REF_URL.replace("{NAME}", photoName);
      setPhotoUrl(PhotoUrl);
    } catch (err) {
      console.error(
        "Error fetching place photo:",
        err.response?.data || err.message
      );
    }
  };

  return (
    <Link to={"/view-trip/" + trip?.id}>
      <div
        className="w-[280px] h-[370px] flex flex-col rounded-2xl shadow-md hover:shadow-xl bg-white 
        overflow-hidden transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
      >
        {/* Image */}
        <img
          src={photoUrl ? photoUrl : logo}
          alt="Trip"
          className="object-cover h-[250px] w-full"
        />

        {/* Details */}
        <div className="p-3 flex flex-col items-start text-left w-full">
          <h2 className="font-bold text-lg truncate">
            {trip?.userSelection?.location?.label}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {trip?.userSelection?.noOfDays} Days trip •{" "}
            {trip?.userSelection?.budget} Budget
          </p>
        </div>
      </div>
    </Link>
  );
};

export default UserTripCardItem;
