# EV Planner Pro — Changelog

## 3.9.2 — 25/08/2026
- Revisada a lógica de PHEV, PHEV Flex e REEV: a autonomia da viagem passa a considerar sequencialmente a autonomia elétrica disponível + a autonomia proporcionada pelos litros de combustível informados.
- A bateria pode chegar a 0% no meio/final da rota sem tornar a viagem automaticamente inviável, desde que exista autonomia de combustível suficiente para completar o trecho.
- O Plano Inteligente informa aproximadamente em qual km a autonomia elétrica termina e quantos km de autonomia de combustível permanecem.
- A validação não exige mais que a bateria permaneça acima da reserva quando o trecho restante é coberto pelo motor a combustão.
- Adicionados dados PBEV/INMETRO de consumo e tanque para vários PHEV presentes no cadastro, sem misturar autonomia elétrica INMETRO com autonomia combinada NEDC/WLTP.
- Modelos híbridos sem consumo PBEV cadastrado continuam sendo tratados de forma conservadora, sem inventar autonomia de combustível.
- Campo de combustível passa a respeitar a capacidade do tanque quando esse dado está cadastrado.
- Service Worker atualizado para 3.9.2.


## 3.9.1 — 25/08/2026
- Corrigida a validação do Plano Inteligente: uma chegada com bateria acima da reserva não gera mais recomendação indevida de nova carga.
- A decisão de recarregar/abastecer passa a usar o estado energético estimado na chegada, e não apenas a existência de carregadores na rota.
- Veículos híbridos exibem automaticamente o campo de litros de combustível ao serem selecionados.
- O cálculo dos híbridos combina autonomia elétrica e autonomia de combustão, incluindo os litros iniciais informados.
- Adicionado seletor de gasolina/etanol para o cálculo de custo.
- Status da viagem passa a validar também combustível e margem de reserva para PHEV/REEV/HEV/MHEV.
- Service Worker atualizado para 3.9.1.

## 3.9.0 — 25/08/2026
- Revisão dos cálculos de autonomia e viabilidade de viagem.
- Autonomia elétrica prioriza exclusivamente os dados INMETRO/PBEV cadastrados.
- Para veículos híbridos que utilizam combustível, os litros informados pelo usuário entram na autonomia geral da viagem.
- A autonomia combinada considera a parcela elétrica disponível e a autonomia proporcionada pelo combustível.
- O cálculo deixa de usar consumo de combustível genérico quando não há dado confiável cadastrado.
- Mantida a entrada de litros iniciais para veículos com motor a combustão.
- Mantidas as funcionalidades de mapas, ida e volta, eletropostos, estratégia de parada, compatibilidade AC/DC e histórico de versões.

## 3.8.3 — 24/08/2026
- Corrigido o erro `returnText is not defined` ao renderizar o planejamento inteligente.
- Criada uma função própria para gerar a estratégia da volta sem depender de variável inexistente.
- A recomendação da volta agora informa o ponto compatível sugerido, o nível aproximado da bateria na chegada ao ponto e um alvo de recarga para continuar com margem de segurança.
- Mantida a compatibilidade AC/DC e o mapeamento de eletropostos da volta.

## 3.8.2 — 24/08/2026
- Eletropostos mapeados também no mapa da volta.
- Busca ampliada de carregadores na rota de retorno.
- Sugestão automática de parada para recarga na volta, considerando reserva de bateria e compatibilidade AC/DC.
- Lista de pontos da volta com distância, potência e tipo.

## 3.8.2 — 24/08/2026
- Eletropostos mapeados também no mapa da volta.
- Busca ampliada de carregadores na rota de retorno.
- Sugestão automática de parada para recarga na volta, considerando reserva de bateria e compatibilidade AC/DC.
- Lista de pontos da volta com distância, potência e tipo.

# EV Planner Pro — Histórico de versões

## 3.8.0 — 24/08/2026
- “Ida e volta” agora exige **data e horário de saída da volta**.
- Validação para impedir data de retorno anterior à data da ida.
- Ida e volta passam a ser obtidas como rotas independentes, preservando o planejamento energético existente.
- Novo segundo mapa exclusivo para a volta.
- Mapa da ida e mapa da volta usam a mesma lógica de cores por autonomia/combustível, com a volta diferenciada em azul.
- Mantidas todas as funcionalidades anteriores.



## 3.8.4 — 25/08/2026
- Híbridos plug-in e REEV passam a combinar a autonomia elétrica disponível com o combustível informado no início da viagem.
- A autonomia total disponível passa a ser calculada como autonomia elétrica restante + autonomia proporcionada pelos litros de combustível disponíveis.
- O cálculo informa litros de combustível necessários, combustível estimado na chegada e eventual déficit de combustível quando a rota excede a autonomia disponível.
- O painel de resumo passa a mostrar a autonomia total disponível para veículos híbridos e o combustível adicional necessário, quando aplicável.
- A estratégia de viabilidade passa a considerar explicitamente a autonomia combinada antes de classificar a viagem como inviável.


## 3.8.1 — 24/08/2026
- Corrigida a referência ausente `routeEnergyLimits`, que causava o erro ao calcular viagens de ida e volta.
- Corrigido o fluxo de renderização do segundo mapa, garantindo `invalidateSize()` após o card da volta ficar visível.
- A rota de volta passa a ser desenhada somente após o mapa estar dimensionado, evitando mapa vazio ou tiles incorretamente renderizados.


## 3.6 — 24/08/2026
- Autonomia de planejamento passa a aceitar somente dados identificados como INMETRO/PBEV.
- Valores de catálogo sem confirmação no PBEV são preservados em `catalogRange`, mas não entram nos cálculos.
- Metadados de origem/ciclo da autonomia adicionados ao cadastro de veículos.
- Compatibilidade de recarga AC/DC passa a ser considerada por veículo.
- PHEV/PHEV Flex são tratados como AC-only por padrão; REEV como AC+DC por padrão; HEV/MHEV não aparecem como veículos recarregáveis externamente.
- Filtros e recomendações de eletropostos passam a excluir automaticamente carregadores incompatíveis.
- BYD King GL/GS passa a usar autonomia PBEV de 35/78 km, em vez do valor genérico de 80 km.
- Baterias do King GL/GS atualizadas para 8,3/18,3 kWh conforme fabricante; a autonomia usada continua sendo a do PBEV.
- Leapmotor B10 288 km e C10 REEV 111 km passam a ser identificados como referência INMETRO/PBEV.
- Cache de eletropostos invalidado para a 3.6.
- Versão continua tendo uma única fonte em `config.js`; o histórico fica no mesmo arquivo.

## 3.5 — 24/08/2026
- Distribuição inteligente de eletropostos ao longo de toda a rota.
