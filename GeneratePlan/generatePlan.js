const fs = require("fs");
const {estimateTravelByCost, mapDestination} = require("./helper");
const {getPlaceData} = require("./placeRepo");
const {getRouteMatrix} = require("./getGoogleAPIData");

async function generatePlan(budget, userLocation) {
  // 1. ข้อมูลสถานที่ที่ถูกกรองแล้ว
  const filter1 = filterByPlace(budget); // return [list_of_place]
  // 2. กรองตามค่าเดินทางโดยคร่าวๆ ทำเป็นค่าใช้จ่ายรวมแบบคร่าวๆ
  const filter2 = await filterTransitFareEstimate(filter1,userLocation,budget);
  console.log(filter2.length);
  const genPlanList = filter2;
  console.log(genPlanList);

  try {
    const jsonData = JSON.stringify(genPlanList, null, 2); 
    
    fs.writeFileSync('./genplanList.json', jsonData, 'utf8'); 
    
    console.log('saved');
  } catch (error) {
    console.error('save error:', error);
  }

  return genPlanList;
}

async function filterTransitFareEstimate(filter1, userLocation, budget) {
  // 1. ขอข้อมูล DataMatrix ทั้งหมดมาก่อน !! ข้อมูลอิงตามตำแหน่งผู้ใช้
  //  1.1. ดึงข้อมูล lattitude, longtitude ของสถานที่ที่ได้จาก filter 1 มาเก็บก่อน
  const destinations = mapDestination(filter1); // 14
  //  1.2. เรียก ComputeRouteMatrix
  const routeMatrix = await getRouteMatrix(userLocation, destinations);
  // 2. กรองสถานที่เทียบกับเวลาโดยคร่าว
  const listEstimate = [];
  for (const route of routeMatrix) {
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

module.exports = {
  generatePlan
};
