const fs = require("fs");
const path = require("path");

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

module.exports = {
  getPlaceData
};
