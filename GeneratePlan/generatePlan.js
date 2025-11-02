const axios = require("axios");
  const fs = require("fs");
  const path = require("path");

async function generatePlan(budget, userLocation) {
  // 1. ข้อมูลสถานที่ที่ถูกกรองแล้ว
  const filter1 = filterByPlace(budget); // return [list_of_place]
  // 2. กรองตามค่าเดินทางโดยคร่าวๆ เทียบกับระยะทางและเวลา
  const filter2 = await filterTransitFareEstimate(filter1,userLocation,budget);
  console.log(filter2.length);
}

async function filterTransitFareEstimate(filter1, userLocation, budget) {
  // 1. ขอข้อมูล DataMatrix ทั้งหมดมาก่อน !! ข้อมูลอิงตามตำแหน่งผู้ใช้
  //  1.1. ดึงข้อมูล lattitude, longtitude ของสถานที่ที่ได้จาก filter 1 มาเก็บก่อน
  const destinations = mapDestination(filter1); // 14
  //  1.2. เรียก ComputeRouteMatrix
  // const routeMatrix = await getRouteMatrix(userLocation, destinations);
  // const routeMatirxJson = JSON.stringify(routeMatrix, null, 2);
  const routeMatrixJsonFake = [
    {
      originIndex: 0,
      destinationIndex: 13,
      status: {},
      condition: "ROUTE_NOT_FOUND",
    },
    {
      originIndex: 0,
      destinationIndex: 12,
      status: {},
      distanceMeters: 37293,
      duration: "5023s",
      staticDuration: "5023s",
      travelAdvisory: {
        transitFare: {},
      },
      condition: "ROUTE_EXISTS",
      localizedValues: {
        distance: {
          text: "37.3 กม.",
        },
        duration: {
          text: "1 ชั่วโมง 24 นาที",
        },
        staticDuration: {
          text: "1 ชั่วโมง 24 นาที",
        },
        transitFare: {},
      },
    },
    {
      originIndex: 0,
      destinationIndex: 2,
      status: {},
      distanceMeters: 28696,
      duration: "3881s",
      staticDuration: "3881s",
      travelAdvisory: {
        transitFare: {},
      },
      condition: "ROUTE_EXISTS",
      localizedValues: {
        distance: {
          text: "28.7 กม.",
        },
        duration: {
          text: "1 ชั่วโมง 5 นาที",
        },
        staticDuration: {
          text: "1 ชั่วโมง 5 นาที",
        },
        transitFare: {},
      },
    },
    {
      originIndex: 0,
      destinationIndex: 8,
      status: {},
      distanceMeters: 36817,
      duration: "7969s",
      staticDuration: "7969s",
      travelAdvisory: {
        transitFare: {},
      },
      condition: "ROUTE_EXISTS",
      localizedValues: {
        distance: {
          text: "36.8 กม.",
        },
        duration: {
          text: "2 ชั่วโมง 13 นาที",
        },
        staticDuration: {
          text: "2 ชั่วโมง 13 นาที",
        },
        transitFare: {},
      },
    },
    {
      originIndex: 0,
      destinationIndex: 1,
      status: {},
      distanceMeters: 77750,
      duration: "12485s",
      staticDuration: "12485s",
      travelAdvisory: {
        transitFare: {},
      },
      condition: "ROUTE_EXISTS",
      localizedValues: {
        distance: {
          text: "77.8 กม.",
        },
        duration: {
          text: "3 ชั่วโมง 28 นาที",
        },
        staticDuration: {
          text: "3 ชั่วโมง 28 นาที",
        },
        transitFare: {},
      },
    },
    {
      originIndex: 0,
      destinationIndex: 10,
      status: {},
      distanceMeters: 31373,
      duration: "4477s",
      staticDuration: "4477s",
      travelAdvisory: {
        transitFare: {},
      },
      condition: "ROUTE_EXISTS",
      localizedValues: {
        distance: {
          text: "31.4 กม.",
        },
        duration: {
          text: "1 ชั่วโมง 15 นาที",
        },
        staticDuration: {
          text: "1 ชั่วโมง 15 นาที",
        },
        transitFare: {},
      },
    },
    {
      originIndex: 0,
      destinationIndex: 3,
      status: {},
      distanceMeters: 32997,
      duration: "6646s",
      staticDuration: "6646s",
      travelAdvisory: {
        transitFare: {},
      },
      condition: "ROUTE_EXISTS",
      localizedValues: {
        distance: {
          text: "33.0 กม.",
        },
        duration: {
          text: "1 ชั่วโมง 51 นาที",
        },
        staticDuration: {
          text: "1 ชั่วโมง 51 นาที",
        },
        transitFare: {},
      },
    },
    {
      originIndex: 0,
      destinationIndex: 0,
      status: {},
      distanceMeters: 32597,
      duration: "6949s",
      staticDuration: "6949s",
      travelAdvisory: {
        transitFare: {},
      },
      condition: "ROUTE_EXISTS",
      localizedValues: {
        distance: {
          text: "32.6 กม.",
        },
        duration: {
          text: "1 ชั่วโมง 56 นาที",
        },
        staticDuration: {
          text: "1 ชั่วโมง 56 นาที",
        },
        transitFare: {},
      },
    },
    {
      originIndex: 0,
      destinationIndex: 11,
      status: {},
      distanceMeters: 25343,
      duration: "3488s",
      staticDuration: "3488s",
      travelAdvisory: {
        transitFare: {},
      },
      condition: "ROUTE_EXISTS",
      localizedValues: {
        distance: {
          text: "25.3 กม.",
        },
        duration: {
          text: "58 นาที",
        },
        staticDuration: {
          text: "58 นาที",
        },
        transitFare: {},
      },
    },
    {
      originIndex: 0,
      destinationIndex: 7,
      status: {},
      distanceMeters: 34289,
      duration: "4557s",
      staticDuration: "4557s",
      travelAdvisory: {
        transitFare: {},
      },
      condition: "ROUTE_EXISTS",
      localizedValues: {
        distance: {
          text: "34.3 กม.",
        },
        duration: {
          text: "1 ชั่วโมง 16 นาที",
        },
        staticDuration: {
          text: "1 ชั่วโมง 16 นาที",
        },
        transitFare: {},
      },
    },
    {
      originIndex: 0,
      destinationIndex: 4,
      status: {},
      distanceMeters: 24514,
      duration: "4154s",
      staticDuration: "4154s",
      travelAdvisory: {
        transitFare: {},
      },
      condition: "ROUTE_EXISTS",
      localizedValues: {
        distance: {
          text: "24.5 กม.",
        },
        duration: {
          text: "1 ชั่วโมง 9 นาที",
        },
        staticDuration: {
          text: "1 ชั่วโมง 9 นาที",
        },
        transitFare: {},
      },
    },
    {
      originIndex: 0,
      destinationIndex: 6,
      status: {},
      distanceMeters: 33203,
      duration: "5551s",
      staticDuration: "5551s",
      travelAdvisory: {
        transitFare: {},
      },
      condition: "ROUTE_EXISTS",
      localizedValues: {
        distance: {
          text: "33.2 กม.",
        },
        duration: {
          text: "1 ชั่วโมง 33 นาที",
        },
        staticDuration: {
          text: "1 ชั่วโมง 33 นาที",
        },
        transitFare: {},
      },
    },
    {
      originIndex: 0,
      destinationIndex: 9,
      status: {},
      distanceMeters: 37228,
      duration: "4890s",
      staticDuration: "4890s",
      travelAdvisory: {
        transitFare: {},
      },
      condition: "ROUTE_EXISTS",
      localizedValues: {
        distance: {
          text: "37.2 กม.",
        },
        duration: {
          text: "1 ชั่วโมง 22 นาที",
        },
        staticDuration: {
          text: "1 ชั่วโมง 22 นาที",
        },
        transitFare: {},
      },
    },
    {
      originIndex: 0,
      destinationIndex: 5,
      status: {},
      distanceMeters: 38483,
      duration: "7278s",
      staticDuration: "7278s",
      travelAdvisory: {
        transitFare: {},
      },
      condition: "ROUTE_EXISTS",
      localizedValues: {
        distance: {
          text: "38.5 กม.",
        },
        duration: {
          text: "2 ชั่วโมง 1 นาที",
        },
        staticDuration: {
          text: "2 ชั่วโมง 1 นาที",
        },
        transitFare: {},
      },
    },
  ];

  // 2. กรองสถานที่เทียบกับเวลาโดยคร่าว
  const listEstimate = [];
  for (const route of routeMatrixJsonFake) {
    if (route.condition !== "ROUTE_EXISTS") {
      continue;
    }
    // console.log(route);

    const destIndex = route.destinationIndex;
    const originalPlaceIndex = destinations[destIndex]._sourceIndex;
    const place = filter1[originalPlaceIndex];

    let travelCost = 0;
    if (route.duration) {
      const durationInSeconds = parseInt(route.duration.slice(0, -1), 10);
      travelCost = estimateTravelByCost(durationInSeconds);
    }
    const totalCost = place.startPrice + travelCost;

    if (totalCost <= budget) {
      listEstimate.push({
        ...place,
        travelCost: travelCost,
        totalCost: totalCost,
        travelDurationText: route.localizedValues.duration.text,
        travelDistanceText: route.localizedValues.distance.text,
      });
    }
  }
  return listEstimate;
}

