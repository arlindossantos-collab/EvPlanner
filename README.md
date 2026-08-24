# EV Planner Pro 3.5

O EV Planner Pro 3.5 evolui de um calculador de autonomia para um planejador inteligente de viagens.

## O que há de novo
- Análise automática de viabilidade da viagem.
- Rota colorida por condição energética: autonomia segura, reserva, trecho a combustível e autonomia insuficiente.
- Plano inteligente com recomendação de parada, custo, tempo, estratégia energética e nível de segurança.
- Busca de postos de combustível para veículos híbridos/REEV/MHEV.
- Recomendação de eletroposto baseada em posição na rota, potência e preço quando disponíveis.
- Estimativa de combustível inicial e chegada para veículos com combustão.
- Favorito de veículo com estrela preenchida em dourado quando salvo.
- Mantidas as funcionalidades da 3.3: favoritos de rota, Casa/Trabalho, pontos manuais, busca no mapa, cache, viagens recentes, PDF, backup, ESG e PWA.

## Observação
As recomendações são estimativas de planejamento. Dados de preço, disponibilidade e potência de pontos públicos dependem das fontes externas disponíveis no momento da consulta.

## Execução
Sirva a pasta por HTTP/HTTPS para permitir mapas, APIs externas e Service Worker. Exemplo: `python -m http.server 8080`.


## Controle de versão
A versão canônica fica em `config.js`. O `index.html` não duplica mais o número da versão; o topo, título, descrição, rodapé e histórico são preenchidos automaticamente pelo `app.js` usando `EV_CONFIG.version` e `EV_CONFIG.versionHistory`.

## Distribuição de eletropostos
A 3.5 amostra a rota em mais pontos, concentra buscas adicionais nos 30% finais e usa um raio dedicado próximo ao destino, reduzindo a concentração de resultados apenas no início/meio da viagem.
