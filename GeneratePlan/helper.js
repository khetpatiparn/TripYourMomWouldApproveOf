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

module.exports = {
  estimateTravelByCost,
  mapDestination
};