/* ==========================================================================
   EV PLANNER PRO - CORE ENGINE (app.js)
   Base Enriquecida de Eletropostos Reais (Corredor BR-101 Recife/JP)
   ========================================================================== */

const ufMap = {
  "Acre": "AC", "Alagoas": "AL", "Amapá": "AP", "Amazonas": "AM", "Bahia": "BA",
  "Ceará": "CE", "Distrito Federal": "DF", "Espírito Santo": "ES", "Goiás": "GO",
  "Maranhão": "MA", "Mato Grosso": "MT", "Mato Grosso do Sul": "MS", "Minas Gerais": "MG",
  "Pará": "PA", "Paraíba": "PB", "Paraná": "PR", "Pernambuco": "PE", "Piauí": "PI",
  "Rio de Janeiro": "RJ", "Rio Grande do Norte": "RN", "Rio Grande do Sul": "RS",
  "Rondônia": "RO", "Roraima": "RR", "Santa Catarina": "SC", "São Paulo": "SP",
  "Sergipe": "SE", "Tocantins": "TO"
};

// Banco de Veículos NATIVO
const defaultEvDatabase = {
  "BYD": [
    { model: 'Dolphin Mini (4 Lugares)', type: 'BEV (100% Elétrico)', battery: 38.0, range: 280, consumption: 13.5, isHybrid: false },
    { model: 'Dolphin Mini (5 Lugares)', type: 'BEV (100% Elétrico)', battery: 38.0, range: 280, consumption: 13.5, isHybrid: false },
    { model: 'Dolphin GS', type: 'BEV (100% Elétrico)', battery: 44.9, range: 291, consumption: 15.4, isHybrid: false },
    { model: 'Dolphin Plus', type: 'BEV (100% Elétrico)', battery: 60.4, range: 330, consumption: 18.3, isHybrid: false },
    { model: 'Atto 2 / Yuan Up', type: 'BEV (100% Elétrico)', battery: 45.1, range: 260, consumption: 17.3, isHybrid: false },
    { model: 'Yuan Pro', type: 'BEV (100% Elétrico)', battery: 45.1, range: 250, consumption: 18.0, isHybrid: false },
    { model: 'Yuan Plus EV500', type: 'BEV (100% Elétrico)', battery: 60.5, range: 294, consumption: 20.5, isHybrid: false },
    { model: 'Seal AWD Performance', type: 'BEV (100% Elétrico)', battery: 82.5, range: 372, consumption: 22.1, isHybrid: false },
    { model: 'Sealion 7 AWD', type: 'BEV (100% Elétrico)', battery: 82.5, range: 380, consumption: 21.7, isHybrid: false },
    { model: 'King DM-i GL', type: 'PHEV (Híbrido Plug-in)', battery: 8.3, range: 55, consumption: 15.1, isHybrid: true, gasKm: 25.6, ethanolKm: 18.0 },
    { model: 'King DM-i GS', type: 'PHEV (Híbrido Plug-in)', battery: 18.3, range: 120, consumption: 15.2, isHybrid: true, gasKm: 25.6, ethanolKm: 18.0 },
    { model: 'Song Pro DM-i GL', type: 'PHEV (Híbrido Plug-in)', battery: 12.9, range: 71, consumption: 18.1, isHybrid: true, gasKm: 22.7, ethanolKm: 15.8 },
    { model: 'Song Pro DM-i GS', type: 'PHEV (Híbrido Plug-in)', battery: 18.3, range: 110, consumption: 16.6, isHybrid: true, gasKm: 22.7, ethanolKm: 15.8 },
    { model: 'Song Plus DM-i', type: 'PHEV (Híbrido Plug-in)', battery: 18.3, range: 105, consumption: 17.4, isHybrid: true, gasKm: 21.5, ethanolKm: 15.1 },
    { model: 'Han EV AWD', type: 'BEV (100% Elétrico)', battery: 85.4, range: 349, consumption: 24.4, isHybrid: false },
    { model: 'Tan EV AWD', type: 'BEV (100% Elétrico)', battery: 108.8, range: 430, consumption: 25.3, isHybrid: false },
    { model: 'Shark Pickup', type: 'PHEV (Híbrido Plug-in)', battery: 29.5, range: 100, consumption: 29.5, isHybrid: true, gasKm: 14.2, ethanolKm: 9.8 }
  ],
  "GWM & Ora": [
    { model: 'Ora 03 Skin', type: 'BEV (100% Elétrico)', battery: 48.0, range: 232, consumption: 20.6, isHybrid: false },
    { model: 'Ora 03 GT', type: 'BEV (100% Elétrico)', battery: 63.0, range: 319, consumption: 19.7, isHybrid: false },
    { model: 'Haval H6 HEV', type: 'HEV (Híbrido Convencional)', battery: 1.6, range: 25, consumption: 6.4, isHybrid: true, gasKm: 13.8, ethanolKm: 9.8 },
    { model: 'Haval H6 PHEV19', type: 'PHEV (Híbrido Plug-in)', battery: 19.0, range: 115, consumption: 16.5, isHybrid: true, gasKm: 28.7, ethanolKm: 20.1 },
    { model: 'Haval H6 PHEV34', type: 'PHEV (Híbrido Plug-in)', battery: 34.0, range: 170, consumption: 20.0, isHybrid: true, gasKm: 28.7, ethanolKm: 20.1 }
  ],
  "Volvo": [
    { model: 'EX30 Core Single', type: 'BEV (100% Elétrico)', battery: 51.0, range: 250, consumption: 20.4, isHybrid: false },
    { model: 'EX30 Extended Range', type: 'BEV (100% Elétrico)', battery: 69.0, range: 340, consumption: 20.2, isHybrid: false },
    { model: 'XC40 Recharge', type: 'BEV (100% Elétrico)', battery: 78.0, range: 305, consumption: 25.5, isHybrid: false },
    { model: 'XC60 Recharge T8', type: 'PHEV (Híbrido Plug-in)', battery: 18.8, range: 78, consumption: 24.1, isHybrid: true, gasKm: 26.7, ethanolKm: 18.5 }
  ],
  "BMW": [
    { model: 'iX1 eDrive20', type: 'BEV (100% Elétrico)', battery: 64.7, range: 303, consumption: 21.3, isHybrid: false },
    { model: 'i4 eDrive40', type: 'BEV (100% Elétrico)', battery: 80.7, range: 420, consumption: 19.2, isHybrid: false },
    { model: 'iX xDrive50', type: 'BEV (100% Elétrico)', battery: 105.2, range: 520, consumption: 20.2, isHybrid: false }
  ]
};

