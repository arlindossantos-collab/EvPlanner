# EV Planner Pro 3.6

Planejador de viagens para veículos elétricos, híbridos, plug-in e REEV.

## Política de autonomia
A versão 3.6 usa **somente autonomia identificada como INMETRO/PBEV** nos cálculos de rota e energia. Dados CLTC, NEDC, WLTP ou números de catálogo sem confirmação no PBEV ficam preservados como `catalogRange`, apenas para referência, e não são usados como fallback.

O Inmetro informa que o PBEV é a base oficial de dados dos veículos leves participantes do Programa Brasileiro de Etiquetagem. A página oficial disponibiliza o ciclo 2026 e suas atualizações.

## Recarga
A compatibilidade AC/DC é armazenada por veículo. PHEV/PHEV Flex são AC-only por padrão, REEV é AC+DC por padrão e BEV é AC+DC por padrão, com possibilidade de exceções por modelo. O sistema não recomenda DC para um veículo AC-only.

## Versão
A única fonte do número da versão é `config.js`. O histórico também fica no `versionHistory` desse arquivo. O `index.html` apenas exibe a versão carregada em runtime.
