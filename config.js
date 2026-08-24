window.EV_CONFIG = {
  version: '3.7.0',
  versionHistory: [
    {version:'3.7',date:'24/08/2026',description:'Versão única no topo, autonomia INMETRO + referência do painel, horário de retorno, rota de volta em azul com lógica energética própria e estratégia automática de parada por nível de bateria.'},
    {version:'3.6',date:'24/08/2026',description:'Dados de autonomia priorizando INMETRO/PBEV, compatibilidade real de recarga por veículo (AC/DC), bloqueio de carregadores incompatíveis e rastreabilidade da fonte dos dados.'},
    {version:'3.5',date:'24/08/2026',description:'Distribuição inteligente de eletropostos ao longo de toda a rota, busca reforçada no trecho final/destino e versão centralizada em uma única fonte.'},
    {version:'3.4',date:'24/08/2026',description:'Planejamento inteligente: viabilidade, paradas recomendadas, custo/tempo, nível de segurança, rota colorida por energia/combustível e pontos de abastecimento.'},
    {version:'3.3',date:'24/08/2026',description:'Performance aprimorada, cache inteligente de buscas, rotas recentes, validação, gerenciamento de pontos manuais, filtros de carregamento e atualização do PWA.'},
    {version:'3.2',date:'23/08/2026',description:'Favoritos de veículo e rota, escolha de origem/destino, resumo detalhado, busca de pontos no mapa, otimização de desempenho e interface mobile mais compacta.'},
    {version:'3.1',date:'23/08/2026',description:'Logo da aplicação, bateria 0–100%, combustível condicional, busca ampliada de eletropostos, cadastro manual e mensagem de cálculo concluído.'},
    {version:'3.0',date:'23/08/2026',description:'Nova base do EV Planner Pro com planejamento de rotas, energia, custos, mapa, eletropostos, PDF, backup e PWA.'}
  ],
  reservePercent: 15,
  stopBatteryPercent: 20,
  stationRadiusKm: 18,
  stationWideRadiusKm: 40,
  stationSamplePoints: 18,
  stationDestinationSamplePoints: 7,
  stationDestinationRadiusKm: 28,
  fuelSamplePoints: 8,
  geocodeDebounce: 350,
  requestTimeoutMs: 9000,
  routeCacheTtlMs: 15*60*1000,
  stationCacheTtlMs: 30*60*1000,
  dataPolicy: {rangeSource:'INMETRO_PBEV', rangeFallback:false, currentCycle:'PBEV 2026 - 18º ciclo', currentCycleDate:'19/08/2026', sourceUrl:'https://www.gov.br/inmetro/pt-br/assuntos/regulamentacao/avaliacao-da-conformidade/programa-brasileiro-de-etiquetagem/tabelas-de-eficiencia-energetica/veiculos-automotivos-pbe-veicular'},
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
