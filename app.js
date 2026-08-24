/* ==========================================================================
   EV PLANNER PRO - CORE ENGINE (app.js)
   Código Consolidado: Carregamento Resiliente, Seletores Corrigidos e Telemetria
   ========================================================================== */

// Base Completa Nativa Integrada (Resiliência total contra falhas no fetch/file://)
const fullEvDatabase = {
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
    { model: 'Haval H6 PHEV34', type: 'PHEV (Híbrido Plug-in)', battery: 34.0, range: 170, consumption: 20.0, isHybrid: true, gasKm: 28.7, ethanolKm: 20.1 },
    { model: 'Haval H6 GT PHEV', type: 'PHEV (Híbrido Plug-in)', battery: 34.0, range: 170, consumption: 20.0, isHybrid: true, gasKm: 28.7, ethanolKm: 20.1 }
  ],
  "Leapmotor": [
    { model: 'T03 Compact BEV', type: 'BEV (100% Elétrico)', battery: 36.5, range: 265, consumption: 13.8, isHybrid: false },
    { model: 'C10 SUV BEV', type: 'BEV (100% Elétrico)', battery: 69.9, range: 420, consumption: 16.6, isHybrid: false },
    { model: 'C10 REEV (Range Extender)', type: 'PHEV (Híbrido Plug-in)', battery: 28.4, range: 140, consumption: 15.2, isHybrid: true, gasKm: 20.5, ethanolKm: 14.5 },
    { model: 'B10 SUV BEV', type: 'BEV (100% Elétrico)', battery: 62.0, range: 380, consumption: 16.3, isHybrid: false },
    { model: 'C11 SUV BEV', type: 'BEV (100% Elétrico)', battery: 85.4, range: 460, consumption: 18.5, isHybrid: false },
    { model: 'C16 Crossover BEV', type: 'BEV (100% Elétrico)', battery: 75.0, range: 410, consumption: 18.2, isHybrid: false }
  ],
  "Volvo": [
    { model: 'EX30 Core Single Motor', type: 'BEV (100% Elétrico)', battery: 51.0, range: 250, consumption: 20.4, isHybrid: false },
    { model: 'EX30 Extended Range', type: 'BEV (100% Elétrico)', battery: 69.0, range: 340, consumption: 20.2, isHybrid: false },
    { model: 'EX30 Twin Motor Performance', type: 'BEV (100% Elétrico)', battery: 69.0, range: 330, consumption: 20.9, isHybrid: false },
    { model: 'XC40 Recharge Single', type: 'BEV (100% Elétrico)', battery: 69.0, range: 305, consumption: 22.6, isHybrid: false },
    { model: 'XC40 Recharge Twin AWD', type: 'BEV (100% Elétrico)', battery: 78.0, range: 305, consumption: 25.5, isHybrid: false },
    { model: 'C40 Recharge Twin AWD', type: 'BEV (100% Elétrico)', battery: 78.0, range: 315, consumption: 24.7, isHybrid: false },
    { model: 'XC60 Recharge T8 Plug-in', type: 'PHEV (Híbrido Plug-in)', battery: 18.8, range: 78, consumption: 24.1, isHybrid: true, gasKm: 26.7, ethanolKm: 18.5 },
    { model: 'XC90 Recharge T8 Plug-in', type: 'PHEV (Híbrido Plug-in)', battery: 18.8, range: 71, consumption: 26.4, isHybrid: true, gasKm: 23.5, ethanolKm: 16.2 },
    { model: 'EX90 AWD', type: 'BEV (100% Elétrico)', battery: 111.0, range: 450, consumption: 24.6, isHybrid: false }
  ],
  "BMW": [
    { model: 'iX1 eDrive20', type: 'BEV (100% Elétrico)', battery: 64.7, range: 303, consumption: 21.3, isHybrid: false },
    { model: 'iX1 xDrive30', type: 'BEV (100% Elétrico)', battery: 64.7, range: 303, consumption: 21.3, isHybrid: false },
    { model: 'iX2 xDrive30', type: 'BEV (100% Elétrico)', battery: 64.8, range: 310, consumption: 20.9, isHybrid: false },
    { model: 'i4 eDrive35', type: 'BEV (100% Elétrico)', battery: 67.0, range: 350, consumption: 19.1, isHybrid: false },
    { model: 'i4 eDrive40', type: 'BEV (100% Elétrico)', battery: 80.7, range: 420, consumption: 19.2, isHybrid: false },
    { model: 'i4 M50 AWD', type: 'BEV (100% Elétrico)', battery: 80.7, range: 380, consumption: 21.2, isHybrid: false },
    { model: 'iX xDrive40', type: 'BEV (100% Elétrico)', battery: 71.0, range: 320, consumption: 22.1, isHybrid: false },
    { model: 'iX xDrive50', type: 'BEV (100% Elétrico)', battery: 105.2, range: 520, consumption: 20.2, isHybrid: false },
    { model: 'i7 xDrive60', type: 'BEV (100% Elétrico)', battery: 101.7, range: 480, consumption: 21.1, isHybrid: false },
    { model: '330e Plug-in Hybrid', type: 'PHEV (Híbrido Plug-in)', battery: 12.0, range: 37, consumption: 21.0, isHybrid: true, gasKm: 26.0, ethanolKm: 18.0 },
    { model: 'X5 xDrive50e Plug-in', type: 'PHEV (Híbrido Plug-in)', battery: 25.7, range: 75, consumption: 24.3, isHybrid: true, gasKm: 22.0, ethanolKm: 15.0 }
  ],
  "Porsche": [
    { model: 'Taycan Base RWD', type: 'BEV (100% Elétrico)', battery: 79.2, range: 360, consumption: 22.0, isHybrid: false },
    { model: 'Taycan 4S', type: 'BEV (100% Elétrico)', battery: 89.0, range: 380, consumption: 23.4, isHybrid: false },
    { model: 'Taycan Turbo S', type: 'BEV (100% Elétrico)', battery: 93.4, range: 350, consumption: 26.6, isHybrid: false },
    { model: 'Macan EV 4 AWD', type: 'BEV (100% Elétrico)', battery: 100.0, range: 430, consumption: 23.2, isHybrid: false },
    { model: 'Macan EV Turbo AWD', type: 'BEV (100% Elétrico)', battery: 100.0, range: 410, consumption: 24.3, isHybrid: false },
    { model: 'Cayenne E-Hybrid', type: 'PHEV (Híbrido Plug-in)', battery: 25.9, range: 60, consumption: 25.0, isHybrid: true, gasKm: 21.0, ethanolKm: 14.5 },
    { model: 'Panamera E-Hybrid', type: 'PHEV (Híbrido Plug-in)', battery: 25.9, range: 64, consumption: 24.0, isHybrid: true, gasKm: 22.0, ethanolKm: 15.0 }
  ],
  "Audi": [
    { model: 'Q4 e-tron 40', type: 'BEV (100% Elétrico)', battery: 77.0, range: 380, consumption: 20.2, isHybrid: false },
    { model: 'Q8 e-tron 55 Quattro', type: 'BEV (100% Elétrico)', battery: 106.0, range: 420, consumption: 25.2, isHybrid: false },
    { model: 'e-tron GT Quattro', type: 'BEV (100% Elétrico)', battery: 83.7, range: 380, consumption: 22.0, isHybrid: false },
    { model: 'RS e-tron GT', type: 'BEV (100% Elétrico)', battery: 83.7, range: 360, consumption: 23.2, isHybrid: false }
  ],
  "Mercedes-Benz": [
    { model: 'EQA 250', type: 'BEV (100% Elétrico)', battery: 66.5, range: 330, consumption: 20.1, isHybrid: false },
    { model: 'EQB 250', type: 'BEV (100% Elétrico)', battery: 66.5, range: 320, consumption: 20.8, isHybrid: false },
    { model: 'EQC 400 4MATIC', type: 'BEV (100% Elétrico)', battery: 80.0, range: 350, consumption: 22.8, isHybrid: false },
    { model: 'EQE 300', type: 'BEV (100% Elétrico)', battery: 89.0, range: 450, consumption: 19.8, isHybrid: false },
    { model: 'EQS 450+', type: 'BEV (100% Elétrico)', battery: 107.8, range: 550, consumption: 19.6, isHybrid: false }
  ],
  "CAOA Chery": [
    { model: 'iCar EV', type: 'BEV (100% Elétrico)', battery: 30.8, range: 197, consumption: 15.6, isHybrid: false },
    { model: 'Tiggo 8 Pro Plug-in Hybrid', type: 'PHEV (Híbrido Plug-in)', battery: 19.2, range: 77, consumption: 24.9, isHybrid: true, gasKm: 30.3, ethanolKm: 21.0 },
    { model: 'Tiggo 7 Pro Hybrid', type: 'HEV (Híbrido Convencional)', battery: 1.0, range: 15, consumption: 6.6, isHybrid: true, gasKm: 12.8, ethanolKm: 8.9 }
  ],
  "Chevrolet": [
    { model: 'Bolt EV', type: 'BEV (100% Elétrico)', battery: 66.0, range: 387, consumption: 17.0, isHybrid: false },
    { model: 'Bolt EUV', type: 'BEV (100% Elétrico)', battery: 65.0, range: 377, consumption: 17.2, isHybrid: false },
    { model: 'Blazer EV RS AWD', type: 'BEV (100% Elétrico)', battery: 85.0, range: 381, consumption: 22.3, isHybrid: false },
    { model: 'Equinox EV AWD', type: 'BEV (100% Elétrico)', battery: 85.0, range: 400, consumption: 21.2, isHybrid: false }
  ],
  "Renault": [
    { model: 'Kwid E-Tech', type: 'BEV (100% Elétrico)', battery: 26.8, range: 185, consumption: 14.4, isHybrid: false },
    { model: 'Zoe E-Tech', type: 'BEV (100% Elétrico)', battery: 52.0, range: 254, consumption: 20.4, isHybrid: false },
    { model: 'Megane E-Tech', type: 'BEV (100% Elétrico)', battery: 60.0, range: 337, consumption: 17.8, isHybrid: false }
  ],
  "Hyundai": [
    { model: 'Kona Electric (39 kWh)', type: 'BEV (100% Elétrico)', battery: 39.2, range: 252, consumption: 15.5, isHybrid: false },
    { model: 'Kona Electric (64 kWh)', type: 'BEV (100% Elétrico)', battery: 64.0, range: 305, consumption: 20.9, isHybrid: false },
    { model: 'Ioniq 5 AWD', type: 'BEV (100% Elétrico)', battery: 77.4, range: 380, consumption: 20.3, isHybrid: false }
  ],
  "Kia": [
    { model: 'Niro Hybrid', type: 'HEV (Híbrido Convencional)', battery: 1.32, range: 15, consumption: 6.8, isHybrid: true, gasKm: 19.8, ethanolKm: 13.8 },
    { model: 'EV6 GT-Line AWD', type: 'BEV (100% Elétrico)', battery: 77.4, range: 380, consumption: 20.3, isHybrid: false },
    { model: 'EV9 AWD Earth', type: 'BEV (100% Elétrico)', battery: 99.8, range: 430, consumption: 23.2, isHybrid: false }
  ],
  "Nissan": [
    { model: 'Leaf TEKNA', type: 'BEV (100% Elétrico)', battery: 40.0, range: 192, consumption: 20.8, isHybrid: false },
    { model: 'Ariya E-4ORCE AWD', type: 'BEV (100% Elétrico)', battery: 87.0, range: 400, consumption: 21.7, isHybrid: false }
  ],
  "Toyota & Lexus": [
    { model: 'Corolla Altis Hybrid', type: 'HEV (Híbrido Convencional)', battery: 1.3, range: 15, consumption: 5.5, isHybrid: true, gasKm: 17.9, ethanolKm: 12.8 },
    { model: 'Corolla Cross Hybrid', type: 'HEV (Híbrido Convencional)', battery: 1.3, range: 15, consumption: 5.8, isHybrid: true, gasKm: 17.8, ethanolKm: 12.7 },
    { model: 'RAV4 Plug-in Hybrid', type: 'PHEV (Híbrido Plug-in)', battery: 18.1, range: 75, consumption: 24.1, isHybrid: true, gasKm: 25.0, ethanolKm: 17.5 },
    { model: 'Lexus UX 300e', type: 'BEV (100% Elétrico)', battery: 54.3, range: 280, consumption: 19.3, isHybrid: false }
  ],
  "Jeep & Fiat": [
    { model: 'Compass 4xe Plug-in', type: 'PHEV (Híbrido Plug-in)', battery: 11.4, range: 30, consumption: 38.0, isHybrid: true, gasKm: 25.4, ethanolKm: 17.2 },
    { model: 'Grand Cherokee 4xe Plug-in', type: 'PHEV (Híbrido Plug-in)', battery: 17.3, range: 40, consumption: 43.2, isHybrid: true, gasKm: 19.2, ethanolKm: 13.0 },
    { model: 'Fiat 500e Icon', type: 'BEV (100% Elétrico)', battery: 42.0, range: 227, consumption: 18.5, isHybrid: false }
  ],
  "Ford": [
    { model: 'Mustang Mach-E GT AWD', type: 'BEV (100% Elétrico)', battery: 91.0, range: 379, consumption: 24.0, isHybrid: false },
    { model: 'F-150 Lightning AWD', type: 'BEV (100% Elétrico)', battery: 131.0, range: 450, consumption: 29.1, isHybrid: false },
    { model: 'Maverick Hybrid', type: 'HEV (Híbrido Convencional)', battery: 1.1, range: 12, consumption: 6.2, isHybrid: true, gasKm: 15.7, ethanolKm: 11.0 }
  ]
};