// Base Real e Detalhada dos Eletropostos (Enfoque BR-101 PE/PB + Principais Rodovias)
const manualStationsDatabase = [
  // --- Trecho Recife / Igarassu / Goiana / Pedras de Fogo / João Pessoa (BR-101 Norte) ---
  { name: "Shell Recharge - Posto Milagres", network: "Shell Recharge", cityState: "Recife / PE", lat: -8.0321, lng: -34.9125, powerKw: 150, plugType: "CCS2 High Power", power: "CCS2 Ultra-Rápido DC (150kW)", type: "DC", operationalStatus: "Disponível" },
  { name: "Volvo Recharge - Shopping Tacaruna", network: "Volvo Recharge", cityState: "Recife / PE", lat: -8.0382, lng: -34.8724, powerKw: 50, plugType: "CCS2 / Type 2", power: "CCS2 Rápido DC (50kW)", type: "DC", operationalStatus: "Disponível" },
  { name: "Neoenergia - Posto Pichilau BR-101", network: "Neoenergia Corredor", cityState: "Igarassu / PE", lat: -7.8341, lng: -34.9082, powerKw: 50, plugType: "CCS2 / CHAdeMO", power: "CCS2 Rápido DC (50kW)", type: "DC", operationalStatus: "Disponível" },
  { name: "Planeta Charger - Rei das Coxinhas", network: "Planeta Charger", cityState: "Pedras de Fogo / PB", lat: -7.3957, lng: -34.9552, powerKw: 60, plugType: "CCS2 / Type 2", power: "CCS2 Ultra-Rápido DC (60kW)", type: "DC", operationalStatus: "Disponível" },
  { name: "EZVolt - Posto Alvorada BR-101", network: "EZVolt", cityState: "Goiana / PE", lat: -7.5612, lng: -34.9981, powerKw: 50, plugType: "CCS2", power: "CCS2 Rápido DC (50kW)", type: "DC", operationalStatus: "Disponível" },
  { name: "Zletric - Posto Carne de Vaca BR-101", network: "Zletric", cityState: "Goiana / PE", lat: -7.5102, lng: -34.9815, powerKw: 60, plugType: "CCS2 Combo", power: "CCS2 Ultra-Rápido DC (60kW)", type: "DC", operationalStatus: "Disponível" },
  { name: "Eletroposto BR-101 - Caaporã", network: "Neoenergia Corredor", cityState: "Caaporã / PB", lat: -7.4215, lng: -34.9102, powerKw: 50, plugType: "CCS2", power: "CCS2 Rápido DC (50kW)", type: "DC", operationalStatus: "Disponível" },
  { name: "Shell Recharge - Posto Via Sul BR-101", network: "Shell Recharge", cityState: "Conde / PB", lat: -7.2581, lng: -34.8912, powerKw: 150, plugType: "CCS2 High Power", power: "CCS2 Ultra-Rápido DC (150kW)", type: "DC", operationalStatus: "Disponível" },
  { name: "Manaíra Shopping - Hub Zletric", network: "Zletric", cityState: "João Pessoa / PB", lat: -7.0984, lng: -34.8391, powerKw: 60, plugType: "CCS2 / Type 2", power: "CCS2 Ultra-Rápido DC (60kW)", type: "DC", operationalStatus: "Disponível" },
  { name: "Volvo Recharge - Mangabeira Shopping", network: "Volvo Recharge", cityState: "João Pessoa / PB", lat: -7.1610, lng: -34.8361, powerKw: 50, plugType: "CCS2", power: "CCS2 Rápido DC (50kW)", type: "DC", operationalStatus: "Disponível" },
  
  // --- Trecho Gravatá / Caruaru / Maceió / Aracaju / Salvador / SP ---
  { name: "Planeta Charger - Rei das Coxinhas", network: "Planeta Charger", cityState: "Gravatá / PE", lat: -8.1888, lng: -35.5069, powerKw: 120, plugType: "CCS2 / Type 2", power: "CCS2 Ultra-Rápido DC (120kW)", type: "DC", operationalStatus: "Disponível" },
  { name: "Eletroposto BR-101", network: "Eletrobras", cityState: "Maceió / AL", lat: -9.6658, lng: -35.7353, powerKw: 50, plugType: "CCS2 / CHAdeMO", power: "CCS2 Rápido DC (50kW)", type: "DC", operationalStatus: "Disponível" },
  { name: "Shell Recharge Center", network: "Shell Recharge", cityState: "Aracaju / SE", lat: -10.9472, lng: -37.0731, powerKw: 150, plugType: "CCS2 High Power", power: "CCS2 Ultra-Rápido DC (150kW)", type: "DC", operationalStatus: "Disponível" },
  { name: "Eletroposto BR-324", network: "EZVolt", cityState: "Salvador / BA", lat: -12.9714, lng: -38.5014, powerKw: 150, plugType: "CCS2", power: "CCS2 Ultra-Rápido DC (150kW)", type: "DC", operationalStatus: "Disponível" },
  { name: "Eletroposto BR-116", network: "Zletric", cityState: "Feira de Santana / BA", lat: -12.2664, lng: -38.9663, powerKw: 50, plugType: "CCS2", power: "CCS2 Rápido DC (50kW)", type: "DC", operationalStatus: "Disponível" },
  { name: "Hub Vitória da Conquista", network: "Raízen Power", cityState: "Vitória da Conquista / BA", lat: -14.8661, lng: -40.8394, powerKw: 120, plugType: "CCS2 Ultra", power: "CCS2 Ultra-Rápido DC (120kW)", type: "DC", operationalStatus: "Disponível" },
  { name: "Hub Fernão Dias / BR-381", network: "Zletric", cityState: "Belo Horizonte / MG", lat: -19.9167, lng: -43.9345, powerKw: 150, plugType: "CCS2", power: "CCS2 Ultra-Rápido DC (150kW)", type: "DC", operationalStatus: "Disponível" },
  { name: "Graal 56 Anhanguera", network: "Graal / EDP", cityState: "Jundiaí / SP", lat: -23.1864, lng: -46.8842, powerKw: 150, plugType: "CCS2 Ultra Fast", power: "CCS2 Ultra-Rápido DC (150kW)", type: "DC", operationalStatus: "Disponível" }
];

