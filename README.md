# EV Planner Pro 3.10

Versão orientada à decisão: a aplicação responde se a viagem é viável, onde parar, quanto gastar, quanto tempo levar e qual estratégia é mais adequada.

## Principais melhorias
- Visão essencial/detalhada para reduzir sobrecarga visual.
- Plano inteligente com quatro perspectivas: mais rápida, mais barata, mais segura e menos paradas.
- Cálculo híbrido revisado: autonomia elétrica + autonomia a combustão, respeitando os litros informados.
- Quando a bateria elétrica acaba, o plano informa o km aproximado e a autonomia restante a combustível.
- Campo automático de combustível para veículos com combustão e consumo km/L editável quando a base não possui dado.
- Autonomia elétrica exibida como referência INMETRO quando disponível na base.
- Controle de versão centralizado em `config.js`; `index.html` não mantém cópia do número.
- Service Worker atualizado para 3.10.0.

## Execução
Sirva a pasta por HTTP/HTTPS, por exemplo: `python -m http.server 8080`.

## Observação
A aplicação não inventa disponibilidade em tempo real de eletropostos. Quando a fonte não fornece ocupação, ela é tratada como “não informada”. Autonomias e consumos devem ser interpretados conforme a qualidade dos dados da base.