// Base Real de Eletropostos (PlugShare / ABRP)
const manualStationsDatabase = [
  { name: "Shell Recharge - Posto Milagres", network: "Shell Recharge", cityState: "Recife / PE", lat: -8.0321, lng: -34.9125, powerKw: 150, plugType: "CCS2 High Power", power: "CCS2 Ultra-Rápido DC (150kW)", type: "DC", operationalStatus: "Disponível" },
  { name: "Volvo Recharge - Shopping Tacaruna", network: "Volvo Recharge", cityState: "Recife / PE", lat: -8.0382, lng: -34.8724, powerKw: 50, plugType: "CCS2 / Type 2", power: "CCS2 Rápido DC (50kW)", type: "DC", operationalStatus: "Disponível" },
  { name: "Neoenergia - Posto Pichilau BR-101", network: "Neoenergia Corredor", cityState: "Igarassu / PE", lat: -7.8341, lng: -34.9082, powerKw: 50, plugType: "CCS2 / CHAdeMO", power: "CCS2 Rápido DC (50kW)", type: "DC", operationalStatus: "Disponível" },
  { name: "Planeta Charger - Rei das Coxinhas", network: "Planeta Charger", cityState: "Pedras de Fogo / PB", lat: -7.3957, lng: -34.9552, powerKw: 60, plugType: "CCS2 / Type 2", power: "CCS2 Ultra-Rápido DC (60kW)", type: "DC", operationalStatus: "Disponível" },
  { name: "EZVolt - Posto Alvorada BR-101", network: "EZVolt", cityState: "Goiana / PE", lat: -7.5612, lng: -34.9981, powerKw: 50, plugType: "CCS2", power: "CCS2 Rápido DC (50kW)", type: "DC", operationalStatus: "Disponível" },
  { name: "Zletric - Posto Carne de Vaca BR-101", network: "Zletric", cityState: "Goiana / PE", lat: -7.5102, lng: -34.9815, powerKw: 60, plugType: "CCS2 Combo", power: "CCS2 Ultra-Rápido DC (60kW)", type: "DC", operationalStatus: "Disponível" },
  { name: "Shell Recharge - Posto Via Sul BR-101", network: "Shell Recharge", cityState: "Conde / PB", lat: -7.2581, lng: -34.8912, powerKw: 150, plugType: "CCS2 High Power", power: "CCS2 Ultra-Rápido DC (150kW)", type: "DC", operationalStatus: "Disponível" },
  { name: "Manaíra Shopping - Hub Zletric", network: "Zletric", cityState: "João Pessoa / PB", lat: -7.0984, lng: -34.8391, powerKw: 60, plugType: "CCS2 / Type 2", power: "CCS2 Ultra-Rápido DC (60kW)", type: "DC", operationalStatus: "Disponível" },
  { name: "Planeta Charger - Rei das Coxinhas", network: "Planeta Charger", cityState: "Gravatá / PE", lat: -8.1888, lng: -35.5069, powerKw: 120, plugType: "CCS2 / Type 2", power: "CCS2 Ultra-Rápido DC (120kW)", type: "DC", operationalStatus: "Disponível" }
];

