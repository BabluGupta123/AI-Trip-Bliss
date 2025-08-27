// Make sure axios is imported
import axios from "axios";

// Base URL for Google Places API
const BASE_URL = "https://places.googleapis.com/v1/places:searchText";

// Config for API requests
const config = {
  headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_PLACE_API,
    "X-Goog-FieldMask": ["places.photos", "places.displayName", "places.id"],
  },
};

// Function to get place details
export const GetPlaceDetails = (data) => axios.post(BASE_URL, data, config);

// Photo URL generator
export const PHOTO_REF_URL =
  "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=2400&maxWidthPx=3000&key=" +
  import.meta.env.VITE_GOOGLE_PLACE_API;
