const axios = require("axios");

async function getRoute(start_route, end_route) {
  // ------------------
  // Config
  // ------------------
  const API_KEY = "";
  const URL = "https://routes.googleapis.com/directions/v2:computeRoutes";

  /** response body
   * # routes.legs.steps
   * - navigationInstruction.instructions : คำอธิบายการเดินทาง
   * - travelMode : วิธีเดินทาง
   * # routes.legs.steps.transitDetails : รายละเอียดการเดินทาง
   *  # stopDetails : ข้อมูลจุดขึ้นรถ(departure stop) -> ลงรถ(arrival stop)
   *    - arrivalStop.name : จุดลง
   *    - departureStop.name : จุดขึ้น
   *  # transitLine : ข้อมูลของสายขนส่งที่ใช้
   *    - name/nameShort : ชื่อรถ
   *    - vehicle.type/vehicle.name.text : ประเภทรถ
   *  # routes.localizedValues.transitFare
   */
  const res_body = [
    "routes.legs.startLocation.latLng",
    "routes.legs.endLocation.latLng",
    "routes.legs.steps.navigationInstruction.instructions",
    "routes.legs.steps.transitDetails.stopDetails.arrivalStop.name",
    "routes.legs.steps.transitDetails.stopDetails.departureStop.name",
    "routes.legs.steps.transitDetails.transitLine.name",
    "routes.legs.steps.transitDetails.transitLine.nameShort",
    "routes.legs.steps.transitDetails.transitLine.vehicle.name.text",
    "routes.legs.steps.transitDetails.transitLine.vehicle.type",
    "routes.legs.steps.travelMode",
    "routes.localizedValues.transitFare"
  ];

  // request header
  const req_header = {
    "Content-Type": "application/json",
    "X-Goog-FieldMask": res_body.join(","),
    "X-Goog-Api-Key": API_KEY,
  };

  // request body
  const req_body = {
    origin: {
      address: start_route,
    },
    destination: {
      address: end_route,
    },
    travelMode: "TRANSIT",
    languageCode: "th-TH",
    regionCode: "th",
    units: "METRIC",
    transitPreferences: {
      allowedTravelModes: ["BUS", "SUBWAY", "LIGHT_RAIL", "TRAIN"],
      routingPreference: "LESS_WALKING",
    },
  };

  // ------------------
  // RUN API
  // ------------------
  try {
    const response = await axios.post(URL, req_body, { headers: req_header });
    return response.data;
  } catch (error) {
    console.log(
      "error: ",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

async function getRouteMatrix(origin, ...[destinations]) {
  // ------------------
  // Config
  // ------------------
  const API_KEY = "";
  const URL =
    "https://routes.googleapis.com/distanceMatrix/v2:computeRouteMatrix";

  // response body
  /**
   * status
   * condition
   * distanceMeters
   * staticDuratio
   * travelAdvisory
   *  - tollInfo
   *  - transitFare
   * localizedValues
   *  - distance
   *  - transitFare
   * originIndex
   * destinationIndex
   */
  const res_body = [
    "status",
    "condition",
    "distanceMeters",
    "duration",
    "staticDuration",
    "travelAdvisory.tollInfo",
    "travelAdvisory.transitFare",
    "localizedValues.distance",
    "localizedValues.duration",
    "localizedValues.staticDuration",
    "localizedValues.transitFare",
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
  // const req_body = {
  //   origins: [
  //     {
  //       waypoint: {
  //         location: {
  //           latLng: {
  //             latitude: startLat,
  //             longitude: startLong,
  //           },
  //         },
  //       },
  //     },
  //   ],
  //   destinations: [
  //     {
  //       waypoint: {
  //         location: {
  //           latLng: {
  //             latitude: number,
  //             longitude: number,
  //           },
  //         },
  //       },
  //     },
  //   ],
  //   travelMode: "TRANSIT",
  //   languageCode: "th-TH",
  //   regionCode: "th",
  //   units: "METRIC",
  //   extraComputations: [TOLLS],
  //   transitPreferences: {
  //     allowedTravelModes: ["BUS", "SUBWAY", "LIGHT_RAIL", "TRAIN"],
  //     routingPreference: "LESS_WALKING",
  //   },
  // };
  // req_body by address
  const req_body = {
    origins: [
      {
        waypoint: {
          address: origin,
        },
      },
    ],
    destinations: destinations.map((dest) => ({
      waypoint: {
        address: dest,
      },
    })),
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
  try {
    const response = await axios.post(URL, req_body, { headers: req_header });
    return response.data;
  } catch (error) {
    console.log(
      "error: ",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}

async function main() {

  console.log("กำลังค้นหาเส้นทาง...");

  const route = await getRoute("ซอยเกกีงาม1", "Tierra Studio");
  const origin = "ซอยเกกีงาม1";
  const destinations = [
    "Kheanseexcafe'",
    "Cave Craft Art Studio & Cafe",
    "After the Rain Coffee & Gallery",
    "Thai Glam Studio",
    "ThaiScentๆณฐ้ฆ Aroma Space",
    "SIAM FANTASY",
    "Tingly Thai Cooking School",
    "GUIDA Drip Bar",
    "Sabieng Thai Cooking School",
    "Tierra Studio",
    "SEA LIFE Bangkok Ocean World",
    "The Erawan Museum",
    "Dream World",
    "Pororo Aqua Park Bangkok",
    "Wow Park",
    "Siam Amazing Park",
    "PAร‘PURI Wellness",
    "Yunomori Onsen & Spa",
    "Kaizen Private Onsen and Spa Bangkok",
    "Let's Relax Spa",
    "Safari World",
    "Wat Arun Ratchawararam Ratchawaramahawihan",
    "The Temple of the Emerald Buddha",
    "Wat Saket Ratchawora Mahawihan",
    "Wat Suthat Thep Wararam Ratchaworamahawihan",
    "Wat Benchamabophit Dusitwanaram",
    "Wonderful Pearl Cruise",
    "Dinner Cruise service",
    "Chaophrayacruise",
    "Shushu Chilling Cafe",
    "Candy Cat Cafe",
    "Asok Pethouse Cat Cafe",
    "Catnip house Cat Cafe",
    "Chill Cat Cafe",
  ];
  const routeMatrix = await getRouteMatrix(origin, destinations);

  console.log(JSON.stringify(route, null, 2));
  console.log(JSON.stringify(routeMatrix, null, 2));
}

main();
