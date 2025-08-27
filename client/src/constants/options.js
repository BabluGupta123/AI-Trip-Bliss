export const selectTravelesList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A sole traveles in exploration",
    icon: "✈️",
    people: "1",
  },

  {
    id: 2,
    title: "A Couple",
    desc: "Two traveles in tandem",
    icon: "🥂",
    people: "2 people",
  },

  {
    id: 3,
    title: "Family",
    desc: "A group of fun loving adv",
    icon: "🏡",
    people: "3 to 5 people",
  },

  {
    id: 4,
    title: "Friends",
    desc: "A bunch of thrill-seekes",
    icon: "⛵",
    people: "5 to 10 people",
  },
];

export const selectBudgetOptions = [
  {
    id: 1,
    title: "Budget-Friendly",
    desc: "Affordable stays and travel",
    icon: "💸",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Balanced comfort and cost",
    icon: "💰",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Premium experiences & comfort",
    icon: "💎",
  },
];
export const AI_PROMPT =
  'Generate a Travel Plan for Location: {location}, for {totalDays} days for {traveler} with a {budget} budget. \
  The response must be strictly in valid JSON format only — no explanations, no extra text, no markdown. \
  Do not include trailing commas. \
  Structure the JSON as follows: \
  { \
    "tripPlan": { \
      "budgetLevel": "{budget}", \
      "durationDays": {totalDays}, \
      "hotels": [ \
        { \
          "hotelName": "string", \
          "hotelAddress": "string", \
          "pricePerNight": number, \
          "currency": "national currency", \
          "hotelImageUrl": "https://images.unsplash.com/...", \
          "geoCoordinates": {"latitude": number, "longitude": number}, \
          "rating": number, \
          "description": "string" \
        } \
      ], \
      "itinerary": [ \
        { \
          "day": number, \
          "places": [ \
            { \
              "placeName": "string", \
              "placeDetail": "string", \
              "placeImageUrl": "https://images.unsplash.com/...", \
              "geoCoordinates": {"latitude": number, "longitude": number}, \
              "ticketPricing": "string", \
              "rating": number, \
              "timeToTravel": "string", \
              "bestTimeToVisit": "string" \
            } \
          ] \
        } \
      ] \
    } \
  } \
  Ensure the output is 100% valid JSON with correct commas and quotes.';
