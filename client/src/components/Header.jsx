import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDialog, setOpenDialog] = useState(false);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Google login response:", tokenResponse);

      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          }
        );

        console.log("User Profile:", res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        setOpenDialog(false);
        window.location.reload();
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    },
    onError: (error) => console.log("Login error:", error),
  });

  const loginHandler = () => {
    if (user) {
      localStorage.clear();
      window.location.href = "/";
    } else {
      login();
    }
  };

  return (
    <div className="px-10 py-5 shadow-sm flex justify-between items-center">
      <a href="/">
        <img className="h-12" src="/logo.svg" alt="Logo" />
      </a>
      <div>
        {user ? (
          <div className="flex gap-7">
            <a href="/my-trips">
              <button className="black text-xl bg-white shadow border border-gray-200 py-2 px-7 font-semibold rounded-3xl cursor-pointer">
                My Trips
              </button>
            </a>

            <button
              onClick={loginHandler}
              className="text-red-500 text-xl bg-white shadow border border-gray-200 py-2 px-7 font-semibold rounded-3xl cursor-pointer"
            >
              Log Out
            </button>
          </div>
        ) : (
          <button
            onClick={loginHandler}
            className="black text-xl bg-white shadow border border-gray-200 py-2 px-7 font-semibold rounded-3xl cursor-pointer"
          >
            Sign in
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
