/* ==========================================================================
   EV PLANNER PRO - CORE ENGINE (app.js)
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

// Base estendida de referência para grandes rodovias interestaduais
const manualStationsDatabase = [
  { name: "Planeta Charger - Rei das Coxinhas (Pedras de Fogo)", cityState: "Pedras de Fogo / PB", lat: -7.3957, lng: -34.9552, power: "CCS2 Ultra-Rápido DC (60kW)", type: "DC", operationalStatus: "Disponível" },
  { name: "Planeta Charger - Rei das Coxinhas (Gravatá)", cityState: "Gravatá / PE", lat: -8.1888, lng: -35.5069, power: "CCS2 Ultra-Rápido DC (120kW)", type: "DC", operationalStatus: "Disponível" },
  { name: "Eletroposto BR-101 (Maceió)", cityState: "Maceió / AL", lat: -9.6658, lng: -35.7353, power: "CCS2 Rápido DC (50kW)", type: "DC", operationalStatus: "Disponível" },
  { name: "Eletroposto Shell Recharge (Aracaju)", cityState: "Aracaju / SE", lat: -10.9472, lng: -37.0731, power: "CCS2 Ultra-Rápido DC (150kW)", type: "DC", operationalStatus: "Disponível" },
  { name: "Eletroposto BR-324 (Salvador)", cityState: "Salvador / BA", lat: -12.9714, lng: -38.5014, power: "CCS2 Ultra-Rápido DC (150kW)", type: "DC", operationalStatus: "Disponível" },
  { name: "Eletroposto BR-116 (Feira de Santana)", cityState: "Feira de Santana / BA", lat: -12.2664, lng: -38.9663, power: "CCS2 Rápido DC (50kW)", type: "DC", operationalStatus: "Disponível" },
  { name: "Eletroposto Vitória da Conquista", cityState: "Vitória da Conquista / BA", lat: -14.8661, lng: -40.8394, power: "CCS2 Ultra-Rápido DC (120kW)", type: "DC", operationalStatus: "Disponível" },
  { name: "Eletroposto BR-116 (Montes Claros)", cityState: "Montes Claros / MG", lat: -16.7350, lng: -43.8617, power: "CCS2 Rápido DC (50kW)", type: "DC", operationalStatus: "Disponível" },
  { name: "Eletroposto Zletric (Governador Valadares)", cityState: "Governador Valadares / MG", lat: -17.8575, lng: -41.9490, power: "CCS2 Ultra-Rápido DC (100kW)", type: "DC", operationalStatus: "Disponível" },
  { name: "Eletroposto Zletric (Belo Horizonte - BR-381)", cityState: "Belo Horizonte / MG", lat: -19.9167, lng: -43.9345, power: "CCS2 Ultra-Rápido DC (150kW)", type: "DC", operationalStatus: "Disponível" },
  { name: "Eletroposto Rodovia Fernão Dias (Extrema)", cityState: "Extrema / MG", lat: -22.8556, lng: -46.3197, power: "CCS2 Ultra-Rápido DC (150kW)", type: "DC", operationalStatus: "Disponível" },
  { name: "Eletroposto Graal 56 (Jundiaí - Rod. Anhanguera)", cityState: "Jundiaí / SP", lat: -23.1864, lng: -46.8842, power: "CCS2 Ultra-Rápido DC (150kW)", type: "DC", operationalStatus: "Disponível" }
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
let evDatabase = {};
let favoritePlaces = [];
let favoriteCar = null;

let currentTripStats = {
  totalKm: 0,
  savings: 0,
  co2Saved: 0,
  tripsCount: 0
};

// Inicialização Principal
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

// Carregamento de veículos a partir do JSON
async function loadVehicles() {
  try {
    const response = await fetch('vehicles.json');
    evDatabase = await response.json();
    initVehicleSelectors();
  } catch (error) {
    console.error("Erro ao carregar veículos:", error);
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

  // Seleção padrão inicial
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
      const newHome = prompt("Defina ou limpe o endereço de Casa:");
      if (newHome !== null) {
        if (newHome.trim() === "") {
          localStorage.removeItem('hv_home_address');
          if (waypoints.length > 0 && waypoints[0].label === "Origem") {
            waypoints[0].address = "";
            waypoints[0].coords = null;
            renderWaypointsInputs();
            updateWaypointMarkers();
          }
          alert("Endereço de Casa limpo com sucesso!");
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

  const roundTripBtn = document.getElementById('roundTripBtn');
  if (roundTripBtn) {
    roundTripBtn.addEventListener('click', () => {
      if (waypoints.length >= 2 && waypoints[0].address) {
        const originAddr = waypoints[0].address;
        const originCoords = waypoints[0].coords;
        waypoints.push({ address: originAddr, coords: originCoords, type: "destination", label: "Retorno (Origem)" });
        renderWaypointsInputs();
        updateWaypointMarkers();
      } else {
        alert("Defina o ponto de origem antes de criar o retorno.");
      }
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

async function fetchWeatherForecast(lat, lng, dateStr, timeStr) {
  const box = document.getElementById('weatherAlertBox');
  const textElem = document.getElementById('weatherAlertText');
  const badgeElem = document.getElementById('weatherTempBadge');
  if (!box || !textElem || !badgeElem) return;

  box.classList.remove('hidden');
  textElem.innerHTML = "Buscando previsão do tempo...";
  badgeElem.innerHTML = "--°C";

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&hourly=temperature_2m,precipitation_probability,weathercode&timezone=auto`;
    const res = await fetch(url);
    const data = await res.json();

    if (data && data.hourly && data.hourly.time) {
      const times = data.hourly.time;
      const targetDateTimeStr = `${dateStr}T${timeStr.split(':')[0]}:00`;
      let targetIdx = 0;
      for (let i = 0; i < times.length; i++) {
        if (times[i] >= targetDateTimeStr) { targetIdx = i; break; }
      }
      const temp = data.hourly.temperature_2m[targetIdx];
      const precipProb = data.hourly.precipitation_probability[targetIdx] || 0;
      const weatherCode = data.hourly.weathercode[targetIdx] || 0;

      let conditionDesc = "Clima Limpo / Bom";
      let isRaining = false;

      if (precipProb > 40 || (weatherCode >= 50 && weatherCode <= 67) || (weatherCode >= 80 && weatherCode <= 99)) {
        conditionDesc = `Chuva prevista (${precipProb}% de chance)`;
        isRaining = true;
      } else if (weatherCode >= 1 && weatherCode <= 3) {
        conditionDesc = "Parcialmente Nublado";
      } else {
        conditionDesc = "Ensolarado / Bom";
      }

      textElem.innerHTML = `🌤️ ${conditionDesc}`;
      badgeElem.innerHTML = `${temp}°C`;

      const rainCheckbox = document.getElementById('rainMode');
      if (rainCheckbox) rainCheckbox.checked = isRaining;
    }
  } catch (e) {
    textElem.innerHTML = "🌤️ Clima indisponível no momento";
    badgeElem.innerHTML = "--°C";
  }
}

function drawBatteryIsochronePolyline(startCoords, rangeKm) {
  if (isochronePolygon) map.removeLayer(isochronePolygon);
  const toggle = document.getElementById('showIsochrone');
  if (!toggle || !toggle.checked || !startCoords) return;

  const points = [];
  const numPoints = 32;
  const lat = startCoords[0];
  const lng = startCoords[1];
  const latRadius = rangeKm / 111.0;
  const lngRadius = rangeKm / (111.0 * Math.cos(lat * Math.PI / 180));

  for (let i = 0; i < numPoints; i++) {
    const angle = (i / numPoints) * (2 * Math.PI);
    points.push([lat + (latRadius * Math.sin(angle)), lng + (lngRadius * Math.cos(angle))]);
  }

  isochronePolygon = L.polygon(points, {
    color: '#10b981', fillColor: '#34d399', fillOpacity: 0.12, weight: 2, dashArray: '5, 5'
  }).addTo(map).bindPopup(`<b>Raio Elétrico Inicial</b><br>Autonomia estimada: ${Math.round(rangeKm)} km.`);
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

// Otimização de busca em lote leve para eletropostos em rotas longas
async function fetchRouteStationsFromOSM(routeGeometry) {
  const countLabel = document.getElementById('stationsCount');
  if (countLabel) countLabel.innerText = "Buscando eletropostos na rota...";
  
  const routeCoords = routeGeometry.coordinates;
  const uniqueMap = new Map();

  // 1. Postos manuais de rodovia de alta prioridade
  for (const mStation of manualStationsDatabase) {
    const routeMatch = getMinDistanceToRouteInKm(mStation.lat, mStation.lng, routeCoords);
    if (routeMatch.minDistance <= 40) {
      uniqueMap.set(`${mStation.lat.toFixed(3)}_${mStation.lng.toFixed(3)}`, {
        id: `manual_${Math.random()}`, name: mStation.name, cityState: mStation.cityState,
        lat: mStation.lat, lng: mStation.lng, power: mStation.power, type: mStation.type,
        distToRoute: routeMatch.minDistance, routeKm: routeMatch.routeKm, operationalStatus: mStation.operationalStatus
      });
    }
  }

  // 2. Coleta direcionada por amostra sem gerar gargalo/timeout na API
  const samplePoints = [];
  const numSamples = Math.min(8, Math.max(2, Math.floor(routeCoords.length / 200)));
  const step = Math.floor(routeCoords.length / numSamples);

  for (let i = 0; i < routeCoords.length; i += step) {
    samplePoints.push(routeCoords[i]);
  }

  const queryPromises = samplePoints.map(async (pt) => {
    const lat = pt[1];
    const lng = pt[0];
    const bbox = `${lat - 0.7},${lng - 0.7},${lat + 0.7},${lng + 0.7}`;

    const query = `[out:json][timeout:6];
    (
      node["amenity"="charging_station"](${bbox});
      node["amenity"="ev_charging"](${bbox});
    );
    out body 35;`;

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
            if (routeMatch.minDistance <= 25) {
              const tags = item.tags || {};
              const name = tags.name || tags.operator || tags.brand || `Eletroposto BR`;
              const isDC = tags['socket:ccs'] || tags['socket:type2_combo'] || (tags.description && tags.description.toLowerCase().includes('dc'));

              uniqueMap.set(key, {
                id: item.id, name: name, cityState: `Lat/Lng: ${elLat.toFixed(2)}, ${elLng.toFixed(2)}`,
                lat: elLat, lng: elLng,
                power: isDC ? 'CCS2 Ultra-Rápido DC (50-150kW)' : 'AC Wallbox (7-22kW)',
                type: isDC ? 'DC' : 'AC', distToRoute: routeMatch.minDistance, routeKm: routeMatch.routeKm,
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
  if (countLabel) countLabel.innerText = `${fetchedStations.length} encontrados na rota`;

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

  fetchedStations.forEach((station, index) => {
    const marker = L.marker([station.lat, station.lng], { icon: abrpIcon }).addTo(map).bindPopup(`<b>#${index + 1} ⚡ ${station.name}</b><br>Km ${station.routeKm} da rota`);
    stationMarkers.push(marker);

    let battAtArrival = Math.max(0, 100 - Math.round((station.routeKm / initialRangeKm) * 100));
    let operationMsg = "Ponto de Carga na Rota";
    if (station.routeKm > initialRangeKm) {
      battAtArrival = 0;
      const deficitKm = station.routeKm - initialRangeKm;
      const neededRechargePct = Math.min(100, Math.ceil((deficitKm / (selectedCar ? selectedCar.range : 250)) * 100));
      operationMsg = `⚠️ Recarregar +${neededRechargePct}% aqui`;
    }

    const tr = document.createElement('tr');
    tr.className = "hover:bg-blue-900/30 transition text-xs md:text-sm";
    tr.innerHTML = `
      <td class="p-2 font-bold text-amber-400 whitespace-nowrap">#${index + 1}</td>
      <td class="p-2 whitespace-nowrap"><span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-600">🟢 Livre</span></td>
      <td class="p-2 font-semibold text-white whitespace-nowrap"><i class="fa-solid fa-charging-station text-yellow-400 mr-1"></i> ${station.name} (Km ${station.routeKm})</td>
      <td class="p-2 text-emerald-300 font-bold whitespace-nowrap">${station.cityState || 'Rodovia / Trecho'}</td>
      <td class="p-2 text-center whitespace-nowrap font-bold ${battAtArrival > 15 ? 'text-emerald-400' : 'text-red-400'}">${battAtArrival}%</td>
      <td class="p-2 text-center whitespace-nowrap font-bold text-amber-300">${operationMsg}</td>
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

    if (waypoints[0] && waypoints[0].coords) {
      const depDate = document.getElementById('departureDate')?.value || new Date().toISOString().split('T')[0];
      const depTime = document.getElementById('departureTime')?.value || "08:00";
      await fetchWeatherForecast(waypoints[0].coords[0], waypoints[0].coords[1], depDate, depTime);
    }

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
      drawBatteryIsochronePolyline(waypoints[0].coords, electricRange);

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

      // Atualiza telemetria ESG
      currentTripStats.totalKm += distKm;
      currentTripStats.savings += Math.max(0, (distKm * 0.45)); // estimativa
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

// Ouvintes de Modais e Botões Adicionais (Google Maps, Waze, ESG, PDF)
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
      alert("Histórico ESG zerado com sucesso.");
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