function estimateTravelByCost(placeDuration) {
  if (placeDuration <= 0) return 0;
  if (placeDuration < 3600) return 50; // <= 1 ชม.
  if (placeDuration < 7200) return 80; // 1-2 ชม.
  return 120; // > 2 ชม.
}

function mapDestination(filter1) {
  const destinationList = [];
  filter1.forEach((item, idx) => {
    const lat = parseFloat(item.lattitude);
    const lng = parseFloat(item.longtitude);
    if (Number.isFinite(lat) && Number.isFinite(lng)) {
      destinationList.push({
        waypoint: { location: { latLng: { latitude: lat, longitude: lng } } },
        _sourceIndex: idx,
      });
    }
  });
  return destinationList;
}

async function getRouteMatrix(userLocation, destinations) {
  // ------------------
  // Config
  // ------------------
  const API_KEY = "";
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

function filterByPlace(budget) {
  // กรองรายชื่อสถานที่ตามงบของสถานที่กับงบของผู้ใช้
  const list = [];
  const placeDataSet = getPlaceData("csv/PlacesTestDataset.csv"); // return object of place in array
  for (let i = 0; i < placeDataSet.length; i++) {
    if (placeDataSet[i].startPrice <= budget) {
      list.push(placeDataSet[i]);
    }
  }
  // console.log("list's place filtered by startPrice : ", list);
  return list;
}

function getPlaceData(filename) {
  try {
    const csvPath = path.join(__dirname, filename);
    const csvData = fs.readFileSync(csvPath, "utf8");
    const lines = csvData.split("\n");
    const places = [];

    for (let i = 1; i < lines.length; i++) {
      if (!lines[i]) continue;

      const parts = lines[i].split(",");

      if (parts.length >= 6) {
        places.push({
          placeNo: parts[0].trim(),
          placeName: parts[1].trim(),
          category: parts[2].trim(),
          startPrice: parseInt(parts[3].trim(), 10) || 0,
          lattitude: parts[4].trim(),
          longtitude: parts[5].trim(),
        });
      }
    }

    console.log(`Loaded ${places.length} places from CSV.`);
    return places;
  } catch (error) {
    console.error("Error loading PlacesTestDataset.csv:", error.message);
    return [];
  }
}

async function main() {
  const userLocation = {
    name: "KMITL",
    latitude: 13.73006604771058,
    longitude: 100.77862927082346,
  };

  await generatePlan(500, userLocation);
}

main();
