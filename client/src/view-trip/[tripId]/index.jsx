import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { db } from "../../service/firebaseConfig";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import PlacesToVisit from "../components/PlacesToVisit";
import Footer from "../components/Footer";

const Viewtrip = () => {
  const [trip, setTrip] = useState(null); // ✅ object instead of array
  const { tripId } = useParams();

  useEffect(() => {
    tripId && GetTripData();
  }, [tripId]);

  const GetTripData = async () => {
    try {
      const docRef = doc(db, "AITrips", tripId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log("Fetched Trip:", data);
        setTrip(data);
      } else {
        console.log("No such document");
        toast.error("No trip found");
      }
    } catch (error) {
      console.error("Error fetching trip:", error);
      toast.error("Failed to fetch trip");
    }
  };

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      {/* Information */}
      {trip && <InfoSection trip={trip} />}

      {/* Recommended Hotels */}
      {trip && <Hotels trip={trip} />}

      {/* Daily Plan */}
      <PlacesToVisit trip={trip}></PlacesToVisit>
      {/* Footer */}
      <Footer trip={trip}></Footer>
    </div>
  );
};

export default Viewtrip;
