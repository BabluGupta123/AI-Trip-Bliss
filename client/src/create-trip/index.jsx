import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import axios from "axios";
import {
  AI_PROMPT,
  selectBudgetOptions,
  selectTravelesList,
} from "../constants/options";
import toast from "react-hot-toast";
import { generateTripPlan } from "../service/AIModel";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../components/ui/Dialog";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { db } from "../service/firebaseConfig";
import { useNavigate } from "react-router-dom";

const CreateTrip = () => {
  const [place, setPlace] = useState(false);
  const [formData, setFormData] = useState([]);
  const [openDailog, setOpenDialog] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => {
      console.log("Google login response:", codeResp);
      GetUserProfile(codeResp);
      localStorage.setItem("user", JSON.stringify(codeResp.data));
      openDailog(false);
      onGenerateTrip();
    },
    onError: (error) => console.log("Login error:", error),
  });

  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (user) console.log("hello");

    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (
      (formData?.noOfDays > 6 && !formData?.location) ||
      !formData?.budget ||
      !formData?.traveler
    ) {
      toast.error("Please fill all details");
      return;
    }

    try {
      setLoading(true);

      const FINAL_PROMPT = AI_PROMPT.replace(
        "{location}",
        formData?.location.label
      )
        .replace("{totalDays}", formData?.noOfDays)
        .replace("{traveler}", formData.traveler)
        .replace("{budget}", formData.budget);

      console.log(FINAL_PROMPT);

      const result = await generateTripPlan(FINAL_PROMPT);
      console.log(result);

      await SaveAiTrip(result); // wait until Firestore save completes
    } catch (err) {
      console.error("Error generating trip:", err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false); // ✅ stop spinner after everything is finished
    }
  };

  const SaveAiTrip = async (TripData) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!user?.email) {
      console.error("No valid user found");
      return;
    }

    const docId = Date.now().toString();

    const cleanedTripData = TripData.replace(/```json|```/g, "").trim();

    await setDoc(doc(db, "AITrips", docId), {
      // clean AI response

      userSelection: formData,
      tripData: JSON.parse(cleanedTripData),
      userEmail: user.email,
      id: docId,
    });

    console.log("Trip saved successfully 🚀");

    navigate("/view-trip/" + docId);
  };

  const GetUserProfile = async (tokenInfo) => {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/oauth2/v1/userinfo",
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      );

      // 👇 This will log the user info (id, email, name, picture)
      console.log("User Info:", response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      setOpenDialog(false);
      onGenerateTrip();

      return response.data; // optional if you want to use it elsewhere
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">
        Tell us your travel preferences 🏕️🌴
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      <div>
        <div className="mt-20 flex flex-col gap-10 ">
          <div>
            <h2 className="text-xl my-3 font-medium">
              What is your destination of choice?
            </h2>

            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API}
              selectProps={{
                place,
                onChange: (v) => {
                  setPlace(v);
                  handleInputChange("location", v);
                },
              }}
            />
          </div>

          <div>
            <h2 className="text-xl my-3 font-medium">
              How many days are you planning your trip?
            </h2>
            <input
              type="number"
              className="border border-gray-300 outline-blue-500 w-full py-2 px-2 rounded "
              placeholder="Ex.3"
              onChange={(e) => handleInputChange("noOfDays", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="mt-15">
        <h2 className="text-xl my-3 font-medium">What is Your Budget?</h2>

        <div className="grid grid-cols-3 gap-5 mt-5">
          {selectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={(e) => handleInputChange("budget", item.title)}
              className={`p-4 cursor-pointer border border-gray-200  shadow rounded-lg transition transform duration-200 hover:scale-105
                  ${
                    formData?.budget == item.title && "border border-gray-400"
                  }`}
            >
              <h2 className="text-4xl  ">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-15">
        <h2 className="text-xl my-3 font-medium">
          Who do you plan on traveling with on your next adventure?
        </h2>

        <div className="grid grid-cols-3 gap-5 mt-5">
          {selectTravelesList.map((item, index) => (
            <div
              key={index}
              onClick={(e) => handleInputChange("traveler", item.people)}
              className={`p-4 cursor-pointer border border-gray-200  shadow rounded-lg transition transform duration-200 hover:scale-105
                  ${
                    formData?.traveler == item.people &&
                    "border border-gray-400"
                  }`}
            >
              <h2 className="text-4xl ">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="my-10 justify-end flex">
        <button
          disabled={loading}
          onClick={onGenerateTrip}
          className="bg-black text-white px-2 py-2 rounded cursor-pointer"
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </button>
      </div>

      <Dialog open={openDailog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <img className="mb-4" src={"/logo.svg"} alt="" />

            <DialogTitle>Sign In With Google</DialogTitle>
            <DialogDescription>
              Sign in to the App with Google authentication
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button
              onClick={login}
              className="bg-black items-center flex gap-2 justify-center  text-white w-full py-1 rounded-lg"
            >
              <FcGoogle className="h-7 w-7 my-auto" />
              Sign In with Google
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTrip;
