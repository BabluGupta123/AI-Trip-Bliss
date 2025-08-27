import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import { db } from "../service/firebaseConfig";
import UserTripCardItem from "./components/UserTripCardItem";

const MyTrips = () => {
  const navigation = useNavigation();

  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    getUserTrips();
  }, []);

  const getUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigation("/");
      return;
    }

    const q = query(
      collection(db, "AITrips"),
      where("userEmail", "==", user?.email)
    );

    const querySnapshot = await getDocs(q);
    setUserTrips([]);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setUserTrips((prevVal) => [...prevVal, doc.data()]);
    });
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 mt-10">
      {/* Title */}
      <h2 className="font-bold text-3xl mb-8 text-gray-800 border-b-2 border-gray-200 pb-2">
        ✈️ My Trips
      </h2>

      {/* Grid of Trips */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {userTrips.map((trip, index) => (
          <UserTripCardItem key={index + 1} trip={trip} />
        ))}
      </div>
    </div>
  );
};

export default MyTrips;
