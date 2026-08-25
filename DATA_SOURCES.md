# EV Planner Pro 3.9.3 — Dados de combustível

A autonomia elétrica usada no planejamento continua priorizando INMETRO/PBEV. Para veículos com combustível, a autonomia de tanque cheio é uma **estimativa matemática**: capacidade do tanque × consumo rodoviário cadastrado para o combustível selecionado.

## Fontes principais consultadas nesta atualização

- INMETRO / PBE Veicular 2026: https://www.gov.br/inmetro/pt-br/assuntos/regulamentacao/avaliacao-da-conformidade/programa-brasileiro-de-etiquetagem/tabelas-de-eficiencia-energetica/veiculos-automotivos-pbe-veicular/
- Geely EX5 EM-i: https://www.geelybrasil.com.br/iesa/ex5-em-i
- GWM Haval PHEV19/PHEV35: fichas técnicas oficiais da GWM Motors Brasil.
- BYD: fichas técnicas e referências PBEV/INMETRO para King, Song Pro, Song Plus e Shark.
- Leapmotor C10 REEV: ficha técnica e referências INMETRO disponíveis no mercado brasileiro.
- Fiat Pulse/Fastback Hybrid: PBEV/INMETRO 2026.

## Regra de qualidade

Quando não foi possível confirmar de forma suficiente o consumo ou a capacidade de um modelo/versão, o campo permanece sem valor. O aplicativo não deve fabricar uma autonomia de combustível.

A autonomia com tanque cheio não substitui a autonomia INMETRO do modo elétrico. Para PHEV/REEV, o planejamento pode combinar sequencialmente a autonomia elétrica disponível e a autonomia de combustível calculada a partir dos litros informados pelo usuário.