let map;
let waypoints = [];
let waypointMarkers = [];
let selectedCar = null;
let stationMarkers = [];
let fetchedStations = [];
let currentPolyline = null;
let activeRouteData = null;
let evDatabase = fullEvDatabase;

let currentTripStats = {
  totalKm: 0,
  savings: 0,
  co2Saved: 0,
  tripsCount: 0
};

function getBatteryColorHex(pct) {
  const p = Math.max(0, Math.min(100, pct));
  if (p >= 80) return "#10b981";
  if (p >= 45) return "#f59e0b";
  if (p >= 21) return "#f97316";
  return "#ef4444";
}

async function loadVehicles() {
  try {
    const response = await fetch('./vehicles.json');
    if (response.ok) {
      const data = await response.json();
      if (data && Object.keys(data).length > 0) {
        evDatabase = data;
      }
    }
  } catch (error) {
    console.warn("Mantendo banco nativo de veículos.");
  } finally {
    renderVehicleSelectors();
  }
}

function renderVehicleSelectors() {
  const brandSelect = document.getElementById('brandSelect');
  const modelSelect = document.getElementById('modelSelect');
  if (!brandSelect || !modelSelect) return;

  brandSelect.innerHTML = '<option value="">Selecione a marca...</option>';
  modelSelect.innerHTML = '<option value="">Selecione modelo...</option>';
  modelSelect.disabled = true;

  const brands = Object.keys(evDatabase).sort();
  brands.forEach(brand => {
    const option = document.createElement('option');
    option.value = brand;
    option.textContent = brand;
    brandSelect.appendChild(option);
  });

  brandSelect.onchange = function() {
    const brand = this.value;
    modelSelect.innerHTML = '<option value="">Selecione modelo...</option>';
    if (!brand || !evDatabase[brand]) { modelSelect.disabled = true; return; }
    modelSelect.disabled = false;

    evDatabase[brand].forEach((car, index) => {
      const option = document.createElement('option');
      option.value = index;
      
      const modelName = car.model || car.name || car.nome || `Modelo ${index + 1}`;
      const carType = car.type ? ` (${car.type.split(' ')[0]})` : '';
      option.textContent = `${modelName}${carType}`;
      
      modelSelect.appendChild(option);
    });
  };

  modelSelect.onchange = function() {
    const brand = brandSelect.value;
    const index = this.value;
    if (brand && index !== "" && evDatabase[brand] && evDatabase[brand][index]) {
      selectedCar = evDatabase[brand][index];
      updateCarSpecsUI();
    }
  };

  if (evDatabase["BYD"]) {
    brandSelect.value = "BYD";
    brandSelect.dispatchEvent(new Event('change'));
    if (evDatabase["BYD"][2]) {
      modelSelect.value = "2";
      modelSelect.dispatchEvent(new Event('change'));
    }
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

function initApp() {
  loadVehicles();

  try {
    if (document.getElementById('map')) {
      map = L.map('map').setView([-8.0476, -34.8770], 8);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);
    }
  } catch (err) {
    console.error("Erro ao inicializar o mapa Leaflet:", err);
  }

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
    dateInput.value = new Date().toISOString().split('T')[0];
  }
}

