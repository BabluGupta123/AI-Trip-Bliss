import React, { useEffect, useState } from "react";
import logo from "../../assets/flight.png";
import { Link } from "react-router-dom";
import { GetPlaceDetails, PHOTO_REF_URL } from "../../service/GlobalApi";

const PlaceCardItem = ({ place }) => {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    place && GetPlacePhoto();
  }, [place]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: place?.placeName,
    };

    const result = await GetPlaceDetails(data).then((resp) => {
      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[1].name
      );
      setPhotoUrl(PhotoUrl);
    });
  };

  return (
    <Link
      to={"https://www.google.com/maps/search/?api=1&query=" + place?.placeName}
      target="_blank"
    >
      <div
        className="border transition-all duration-300 transform hover:-translate-y-1 
     hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)] border-gray-300 
     rounded-xl p-3 mt-2 flex gap-5 max-h-[150px] hover:scale-103
     cursor-pointer overflow-hidden"
      >
        <img
          src={photoUrl ? photoUrl : logo}
          className=" h-[100px] w-[100px] rounded-xl object-cover"
          alt=""
        />

        <div className="">
          <h2 className="text-lg font-medium">{place?.placeName}</h2>

          <p className="text-sm text-gray-500">
            {place?.placeDetail?.length > 106
              ? place.placeDetail.slice(0, 106) + "..."
              : place.placeDetail}
          </p>

          <h2 className="mt-2 ">🕙 {place?.timeToTravel}</h2>
          <h2 className="mt-2 ">🎟️ {place?.ticketPricing}</h2>
        </div>
      </div>
    </Link>
  );
};

export default PlaceCardItem;
