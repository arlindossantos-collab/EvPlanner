# EV Planner Pro — Changelog

## 3.3.0 — 24/08/2026

### Performance
- Cache persistente com expiração para geocodificação, rotas e eletropostos.
- Cancelamento de buscas anteriores e timeout de requisições externas.
- Consulta de eletropostos em paralelo nos endpoints Overpass disponíveis.
- Mais amostras da rota para localizar carregadores sem multiplicar chamadas.
- Cache da rota para evitar recalcular o mesmo percurso repetidamente.

### Experiência
- Histórico de versões atualizado no topo do `index.html`.
- Viagens recentes com restauração rápida.
- Botão de Ajuda atualizado.
- Mensagem de progresso durante busca de eletropostos.
- Filtro de carregadores por conector.
- Gerenciamento de pontos manuais: editar e excluir.
- Validação e prevenção de requisições duplicadas durante o cálculo.

### Compatibilidade
- Mantidas as funcionalidades da 3.2: favoritos de veículo e locais, bateria 0–100%, combustível condicional, pontos manuais, seleção no mapa, resumo detalhado, backup, PDF, ESG, navegação e PWA.

## 3.2.0
- Favoritos de veículo e rota.
- Casa/Trabalho com escolha entre origem e destinos.
- Resumo detalhado.
- Busca e cadastro de pontos de carregamento.
- Melhorias de performance e interface mobile.

## 3.1.0
- Logo fornecida pelo usuário.
- Bateria inicial 0–100%.
- Combustível condicional.
- Busca ampliada de eletropostos.
- Cadastro manual de eletropostos.
- Mensagem “Cálculo concluído”.

## 3.0.0
- Base do EV Planner Pro com rotas, energia, custos, mapa, eletropostos, PDF, backup e PWA.