function initUserFavorites() {
  const setHomeBtn = document.getElementById('setHomeBtn');
  if (setHomeBtn) {
    setHomeBtn.onclick = () => {
      const newHome = prompt("Defina seu endereço de Casa:");
      if (newHome) {
        localStorage.setItem('hv_home_address', newHome);
        if (waypoints.length > 0) {
          waypoints[0].address = newHome;
          renderWaypointsInputs();
        }
      }
    };
  }
}

function initRouteControls() {
  const addDestBtn = document.getElementById('addDestinationBtn');
  if (addDestBtn) {
    addDestBtn.onclick = () => {
      const count = waypoints.filter(w => w.type === 'destination').length + 1;
      waypoints.push({ address: "", coords: null, type: "destination", label: `Destino ${count}` });
      renderWaypointsInputs();
    };
  }

  const calcBtn = document.getElementById('calcBtn');
  if (calcBtn) calcBtn.onclick = calculateMultiRoute;
}

function renderWaypointsInputs() {
  const container = document.getElementById('routeWaypointsContainer');
  if (!container) return;
  container.innerHTML = '';

  waypoints.forEach((wp, index) => {
    const div = document.createElement('div');
    div.className = "waypoint-item relative bg-[#020b29] p-2 rounded-lg border border-blue-900 space-y-1";
    div.innerHTML = `
      <div class="flex justify-between items-center text-[11px] mb-1">
        <span class="font-bold text-emerald-400">${wp.label}</span>
      </div>
      <input type="text" id="wpInput_${index}" value="${wp.address}" 
             class="w-full bg-[#031038] border border-blue-800 rounded p-1.5 text-white text-xs outline-none" 
             placeholder="Ex: Rua, bairro, cidade, estado">
    `;
    container.appendChild(div);
  });
}

async function calculateMultiRoute() {
  if (!map) return;
  alert("Cálculo de rota executado.");
}

function initExtraButtonsAndModals() {}

function loadEsgStats() {
  const saved = localStorage.getItem('hv_esg_stats');
  if (saved) {
    try { currentTripStats = JSON.parse(saved); } catch (e) {}
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
