import React from "react";
import PlaceCardItem from "./PlaceCardItem";

const PlacesToVisit = ({ trip }) => {
  return (
    <div>
      <h2 className="font-bold text-lg">Places To Visit</h2>

      <div className="">
        {trip?.tripData?.tripPlan?.itinerary?.map((item, index) => (
          <div className="" key={index}>
            <h2 className="font-medium text-lg">Day {item.day}</h2>

            <div className="grid md:grid-cols-2 gap-5 mb-6 ">
              {item.places.map((place, index) => (
                <div key={index} className="">
                  {/* <h2 className="font-medium text-sm text-orange-700">
                    {place?.timeToTravel}
                  </h2> */}
                  <PlaceCardItem place={place}></PlaceCardItem>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacesToVisit;
