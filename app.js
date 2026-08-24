/* ==========================================================================
   EV PLANNER PRO - CORE ENGINE (app.js)
   Base Completa de Veículos Nativa + Suporte a vehicles.json + PlugShare/ABRP
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

// Base Completa de Veículos Integrada (Nativa para Contingência & Resiliência Total)
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
  "Leapmotor": [
    { model: 'T03 Compact BEV', type: 'BEV (100% Elétrico)', battery: 36.5, range: 265, consumption: 13.8, isHybrid: false },
    { model: 'C10 SUV BEV', type: 'BEV (100% Elétrico)', battery: 69.9, range: 420, consumption: 16.6, isHybrid: false },
    { model: 'C10 REEV (Range Extender)', type: 'PHEV (Híbrido Plug-in)', battery: 28.4, range: 140, consumption: 15.2, isHybrid: true, gasKm: 20.5, ethanolKm: 14.5 },
    { model: 'B10 SUV BEV', type: 'BEV (100% Elétrico)', battery: 62.0, range: 380, consumption: 16.3, isHybrid: false },
    { model: 'C11 SUV BEV', type: 'BEV (100% Elétrico)', battery: 85.4, range: 460, consumption: 18.5, isHybrid: false },
    { model: 'C16 Crossover BEV', type: 'BEV (100% Elétrico)', battery: 75.0, range: 410, consumption: 18.2, isHybrid: false }
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
    { model: 'Megane E-Tech', type: 'BEV (100% Elétrico)', battery: 60.0, range: 337, consumption: 17.8, isHybrid: false },
    { model: 'Kangoo E-Tech', type: 'BEV (100% Elétrico)', battery: 45.0, range: 210, consumption: 21.4, isHybrid: false }
  ],
  "Hyundai": [
    { model: 'Kona Electric (39 kWh)', type: 'BEV (100% Elétrico)', battery: 39.2, range: 252, consumption: 15.5, isHybrid: false },
    { model: 'Kona Electric (64 kWh)', type: 'BEV (100% Elétrico)', battery: 64.0, range: 305, consumption: 20.9, isHybrid: false },
    { model: 'Ioniq 5 AWD', type: 'BEV (100% Elétrico)', battery: 77.4, range: 380, consumption: 20.3, isHybrid: false },
    { model: 'Ioniq Hybrid', type: 'HEV (Híbrido Convencional)', battery: 1.56, range: 20, consumption: 8.3, isHybrid: true, gasKm: 18.9, ethanolKm: 13.0 }
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
  "Peugeot & Citroën": [
    { model: 'Peugeot e-208 GT', type: 'BEV (100% Elétrico)', battery: 50.0, range: 220, consumption: 22.7, isHybrid: false },
    { model: 'Peugeot e-2008 GT', type: 'BEV (100% Elétrico)', battery: 50.0, range: 234, consumption: 21.3, isHybrid: false },
    { model: 'Citroën e-Jumpy', type: 'BEV (100% Elétrico)', battery: 75.0, range: 280, consumption: 26.7, isHybrid: false }
  ],
  "JAC Motors": [
    { model: 'e-JS1 Compact', type: 'BEV (100% Elétrico)', battery: 30.2, range: 161, consumption: 18.7, isHybrid: false },
    { model: 'e-JS4 SUV', type: 'BEV (100% Elétrico)', battery: 55.0, range: 256, consumption: 21.4, isHybrid: false },
    { model: 'e-J7 Sedan', type: 'BEV (100% Elétrico)', battery: 50.1, range: 240, consumption: 20.8, isHybrid: false }
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
  { name: "Eletroposto BR-101 - Caaporã", network: "Neoenergia Corredor", cityState: "Caaporã / PB", lat: -7.4215, lng: -34.9102, powerKw: 50, plugType: "CCS2", power: "CCS2 Rápido DC (50kW)", type: "DC", operationalStatus: "Disponível" },
  { name: "Shell Recharge - Posto Via Sul BR-101", network: "Shell Recharge", cityState: "Conde / PB", lat: -7.2581, lng: -34.8912, powerKw: 150, plugType: "CCS2 High Power", power: "CCS2 Ultra-Rápido DC (150kW)", type: "DC", operationalStatus: "Disponível" },
  { name: "Manaíra Shopping - Hub Zletric", network: "Zletric", cityState: "João Pessoa / PB", lat: -7.0984, lng: -34.8391, powerKw: 60, plugType: "CCS2 / Type 2", power: "CCS2 Ultra-Rápido DC (60kW)", type: "DC", operationalStatus: "Disponível" },
  { name: "Volvo Recharge - Mangabeira Shopping", network: "Volvo Recharge", cityState: "João Pessoa / PB", lat: -7.1610, lng: -34.8361, powerKw: 50, plugType: "CCS2", power: "CCS2 Rápido DC (50kW)", type: "DC", operationalStatus: "Disponível" },
  { name: "Planeta Charger - Rei das Coxinhas", network: "Planeta Charger", cityState: "Gravatá / PE", lat: -8.1888, lng: -35.5069, powerKw: 120, plugType: "CCS2 / Type 2", power: "CCS2 Ultra-Rápido DC (120kW)", type: "DC", operationalStatus: "Disponível" },
  { name: "Eletroposto BR-101", network: "Eletrobras", cityState: "Maceió / AL", lat: -9.6658, lng: -35.7353, powerKw: 50, plugType: "CCS2 / CHAdeMO", power: "CCS2 Rápido DC (50kW)", type: "DC", operationalStatus: "Disponível" },
  { name: "Shell Recharge Center", network: "Shell Recharge", cityState: "Aracaju / SE", lat: -10.9472, lng: -37.0731, powerKw: 150, plugType: "CCS2 High Power", power: "CCS2 Ultra-Rápido DC (150kW)", type: "DC", operationalStatus: "Disponível" },
  { name: "Eletroposto BR-324", network: "EZVolt", cityState: "Salvador / BA", lat: -12.9714, lng: -38.5014, powerKw: 150, plugType: "CCS2", power: "CCS2 Ultra-Rápido DC (150kW)", type: "DC", operationalStatus: "Disponível" },
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
let activeRouteData = null;
let evDatabase = fullEvDatabase; // Inicializa de antemão com o catálogo estendido nativo

function getBatteryColorHex(pct) {
  const p = Math.max(0, Math.min(100, pct));
  if (p >= 80) return "#10b981"; // Verde
  if (p >= 45) return "#f59e0b"; // Amarelo
  if (p >= 21) return "#f97316"; // Laranja
  return "#ef4444";             // Vermelho
}

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
    const response = await fetch('./vehicles.json');
    if (response.ok) {
      const data = await response.json();
      if (data && Object.keys(data).length > 0) {
        evDatabase = data;
      }
    }
  } catch (error) {
    console.warn("Utilizando catálogo nativo de veículos.");
  } finally {
    initVehicleSelectors();
  }
}

function initVehicleSelectors() {
  const brandSelect = document.getElementById('brandSelect');
  const modelSelect = document.getElementById('modelSelect');
  if (!brandSelect || !modelSelect) return;

  brandSelect.innerHTML = '<option value="">Selecione a marca...</option>';
  modelSelect.innerHTML = '<option value="">Selecione modelo...</option>';
  modelSelect.disabled = true;

  const brands = Object.keys(evDatabase).sort();
  if (brands.length === 0) return;

  brands.forEach(brand => {
    const option = document.createElement('option');
    option.value = brand;
    option.textContent = brand;
    brandSelect.appendChild(option);
  });

  brandSelect.addEventListener('change', (e) => {
    const brand = e.target.value;
    modelSelect.innerHTML = '<option value="">Selecione modelo...</option>';
    if (!brand || !evDatabase[brand]) { modelSelect.disabled = true; return; }
    modelSelect.disabled = false;
    
    evDatabase[brand].forEach((car, index) => {
      const option = document.createElement('option');
      option.value = index;
      
      const modelName = car.model || car.name || `Modelo ${index + 1}`;
      const carType = car.type ? ` (${car.type.split(' ')[0]})` : '';
      option.textContent = `${modelName}${carType}`;
      
      modelSelect.appendChild(option);
    });
  });

  modelSelect.addEventListener('change', (e) => {
    const brand = brandSelect.value;
    const index = e.target.value;
    if (brand && index !== "" && evDatabase[brand] && evDatabase[brand][index]) {
      selectedCar = evDatabase[brand][index];
      updateCarSpecsUI();
    }
  });

  // Autoseleção padrão para BYD Dolphin GS
  if (evDatabase["BYD"]) {
    brandSelect.value = "BYD";
    brandSelect.dispatchEvent(new Event('change'));
    let defaultIdx = 2; // Index do Dolphin GS
    if (evDatabase["BYD"][defaultIdx]) {
      modelSelect.value = defaultIdx.toString();
      modelSelect.dispatchEvent(new Event('change'));
    }
  } else if (brands.length > 0) {
    brandSelect.value = brands[0];
    brandSelect.dispatchEvent(new Event('change'));
    if (evDatabase[brands[0]] && evDatabase[brands[0]].length > 0) {
      modelSelect.value = "0";
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
  if (countLabel) countLabel.innerText = "Mapeando eletropostos no trajeto e destino...";
  
  const routeCoords = routeGeometry.coordinates;
  const uniqueMap = new Map();

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

  const samplePoints = [];
  const numSamples = Math.min(8, Math.max(2, Math.floor(routeCoords.length / 150)));
  const step = Math.floor(routeCoords.length / numSamples);

  for (let i = 0; i < routeCoords.length; i += step) {
    samplePoints.push(routeCoords[i]);
  }
  if (routeCoords.length > 0) samplePoints.push(routeCoords[routeCoords.length - 1]);

  const queryPromises = samplePoints.map(async (pt, index) => {
    const lat = pt[1];
    const lng = pt[0];
    const isDestinationPoint = (index === samplePoints.length - 1);
    const searchRadius = isDestinationPoint ? 0.8 : 0.6;

    const bbox = `${lat - searchRadius},${lng - searchRadius},${lat + searchRadius},${lng + searchRadius}`;

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
            const maxAllowedDist = isDestinationPoint ? 25 : 20;

            if (routeMatch.minDistance <= maxAllowedDist) {
              const tags = item.tags || {};
              const name = tags.name || tags.operator || tags.brand || `Eletroposto ${isDestinationPoint ? 'Destino' : 'Rota'}`;
              const network = tags.operator || tags.brand || "Rede Aberta";
              const isDC = tags['socket:ccs'] || tags['socket:type2_combo'] || (tags.description && tags.description.toLowerCase().includes('dc'));
              const powerKw = isDC ? 60 : 22;

              uniqueMap.set(key, {
                id: item.id,
                name: name,
                network: network,
                cityState: isDestinationPoint ? 'Área de Chegada (Destino)' : `Rodovia BR (${elLat.toFixed(2)}, ${elLng.toFixed(2)})`,
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
  if (countLabel) countLabel.innerText = `${fetchedStations.length} eletropostos encontrados`;

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
    let colorHex = getBatteryColorHex(battAtArrival);

    let abrpPlanMsg = "Ponto de Passagem";
    let chargeTimeMinutes = 0;
    
    if (station.routeKm > initialRangeKm || battAtArrival < 20) {
      const targetPct = 80;
      const neededPct = Math.min(80, Math.max(20, targetPct - battAtArrival));
      const energyNeededKwh = (neededPct / 100) * carBatteryCapacity;
      chargeTimeMinutes = Math.round((energyNeededKwh / (station.powerKw || 50)) * 60) + 5;
      abrpPlanMsg = `⚠️ Recarregar +${neededPct}% (~${chargeTimeMinutes} min) - Margem Segurança`;
    }

    const popupContent = `
      <div style="font-size:12px; font-family:sans-serif; color:#0f172a;">
        <strong style="color:#059669; font-size:13px;">#${index + 1} ${station.name}</strong><br>
        <b>Rede:</b> ${station.network}<br>
        <b>Plugue:</b> ${station.plugType} (${station.powerKw} kW)<br>
        <b>Local:</b> Km ${station.routeKm} da rota<br>
        <hr style="margin:4px 0;">
        <b>Telemetria ABRP:</b> Chegada em <b style="color:${colorHex}; font-size:13px;">${battAtArrival}%</b><br>
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
      <td class="p-2 text-center whitespace-nowrap font-bold" style="color:${colorHex}">${battAtArrival}%</td>
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
          const targetColor = getBatteryColorHex(arrivalBattPct);

          if (alertBox) alertBox.innerText = `Chegada com ${arrivalBattPct}% de bateria (Custo elétrico R$ ${tripCost.toFixed(2)})`;
          if (targetBox) {
            targetBox.innerText = `Chegada com ${arrivalBattPct}% restante`;
            targetBox.style.color = targetColor;
          }
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
          if (targetBox) {
            targetBox.innerText = `Recarga de +${neededRecharge}% necessária`;
            targetBox.style.color = "#ef4444";
          }
        } else {
          const remainingKm = electricRange - distKm;
          const arrivalBattPct = Math.max(0, Math.round((remainingKm / selectedCar.range) * 100));
          const targetColor = getBatteryColorHex(arrivalBattPct);

          if (alertBox) alertBox.innerText = `Chegada com ${arrivalBattPct}% de bateria (Valor R$ ${totalCost.toFixed(2)})`;
          if (targetBox) {
            targetBox.innerText = `Chegada com ${arrivalBattPct}% restante`;
            targetBox.style.color = targetColor;
          }
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

document.addEventListener('DOMContentLoaded', initMap);
