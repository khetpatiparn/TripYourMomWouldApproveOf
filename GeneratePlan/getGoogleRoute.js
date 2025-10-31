const axios = require("axios");

async function getRoute(start_route, end_route) {
  // ------------------
  // Config
  // ------------------
  const API_KEY = "AIzaSyBvai7Bb6zXvP9X-39PvJb6e_T4qJbbNTU";
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
   */
  const res_body = [
    "routes.legs.steps.navigationInstruction.instructions",
    "routes.legs.steps.transitDetails.stopDetails.arrivalStop.name",
    "routes.legs.steps.transitDetails.stopDetails.departureStop.name",
    "routes.legs.steps.transitDetails.transitLine.name",
    "routes.legs.steps.transitDetails.transitLine.nameShort",
    "routes.legs.steps.transitDetails.transitLine.vehicle.name.text",
    "routes.legs.steps.transitDetails.transitLine.vehicle.type",
    "routes.legs.steps.travelMode",
  ].join(",");

  // request header
  const req_header = {
    "Content-Type": "application/json",
    "X-Goog-FieldMask": res_body,
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

async function main() {
  console.log("กำลังค้นหาเส้นทาง...");

  const route = await getRoute("ซอยเกกีงาม1", "Tierra Studio");

  console.log(JSON.stringify(route, null, 2));
}

main();
