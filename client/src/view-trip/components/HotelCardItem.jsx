import { Link } from "react-router-dom";
import logo from "../../assets/flight.png";
import { useEffect, useState } from "react";
import { GetPlaceDetails, PHOTO_REF_URL } from "../../service/GlobalAPI";
const HotelCardItem = ({ item }) => {
  const [PhotoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    item && GetPlacePhoto();
  }, [item]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: item?.hotelName,
    };

    const result = await GetPlaceDetails(data).then((resp) => {
      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[2].name
      );
      setPhotoUrl(PhotoUrl);
    });
  };

  return (
    <Link
      to={
        "https://www.google.com/maps/search/?api=1&query=" +
        item?.hotelName +
        ", " +
        item?.hotelAddress
      }
      target="_blank"
    >
      <div
        className="duration-300 transform hover:-translate-y-1 
     hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)] border-gray-300 
      mt-2  max-h-[170px] 
     overflow-hidden hover:scale-103 transition-all p-4 shadow rounded-lg cursor-pointer flex items-center gap-6 bg-white"
      >
        <img
          src={PhotoUrl ? PhotoUrl : logo}
          className="w-24 h-24 object-cover rounded-xl"
        />

        <div className="flex-1">
          <h3 className="font-semibold text-lg">{item?.hotelName}</h3>
          <p className="text-sm text-gray-600">📍 {item?.hotelAddress}</p>
          <div className="flex items-center gap-3 mt-2">
            <span>
              💰
              {item?.currency
                ? ` ${item?.currency} ${item?.pricePerNight}`
                : "Not Available"}
            </span>
            <span>⭐ {item?.rating || "N/A"}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HotelCardItem;
