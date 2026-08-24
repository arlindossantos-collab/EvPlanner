# EV Planner Pro 3.8

Planejador de viagens para veículos elétricos, híbridos, plug-in e REEV.

## Política de autonomia
A versão 3.7 usa **somente autonomia identificada como INMETRO/PBEV** nos cálculos de rota e energia. Dados CLTC, NEDC, WLTP ou números de catálogo sem confirmação no PBEV ficam preservados como `catalogRange`, apenas para referência, e não são usados como fallback.

O Inmetro informa que o PBEV é a base oficial de dados dos veículos leves participantes do Programa Brasileiro de Etiquetagem. A página oficial disponibiliza o ciclo 2026 e suas atualizações.

## Recarga
A compatibilidade AC/DC é armazenada por veículo. PHEV/PHEV Flex são AC-only por padrão, REEV é AC+DC por padrão e BEV é AC+DC por padrão, com possibilidade de exceções por modelo. O sistema não recomenda DC para um veículo AC-only.

## Versão
A única fonte do número da versão é `config.js`. O histórico também fica no `versionHistory` desse arquivo. O `index.html` apenas exibe a versão carregada em runtime.

## Novidades da 3.8
- Uma única indicação visual de versão no topo, alimentada por `config.js`.
- Regra de versionamento minor/patch documentada para alterações no `index.html` e nos arquivos auxiliares.
- Ícones de data e horário com contraste reforçado.
- Ida e volta com horário de saída da volta.
- Rota de volta em azul, mantendo a lógica de reserva, recarga, combustível e risco.
- Exibição simultânea de autonomia INMETRO/PBEV e autonomia informada pelo painel do veículo.
- Autonomia do painel é armazenada por veículo e serve como referência; o cálculo oficial continua baseado no INMETRO/PBEV.
- Estratégia de parada configurável por percentual de bateria, com indicação do ponto compatível recomendado próximo do gatilho.


## 3.8 — Ida e volta com mapas separados
- Ao ativar “Ida e volta”, o sistema solicita **data e horário da volta**.
- A ida e a volta são calculadas como rotas independentes para visualização.
- O painel passa a exibir **dois mapas**, um para a ida e outro para a volta.
- A volta permanece azul e aplica a mesma lógica dinâmica de consumo, reserva, combustível e autonomia insuficiente.
- A versão continua centralizada em `config.js`; o `index.html` não mantém número de versão duplicado.
