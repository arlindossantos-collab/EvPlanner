# EV Planner Pro 3.1

Atualização da versão 3.0 com foco em legibilidade, bateria inicial, veículos com combustível e gestão de eletropostos.

## Principais melhorias
- Logo fornecida pelo usuário aplicada à interface e ao PWA.
- Tipografia maior e layout inspirado no dashboard visual de referência.
- Bateria inicial limitada de 0 a 100, com campo destacado, botões +/- e slider.
- Campo de combustível aparece somente para veículos que não são 100% elétricos.
- Busca ampliada de eletropostos ao longo da rota, com múltiplas amostras e fontes Overpass.
- Cadastro manual de eletropostos com nome, marca, modelo, tipo, potência, preço, quantidade de pontos, cidade, conector, coordenadas e observações.
- Pontos manuais ficam salvos no navegador e podem ser usados em viagens futuras.
- Mensagem visual e toast "Cálculo concluído" após o cálculo da rota.
- Backup inclui os pontos manuais.

## Arquivos
- index.html
- styles.css
- app.js
- config.js
- vehicles.js
- vehicles.json
- manifest.webmanifest
- sw.js
- icon.svg
- logo.png

## Execução
Abra `index.html` ou, para PWA/service worker, execute `python -m http.server 8080` e acesse `http://localhost:8080`.

Os serviços de geocodificação, roteamento, clima e eletropostos são públicos e dependem de internet e disponibilidade das APIs.
