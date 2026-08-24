# EV Planner Pro — Histórico de versões

## 3.8.0 — 24/08/2026
- “Ida e volta” agora exige **data e horário de saída da volta**.
- Validação para impedir data de retorno anterior à data da ida.
- Ida e volta passam a ser obtidas como rotas independentes, preservando o planejamento energético existente.
- Novo segundo mapa exclusivo para a volta.
- Mapa da ida e mapa da volta usam a mesma lógica de cores por autonomia/combustível, com a volta diferenciada em azul.
- Mantidas todas as funcionalidades anteriores.

# EV Planner Pro — Changelog

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
