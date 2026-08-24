# EV Planner Pro 3.7

Planejador de viagens para veículos elétricos, híbridos, plug-in e REEV.

## Política de autonomia
A versão 3.7 usa **somente autonomia identificada como INMETRO/PBEV** nos cálculos de rota e energia. Dados CLTC, NEDC, WLTP ou números de catálogo sem confirmação no PBEV ficam preservados como `catalogRange`, apenas para referência, e não são usados como fallback.

O Inmetro informa que o PBEV é a base oficial de dados dos veículos leves participantes do Programa Brasileiro de Etiquetagem. A página oficial disponibiliza o ciclo 2026 e suas atualizações.

## Recarga
A compatibilidade AC/DC é armazenada por veículo. PHEV/PHEV Flex são AC-only por padrão, REEV é AC+DC por padrão e BEV é AC+DC por padrão, com possibilidade de exceções por modelo. O sistema não recomenda DC para um veículo AC-only.

## Versão
A única fonte do número da versão é `config.js`. O histórico também fica no `versionHistory` desse arquivo. O `index.html` apenas exibe a versão carregada em runtime.

## Novidades da 3.7
- Uma única indicação visual de versão no topo, alimentada por `config.js`.
- Regra de versionamento minor/patch documentada para alterações no `index.html` e nos arquivos auxiliares.
- Ícones de data e horário com contraste reforçado.
- Ida e volta com horário de saída da volta.
- Rota de volta em azul, mantendo a lógica de reserva, recarga, combustível e risco.
- Exibição simultânea de autonomia INMETRO/PBEV e autonomia informada pelo painel do veículo.
- Autonomia do painel é armazenada por veículo e serve como referência; o cálculo oficial continua baseado no INMETRO/PBEV.
- Estratégia de parada configurável por percentual de bateria, com indicação do ponto compatível recomendado próximo do gatilho.
