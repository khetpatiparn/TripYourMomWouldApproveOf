
const {generatePlan} = require("./generatePlan");

async function main() {
  const userLocation = {
    latitude: 13.73006604771058,
    longitude: 100.77862927082346,
  };

  await generatePlan(500, userLocation);
}

main();