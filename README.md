# EV Planner Pro 3.0

Versão evoluída do EV Planner Pro, reorganizada como aplicação web estática e PWA.

## Arquivos
- `index.html` — interface.
- `styles.css` — visual responsivo.
- `app.js` — lógica de rota, energia, custos, clima, eletropostos, ESG, favoritos e backup.
- `config.js` — parâmetros e endpoints externos.
- `vehicles.js` — base de veículos incorporada ao projeto.
- `vehicles.json` — base em JSON para integração futura.
- `manifest.webmanifest` + `sw.js` + `icon.svg` — instalação como PWA/cache básico.

## Recursos 3.0
- Base de veículos por marca/modelo/versão.
- BEV, HEV, PHEV, MHEV e REEV.
- Autocomplete de endereços.
- Múltiplas paradas/destinos e ordenação por arrastar.
- Ida e volta.
- Rota via OSRM + Leaflet/OpenStreetMap.
- Estimativa energética com modo de condução, ar-condicionado, chuva e relevo.
- Custos de eletricidade, gasolina e etanol.
- Alcance inicial no mapa.
- Eletropostos próximos à rota via base manual + OpenStreetMap/Overpass.
- Clima via Open-Meteo.
- Favoritos, Casa/Trabalho, veículo favorito.
- Backup/importação em JSON.
- PDF e cópia do resumo.
- Histórico ESG local.
- PWA instalável quando servido por HTTPS/localhost.

## Como executar
Para uso simples, abra `index.html`. Para habilitar PWA/service worker, execute um servidor local na pasta, por exemplo:

`python -m http.server 8080`

Depois abra `http://localhost:8080`.

## Observação importante
A base de veículos foi gerada a partir da planilha de referência do projeto. Campos sem informação permanecem como não informados. Quando o consumo elétrico não existe, o planejador calcula uma estimativa matemática a partir de bateria/autonomia e sinaliza isso na interface.

Os serviços de geocodificação, roteamento, clima e eletropostos são serviços públicos externos e podem impor limites, indisponibilidade ou alterações de API.
