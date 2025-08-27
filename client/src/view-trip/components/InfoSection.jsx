import React, { useEffect, useState } from "react";
import logo from "../../assets/flight.png";

import { BsSendFill } from "react-icons/bs";
import { GetPlaceDetails, PHOTO_REF_URL } from "../../service/GlobalApi";
// import { GetPlaceDetails, PHOTO_REF_URL } from "../../service/GlobalAPI";

const InfoSection = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    trip && GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.tripData?.tripPlan?.itinerary[0]?.places[0]?.placeName,
    };

    const result = await GetPlaceDetails(data).then((resp) => {
      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[0].name
      );
      setPhotoUrl(PhotoUrl);
    });
  };

  return (
    <div>
      <img
        className="h-[340px] w-full rounded-xl object-cover "
        src={photoUrl ? photoUrl : logo}
        alt=""
      />

      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.location?.label}
          </h2>

          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full ">
              📅 {trip?.userSelection?.noOfDays} Days
            </h2>

            <h2 className="p-1 px-3 bg-gray-200 rounded-full ">
              💰 {trip?.userSelection?.budget} Budget
            </h2>

            <h2 className="p-1 px-3 bg-gray-200 rounded-full ">
              🍷 No. of Traveler : {trip?.userSelection?.traveler}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