let map;
let waypoints = [];
let waypointMarkers = [];
let selectedCar = null;
let stationMarkers = [];
let fetchedStations = [];
let currentPolyline = null;
let isochronePolygon = null;
let activeRouteData = null;
let evDatabase = defaultEvDatabase;

let currentTripStats = {
  totalKm: 0,
  savings: 0,
  co2Saved: 0,
  tripsCount: 0
};

async function initMap() {
  map = L.map('map').setView([-8.0476, -34.8770], 8);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);

  await loadVehicles();
  initUserFavorites();
  initRouteControls();
  initDefaultDepartureDate();
  initBatteryValidation();
  initExtraButtonsAndModals();
  loadEsgStats();

  waypoints = [
    { address: "", coords: null, type: "origin", label: "Origem" },
    { address: "", coords: null, type: "destination", label: "Destino 1" }
  ];
  renderWaypointsInputs();
}

async function loadVehicles() {
  try {
    const response = await fetch('vehicles.json');
    if (response.ok) {
      const externalData = await response.json();
      if (externalData && Object.keys(externalData).length > 0) {
        evDatabase = externalData;
      }
    }
  } catch (error) {
    console.warn("Utilizando banco de veículos nativo.");
  } finally {
    initVehicleSelectors();
  }
}

function initVehicleSelectors() {
  const brandSelect = document.getElementById('brandSelect');
  const modelSelect = document.getElementById('modelSelect');
  if (!brandSelect || !modelSelect) return;

  brandSelect.innerHTML = '<option value="">Selecione a marca...</option>';
  Object.keys(evDatabase).sort().forEach(brand => {
    const option = document.createElement('option');
    option.value = brand;
    option.textContent = brand;
    brandSelect.appendChild(option);
  });

  brandSelect.addEventListener('change', (e) => {
    const brand = e.target.value;
    modelSelect.innerHTML = '<option value="">Selecione modelo...</option>';
    if (!brand) { modelSelect.disabled = true; return; }
    modelSelect.disabled = false;
    
    if (evDatabase[brand]) {
      evDatabase[brand].forEach((car, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${car.model} (${car.type ? car.type.split(' ')[0] : 'EV'})`;
        modelSelect.appendChild(option);
      });
    }
  });

  modelSelect.addEventListener('change', (e) => {
    const brand = brandSelect.value;
    const index = e.target.value;
    if (brand && index !== "" && evDatabase[brand]) {
      selectedCar = evDatabase[brand][index];
      updateCarSpecsUI();
    }
  });

  if (evDatabase["BYD"]) {
    brandSelect.value = "BYD";
    brandSelect.dispatchEvent(new Event('change'));
    modelSelect.value = "2";
    modelSelect.dispatchEvent(new Event('change'));
  }
}

function updateCarSpecsUI() {
  if (!selectedCar) return;
  const specType = document.getElementById('specType');
  const specBattery = document.getElementById('specBattery');
  const specRange = document.getElementById('specRange');
  const specConsumption = document.getElementById('specConsumption');

  if (specType) specType.innerText = selectedCar.type || '-';
  if (specBattery) specBattery.innerText = `${selectedCar.battery || '-'} kWh`;
  if (specRange) specRange.innerText = `${selectedCar.range || '-'} km`;
  if (specConsumption) specConsumption.innerText = `${selectedCar.consumption || '-'} kWh/100km`;

  const fuelContainer = document.getElementById('fuelContainer');
  const hybridWrapper = document.getElementById('hybridConsumptionWrapper');
  if (selectedCar.isHybrid) {
    if (fuelContainer) fuelContainer.classList.remove('hidden');
    if (hybridWrapper) hybridWrapper.classList.remove('hidden');
  } else {
    if (fuelContainer) fuelContainer.classList.add('hidden');
    if (hybridWrapper) hybridWrapper.classList.add('hidden');
  }
}

function initBatteryValidation() {
  const input = document.getElementById('startBattery');
  if (!input) return;
  input.addEventListener('input', () => {
    let val = parseInt(input.value);
    if (isNaN(val)) return;
    if (val < 0) input.value = 0;
    if (val > 100) input.value = 100;
  });
}

function initDefaultDepartureDate() {
  const dateInput = document.getElementById('departureDate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
  }
}

function initUserFavorites() {
  const setHomeBtn = document.getElementById('setHomeBtn');
  if (setHomeBtn) {
    setHomeBtn.addEventListener('click', () => {
      const newHome = prompt("Defina seu endereço de Casa:");
      if (newHome !== null) {
        if (newHome.trim() === "") {
          localStorage.removeItem('hv_home_address');
          if (waypoints.length > 0 && waypoints[0].label === "Origem") {
            waypoints[0].address = "";
            waypoints[0].coords = null;
            renderWaypointsInputs();
            updateWaypointMarkers();
          }
        } else {
          localStorage.setItem('hv_home_address', newHome);
          askTargetWaypointAndSet(newHome);
        }
      }
    });
  }

  const setWorkBtn = document.getElementById('setWorkBtn');
  if (setWorkBtn) {
    setWorkBtn.addEventListener('click', () => {
      const work = localStorage.getItem('hv_work_address');
      if (work) {
        askTargetWaypointAndSet(work);
      } else {
        const newWork = prompt("Digite seu endereço de Trabalho:");
        if (newWork) {
          localStorage.setItem('hv_work_address', newWork);
          askTargetWaypointAndSet(newWork);
        }
      }
    });
  }
}

function askTargetWaypointAndSet(addressStr) {
  if (waypoints.length > 0) {
    waypoints[0].address = addressStr;
    renderWaypointsInputs();
    geocodeFast(addressStr).then(c => { waypoints[0].coords = c; updateWaypointMarkers(); });
  }
}

function initRouteControls() {
  const addDestBtn = document.getElementById('addDestinationBtn');
  if (addDestBtn) {
    addDestBtn.addEventListener('click', () => {
      const destCount = waypoints.filter(w => w.type === 'destination').length + 1;
      waypoints.push({ address: "", coords: null, type: "destination", label: `Destino ${destCount}` });
      renderWaypointsInputs();
    });
  }

  const addWpBtn = document.getElementById('addWaypointBtn');
  if (addWpBtn) {
    addWpBtn.addEventListener('click', () => {
      const stopCount = waypoints.filter(w => w.type === 'stop').length + 1;
      waypoints.push({ address: "", coords: null, type: "stop", label: `Parada ${stopCount}` });
      renderWaypointsInputs();
    });
  }

  const calcBtn = document.getElementById('calcBtn');
  if (calcBtn) {
    calcBtn.addEventListener('click', calculateMultiRoute);
  }
}

function renderWaypointsInputs() {
  const container = document.getElementById('routeWaypointsContainer');
  if (!container) return;
  container.innerHTML = '';
  
  waypoints.forEach((wp, index) => {
    const div = document.createElement('div');
    div.className = "waypoint-item relative bg-[#020b29] p-2 rounded-lg border border-blue-900 space-y-1";
    
    let badgeColor = "text-emerald-400";
    if (wp.type === 'destination') badgeColor = "text-sky-400";
    if (wp.type === 'stop') badgeColor = "text-amber-400";

    div.innerHTML = `
      <div class="flex justify-between items-center text-[11px] mb-1">
        <span class="font-bold ${badgeColor}">${wp.label}</span>
        ${index > 0 ? `<button onclick="removeWaypoint(${index})" class="text-red-400 hover:text-red-300 font-bold px-1">✕ Remover</button>` : ''}
      </div>
      <input type="text" id="wpInput_${index}" value="${wp.address}" 
             class="w-full bg-[#031038] border border-blue-800 rounded p-1.5 text-white text-xs outline-none" 
             placeholder="Ex: Rua, número, bairro, cidade, estado" autocomplete="off">
      <div id="wpResults_${index}" class="autocomplete-results hidden"></div>
    `;
    container.appendChild(div);
    setupFastAutocomplete(`wpInput_${index}`, `wpResults_${index}`, (coords, addressStr) => {
      waypoints[index].coords = coords;
      waypoints[index].address = addressStr;
      updateWaypointMarkers();
    }, index);
  });
}

function removeWaypoint(index) {
  if (index > 0) {
    waypoints.splice(index, 1);
    renderWaypointsInputs();
    updateWaypointMarkers();
  }
}

function setupFastAutocomplete(inputId, resultsId, callback, index) {
  const input = document.getElementById(inputId);
  const results = document.getElementById(resultsId);
  if (!input || !results) return;

  input.addEventListener('input', async () => {
    waypoints[index].address = input.value;
    const query = input.value.trim();
    if (query.length < 2) { results.classList.add('hidden'); return; }
    try {
      const res = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=5`);
      const data = await res.json();
      results.innerHTML = '';
      if (data && data.features) {
        data.features.forEach(f => {
          const p = f.properties;
          const coords = [f.geometry.coordinates[1], f.geometry.coordinates[0]];
          const full = `${p.name || ''}, ${p.city || ''} - ${p.state || ''}`;
          const div = document.createElement('div');
          div.className = 'autocomplete-item';
          div.innerHTML = `<span>📍 ${full}</span>`;
          div.onclick = () => { input.value = full; results.classList.add('hidden'); callback(coords, full); };
          results.appendChild(div);
        });
        results.classList.remove('hidden');
      }
    } catch (e) { results.classList.add('hidden'); }
  });
}

async function geocodeFast(addressStr) {
  try {
    const res = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(addressStr)}&limit=1`);
    const data = await res.json();
    if (data && data.features && data.features.length > 0) return [data.features[0].geometry.coordinates[1], data.features[0].geometry.coordinates[0]];
  } catch (e) {}
  return null;
}

async function updateWaypointMarkers() {
  waypointMarkers.forEach(m => map.removeLayer(m));
  waypointMarkers = [];
  for (let i = 0; i < waypoints.length; i++) {
    if (!waypoints[i].coords && waypoints[i].address) waypoints[i].coords = await geocodeFast(waypoints[i].address);
    if (waypoints[i].coords) waypointMarkers.push(L.marker(waypoints[i].coords).addTo(map));
  }
}

function getMinDistanceToRouteInKm(lat, lng, routeCoords) {
  let minDistance = Infinity;
  let closestPointIndex = 0;
  let accumulatedDist = 0;
  const step = Math.max(1, Math.floor(routeCoords.length / 250));

  for (let i = 0; i < routeCoords.length - step; i += step) {
    const ptA = L.latLng(routeCoords[i][1], routeCoords[i][0]);
    if (i > 0) {
      accumulatedDist += ptA.distanceTo(L.latLng(routeCoords[i - step][1], routeCoords[i - step][0])) / 1000;
    }
    const d = L.latLng(lat, lng).distanceTo(ptA) / 1000;
    if (d < minDistance) {
      minDistance = d;
      closestPointIndex = accumulatedDist;
    }
  }
  return { minDistance, routeKm: Math.round(closestPointIndex) };
}

async function fetchRouteStationsFromOSM(routeGeometry) {
  const countLabel = document.getElementById('stationsCount');
  if (countLabel) countLabel.innerText = "Mapeando eletropostos (PlugShare / ABRP)...";
  
  const routeCoords = routeGeometry.coordinates;
  const uniqueMap = new Map();

  // 1. Postos manuais de rodovia de alta prioridade (Corredor BR-101 e adicionais)
  for (const mStation of manualStationsDatabase) {
    const routeMatch = getMinDistanceToRouteInKm(mStation.lat, mStation.lng, routeCoords);
    if (routeMatch.minDistance <= 35) {
      uniqueMap.set(`${mStation.lat.toFixed(3)}_${mStation.lng.toFixed(3)}`, {
        id: `manual_${Math.random()}`,
        name: mStation.name,
        network: mStation.network || "Rede Rodoviária",
        cityState: mStation.cityState,
        lat: mStation.lat,
        lng: mStation.lng,
        powerKw: mStation.powerKw || 50,
        plugType: mStation.plugType || "CCS2",
        power: mStation.power,
        type: mStation.type,
        distToRoute: routeMatch.minDistance,
        routeKm: routeMatch.routeKm,
        operationalStatus: mStation.operationalStatus
      });
    }
  }

  // 2. Coleta direcionada por amostra com filtro ampliado no OSM
  const samplePoints = [];
  const numSamples = Math.min(8, Math.max(2, Math.floor(routeCoords.length / 150)));
  const step = Math.floor(routeCoords.length / numSamples);

  for (let i = 0; i < routeCoords.length; i += step) {
    samplePoints.push(routeCoords[i]);
  }

  const queryPromises = samplePoints.map(async (pt) => {
    const lat = pt[1];
    const lng = pt[0];
    const bbox = `${lat - 0.6},${lng - 0.6},${lat + 0.6},${lng + 0.6}`;

    const query = `[out:json][timeout:6];
    (
      node["amenity"="charging_station"](${bbox});
      node["amenity"="ev_charging"](${bbox});
    );
    out body 40;`;

    try {
      const res = await fetch('https://overpass-api.de/api/interpreter', { method: 'POST', body: query });
      if (res.ok) {
        const data = await res.json();
        if (data && data.elements) {
          for (const item of data.elements) {
            const elLat = item.lat;
            const elLng = item.lon;
            if (!elLat || !elLng) continue;
            const key = `${elLat.toFixed(3)}_${elLng.toFixed(3)}`;
            if (uniqueMap.has(key)) continue;

            const routeMatch = getMinDistanceToRouteInKm(elLat, elLng, routeCoords);
            if (routeMatch.minDistance <= 20) {
              const tags = item.tags || {};
              const name = tags.name || tags.operator || tags.brand || `Eletroposto BR-101`;
              const network = tags.operator || tags.brand || "Rede Aberta";
              const isDC = tags['socket:ccs'] || tags['socket:type2_combo'] || (tags.description && tags.description.toLowerCase().includes('dc'));
              const powerKw = isDC ? 60 : 22;

              uniqueMap.set(key, {
                id: item.id,
                name: name,
                network: network,
                cityState: `Rodovia BR (${elLat.toFixed(2)}, ${elLng.toFixed(2)})`,
                lat: elLat,
                lng: elLng,
                powerKw: powerKw,
                plugType: isDC ? "CCS2 Combo" : "Tipo 2 AC",
                power: isDC ? `CCS2 DC (${powerKw}kW)` : `AC Wallbox (${powerKw}kW)`,
                type: isDC ? 'DC' : 'AC',
                distToRoute: routeMatch.minDistance,
                routeKm: routeMatch.routeKm,
                operationalStatus: "Disponível"
              });
            }
          }
        }
      }
    } catch (err) {}
  });

  await Promise.all(queryPromises);

  const rawStations = Array.from(uniqueMap.values());
  rawStations.sort((a, b) => a.routeKm - b.routeKm);
  fetchedStations = rawStations;
}

function renderStationsOnMapAndTable(totalDistKm, initialRangeKm) {
  stationMarkers.forEach(m => map.removeLayer(m));
  stationMarkers = [];

  const tbody = document.getElementById('stationsTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  const countLabel = document.getElementById('stationsCount');
  if (countLabel) countLabel.innerText = `${fetchedStations.length} eletropostos mapeados`;

  if (fetchedStations.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="p-3 text-center text-slate-400">Nenhum eletroposto encontrado ao longo desta rota.</td></tr>`;
    return;
  }

  const abrpIcon = L.divIcon({
    className: 'custom-abrp-pin',
    html: `<div class="abrp-charger-pin"><i class="fa-solid fa-bolt"></i></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14]
  });

  const carBatteryCapacity = selectedCar ? selectedCar.battery : 45.0;

  fetchedStations.forEach((station, index) => {
    let battAtArrival = Math.max(0, 100 - Math.round((station.routeKm / initialRangeKm) * 100));
    
    let abrpPlanMsg = "Ponto de Passagem";
    let chargeTimeMinutes = 0;
    
    if (station.routeKm > initialRangeKm || battAtArrival < 20) {
      const targetPct = 80;
      const neededPct = Math.min(80, Math.max(20, targetPct - battAtArrival));
      const energyNeededKwh = (neededPct / 100) * carBatteryCapacity;
      chargeTimeMinutes = Math.round((energyNeededKwh / (station.powerKw || 50)) * 60) + 5;
      abrpPlanMsg = `⚡ Recarregar +${neededPct}% (~${chargeTimeMinutes} min)`;
    }

    const popupContent = `
      <div style="font-size:12px; font-family:sans-serif; color:#0f172a;">
        <strong style="color:#059669; font-size:13px;">#${index + 1} ${station.name}</strong><br>
        <b>Rede:</b> ${station.network}<br>
        <b>Plugue:</b> ${station.plugType} (${station.powerKw} kW)<br>
        <b>Local:</b> Km ${station.routeKm} da rota<br>
        <hr style="margin:4px 0;">
        <b>Telemetria ABRP:</b> Chegada em <b>${battAtArrival}%</b><br>
        <span style="color:#d97706; font-weight:bold;">${abrpPlanMsg}</span>
      </div>
    `;

    const marker = L.marker([station.lat, station.lng], { icon: abrpIcon }).addTo(map).bindPopup(popupContent);
    stationMarkers.push(marker);

    const tr = document.createElement('tr');
    tr.className = "hover:bg-blue-900/30 transition text-xs md:text-sm";
    tr.innerHTML = `
      <td class="p-2 font-bold text-amber-400 whitespace-nowrap">#${index + 1}</td>
      <td class="p-2 whitespace-nowrap"><span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-600">🟢 ${station.network}</span></td>
      <td class="p-2 font-semibold text-white whitespace-nowrap"><i class="fa-solid fa-charging-station text-yellow-400 mr-1"></i> ${station.name} (Km ${station.routeKm})</td>
      <td class="p-2 text-emerald-300 font-bold whitespace-nowrap">${station.cityState}</td>
      <td class="p-2 text-center whitespace-nowrap font-bold ${battAtArrival > 15 ? 'text-emerald-400' : 'text-red-400'}">${battAtArrival}%</td>
      <td class="p-2 text-center whitespace-nowrap font-bold text-amber-300">${abrpPlanMsg}</td>
      <td class="p-2 whitespace-nowrap"><span class="bg-blue-900 text-blue-100 px-2 py-0.5 rounded border border-blue-700 text-xs">${station.power}</span></td>
      <td class="p-2 text-right whitespace-nowrap"><button onclick="map.setView([${station.lat}, ${station.lng}], 14)" class="bg-blue-600 text-white font-bold px-2.5 py-1 rounded text-xs">Ver</button></td>
    `;
    tbody.appendChild(tr);
  });
}

async function calculateMultiRoute() {
  const calcBtn = document.getElementById('calcBtn');
  const calcBtnText = document.getElementById('calcBtnText');
  const calcBtnIcon = document.getElementById('calcBtnIcon');
  const progressBar = document.getElementById('calcProgressBar');
  const toast = document.getElementById('routeToast');

  if (calcBtn) calcBtn.disabled = true;
  if (calcBtnText) calcBtnText.innerText = "Calculando rota...";
  if (calcBtnIcon) calcBtnIcon.className = "fa-solid fa-spinner fa-spin";
  if (progressBar) progressBar.classList.remove('hidden');

  try {
    for (let i = 0; i < waypoints.length; i++) {
      const val = document.getElementById(`wpInput_${i}`)?.value;
      if (val) waypoints[i].address = val;
      if (waypoints[i].address && !waypoints[i].coords) {
        waypoints[i].coords = await geocodeFast(waypoints[i].address);
      }
    }

    await updateWaypointMarkers();
    const validCoords = waypoints.filter(w => w.coords).map(w => `${w.coords[1]},${w.coords[0]}`);
    if (validCoords.length < 2) { alert("Informe a Origem e pelo menos um Destino."); return; }

    const res = await fetch(`https://router.project-osrm.org/route/v1/driving/${validCoords.join(';')}?overview=full&geometries=geojson`);
    const data = await res.json();

    if (data.routes && data.routes.length > 0) {
      activeRouteData = data.routes[0];
      if (currentPolyline) map.removeLayer(currentPolyline);
      currentPolyline = L.geoJSON(activeRouteData.geometry, { style: { color: '#10b981', weight: 6 } }).addTo(map);
      map.fitBounds(currentPolyline.getBounds(), { padding: [30, 30] });

      const distKm = Math.round(activeRouteData.distance / 1000);
      const distElem = document.getElementById('totalDistance');
      if (distElem) distElem.innerText = `${distKm} km`;

      const startBatt = parseFloat(document.getElementById('startBattery')?.value) || 80;
      const electricRange = selectedCar ? (selectedCar.range * (startBatt / 100)) : 250;

      await fetchRouteStationsFromOSM(activeRouteData.geometry);
      renderStationsOnMapAndTable(distKm, electricRange);

      let totalCost = 0;
      const kwhCost = parseFloat(document.getElementById('costPerKwh')?.value) || 2.39;

      if (selectedCar && selectedCar.isHybrid) {
        const startLiters = parseFloat(document.getElementById('startFuelLiters')?.value) || 40;
        const gasKmPL = parseFloat(document.getElementById('kmPerLiterGas')?.value) || selectedCar.gasKm || 15.0;
        const ethanolKmPL = parseFloat(document.getElementById('kmPerLiterEthanol')?.value) || selectedCar.ethanolKm || 10.5;
        const gasPrice = parseFloat(document.getElementById('costPerLiterGas')?.value) || 6.88;
        const ethanolPrice = parseFloat(document.getElementById('costPerLiterEthanol')?.value) || 5.07;

        const bestKmPL = (ethanolPrice / ethanolKmPL < gasPrice / gasKmPL) ? ethanolKmPL : gasKmPL;
        const totalRangeCapacity = electricRange + (startLiters * bestKmPL);

        const alertBox = document.getElementById('rechargeDistanceAlert');
        const targetBox = document.getElementById('targetBatteryNeeded');

        if (distKm > totalRangeCapacity) {
          const deficitKm = distKm - totalRangeCapacity;
          const neededRecharge = Math.ceil((deficitKm / selectedCar.range) * 100);
          if (alertBox) alertBox.innerText = `Necessário reabastecer / carregar +${neededRecharge}% no percurso`;
          if (targetBox) targetBox.innerText = `Parada obrigatória em rota`;
        } else {
          const remainingRange = totalRangeCapacity - distKm;
          const arrivalBattPct = Math.max(0, Math.round((remainingRange / selectedCar.range) * 100));
          const tripElectricUsed = Math.min(distKm, electricRange);
          const tripCost = (tripElectricUsed / 100) * selectedCar.consumption * kwhCost;
          if (alertBox) alertBox.innerText = `Chegada com ${arrivalBattPct}% de bateria (Custo elétrico R$ ${tripCost.toFixed(2)})`;
          if (targetBox) targetBox.innerText = `Chegada com ${arrivalBattPct}% restante`;
        }

        const electricUsed = Math.min(distKm, electricRange);
        const fuelUsed = Math.min(Math.max(0, distKm - electricRange), startLiters * bestKmPL);
        const electricCost = (electricUsed / 100) * selectedCar.consumption * kwhCost;
        const fuelCost = (fuelUsed / bestKmPL) * (bestKmPL === ethanolKmPL ? ethanolPrice : gasPrice);
        totalCost = electricCost + fuelCost;
      } else if (selectedCar) {
        totalCost = ((distKm / 100) * selectedCar.consumption) * kwhCost;
        const alertBox = document.getElementById('rechargeDistanceAlert');
        const targetBox = document.getElementById('targetBatteryNeeded');

        if (distKm > electricRange) {
          const deficitKm = distKm - electricRange;
          const neededRecharge = Math.min(100, Math.ceil((deficitKm / selectedCar.range) * 100));
          if (alertBox) alertBox.innerText = `Autonomia insuficiente. Carregar +${neededRecharge}% no eletroposto`;
          if (targetBox) targetBox.innerText = `Recarga de +${neededRecharge}% necessária`;
        } else {
          const remainingKm = electricRange - distKm;
          const arrivalBattPct = Math.max(0, Math.round((remainingKm / selectedCar.range) * 100));
          if (alertBox) alertBox.innerText = `Chegada com ${arrivalBattPct}% de bateria (Valor R$ ${totalCost.toFixed(2)})`;
          if (targetBox) targetBox.innerText = `Chegada com ${arrivalBattPct}% restante`;
        }
      }

      const totalCostElem = document.getElementById('totalCost');
      if (totalCostElem) totalCostElem.innerText = `R$ ${totalCost.toFixed(2)}`;

      currentTripStats.totalKm += distKm;
      currentTripStats.savings += Math.max(0, (distKm * 0.45));
      currentTripStats.co2Saved += Math.round(distKm * 0.12);
      currentTripStats.tripsCount += 1;
      saveEsgStats();

      if (toast) {
        toast.classList.remove('hidden');
        setTimeout(() => toast.classList.add('hidden'), 4000);
      }
    }
  } catch (e) {
    console.error(e);
  } finally {
    if (calcBtn) calcBtn.disabled = false;
    if (calcBtnText) calcBtnText.innerText = "Calcular Rota Completa";
    if (calcBtnIcon) calcBtnIcon.className = "fa-solid fa-calculator";
    if (progressBar) progressBar.classList.add('hidden');
  }
}

function initExtraButtonsAndModals() {
  const gmapsBtn = document.getElementById('openGoogleMapsBtn');
  if (gmapsBtn) {
    gmapsBtn.addEventListener('click', () => {
      const validCoords = waypoints.filter(w => w.coords).map(w => `${w.coords[0]},${w.coords[1]}`);
      if (validCoords.length < 2) return alert("Calcule uma rota para abrir no Google Maps.");
      const url = `https://www.google.com/maps/dir/${validCoords.join('/')}`;
      window.open(url, '_blank');
    });
  }

  const wazeBtn = document.getElementById('openWazeBtn');
  if (wazeBtn) {
    wazeBtn.addEventListener('click', () => {
      const dest = waypoints.find(w => w.type === 'destination' && w.coords);
      if (!dest) return alert("Defina um destino para abrir no Waze.");
      const url = `https://waze.com/ul?ll=${dest.coords[0]},${dest.coords[1]}&navigate=yes`;
      window.open(url, '_blank');
    });
  }

  const pdfBtn = document.getElementById('exportPdfBtn');
  if (pdfBtn) {
    pdfBtn.addEventListener('click', () => {
      window.print();
    });
  }

  const openStatsBtn = document.getElementById('openStatsModalBtn');
  const closeStatsBtn = document.getElementById('closeStatsModalBtn');
  const statsModal = document.getElementById('statsModal');

  if (openStatsBtn && statsModal) {
    openStatsBtn.addEventListener('click', () => {
      updateEsgUI();
      statsModal.classList.remove('hidden');
    });
  }

  if (closeStatsBtn && statsModal) {
    closeStatsBtn.addEventListener('click', () => {
      statsModal.classList.add('hidden');
    });
  }

  const resetEsgBtn = document.getElementById('resetEsgBtn');
  if (resetEsgBtn) {
    resetEsgBtn.addEventListener('click', () => {
      currentTripStats = { totalKm: 0, savings: 0, co2Saved: 0, tripsCount: 0 };
      saveEsgStats();
      updateEsgUI();
      alert("Histórico ESG zerado.");
    });
  }
}

function loadEsgStats() {
  const saved = localStorage.getItem('hv_esg_stats');
  if (saved) {
    try { currentTripStats = JSON.parse(saved); } catch (e) {}
  }
}

function saveEsgStats() {
  localStorage.setItem('hv_esg_stats', JSON.stringify(currentTripStats));
}

function updateEsgUI() {
  const savingsElem = document.getElementById('esgSavingsTotal');
  const co2Elem = document.getElementById('esgCo2Saved');
  const kmElem = document.getElementById('esgTotalKm');
  const tripsElem = document.getElementById('esgTripsCount');

  if (savingsElem) savingsElem.innerText = `R$ ${currentTripStats.savings.toFixed(2)}`;
  if (co2Elem) co2Elem.innerText = `${currentTripStats.co2Saved} kg`;
  if (kmElem) kmElem.innerText = `${currentTripStats.totalKm} km`;
  if (tripsElem) tripsElem.innerText = `${currentTripStats.tripsCount}`;
}

window.onload = initMap;
