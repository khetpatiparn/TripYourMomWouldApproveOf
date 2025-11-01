function generatePlan(budget){
  const list = filterByPlace(budget); // return [list_of_place<filterbyPlace>]
  console.log(list + "555");
}


function filterByPlace(){
  const PlaceDataSet = getPlaceData("csv/PlacesTestDataset.csv"); // return object
  // console.log(PlaceDataSet);
  console.log(PlaceDataSet[0]);

}

function getPlaceData(filename){
  const fs = require("fs");
  const path = require("path");
  try {
    const csvPath = path.join(__dirname, filename);
    const csvData = fs.readFileSync(csvPath, "utf8");
    const lines = csvData.split("\n");
    const places = [];
    
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i]) 
        continue;

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

function main(){
  generatePlan(500);
}

main()