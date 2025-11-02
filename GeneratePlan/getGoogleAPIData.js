const axios = require("axios");

async function getRouteMatrix(userLocation, destinations) {
  // ------------------
  // Config
  // ------------------
  const API_KEY = "AIzaSyBqRMSMiZkBVoWWnhIIQOc0K9HvKKAOGsE";
  const URL =
    "https://routes.googleapis.com/distanceMatrix/v2:computeRouteMatrix";

  // response body
  const res_body = [
    "status",
    "condition",
    "distanceMeters",
    "duration",
    "staticDuration",
    "travelAdvisory.tollInfo",
    "localizedValues.distance",
    "localizedValues.duration",
    "localizedValues.staticDuration",
    "originIndex",
    "destinationIndex",
  ];

  // request header
  const req_header = {
    "Content-Type": "application/json",
    "X-Goog-FieldMask": res_body.join(","),
    "X-Goog-Api-Key": API_KEY,
  };

  // request body
  // req_body by lat, long input
  const req_body = {
    origins: [
      {
        waypoint: {
          location: {
            latLng: {
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            },
          },
        },
      },
    ],
    destinations: destinations.map((d) => ({ waypoint: d.waypoint })),
    travelMode: "TRANSIT",
    languageCode: "th-TH",
    regionCode: "th",
    units: "METRIC",
    extraComputations: ["TOLLS"],
    transitPreferences: {
      allowedTravelModes: ["BUS", "SUBWAY", "LIGHT_RAIL", "TRAIN"],
      routingPreference: "LESS_WALKING",
    },
  };

  // ------------------
  // RUN API
  // ------------------
  return await runAPI(URL, req_body, req_header);
}

async function runAPI(URL, requestBody, requestHeader) {
  try {
    const response = await axios.post(URL, requestBody, {
      headers: requestHeader,
    });
    return response.data;
  } catch (error) {
    console.log(
      "error: ",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

module.exports = {
  getRouteMatrix
};