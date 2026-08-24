window.EV_CONFIG = {
  version: '3.4.0',
  reservePercent: 15,
  stationRadiusKm: 18,
  stationWideRadiusKm: 35,
  stationSamplePoints: 8,
  fuelSamplePoints: 8,
  geocodeDebounce: 350,
  requestTimeoutMs: 9000,
  routeCacheTtlMs: 15*60*1000,
  stationCacheTtlMs: 30*60*1000,
  fuelCacheTtlMs: 30*60*1000,
  recentTripsLimit: 8,
  co2KgPerLiter: 2.31,
  defaults: { kwhPrice: 0.75, gasPrice: 6.88, ethanolPrice: 5.07, startBattery: 80, startFuel: 40 },
  services: {
    geocode: 'https://photon.komoot.io/api/',
    route: 'https://router.project-osrm.org/route/v1/driving/',
    weather: 'https://api.open-meteo.com/v1/forecast',
    overpass: ['https://overpass-api.de/api/interpreter','https://overpass.private.coffee/api/interpreter']
  }
};
