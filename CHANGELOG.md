# EV Planner Pro — Histórico de versões

## 3.5.0 — 24/08/2026
- Versão centralizada em `config.js`: o `index.html` não mantém mais uma segunda cópia do número da versão.
- Histórico de versões renderizado dinamicamente a partir da configuração, mantendo o controle visível no topo sempre que a aplicação for atualizada.
- Busca de eletropostos redistribuída ao longo de toda a rota com amostragem adaptativa.
- Densidade extra de busca nos 30% finais da rota.
- Busca reforçada nas proximidades do destino, com raio dedicado maior.
- Correção do modo “Buscar mais”, que agora realmente utiliza o raio ampliado.
- Cache de eletropostos invalidado por estratégia de amostragem/versão para evitar resultados antigos e mal distribuídos.
- Mantidas as funcionalidades da 3.4 e anteriores.

# CHANGELOG — EV Planner Pro

## 3.4.0 — 24/08/2026
- Novo conceito de planejamento inteligente: “Consigo fazer essa viagem? Onde devo parar? Quanto vou gastar? Quanto tempo vou levar? Qual opção é mais segura e econômica?”.
- Rota com cores dinâmicas conforme a autonomia disponível.
- Verde: dentro da autonomia segura.
- Amarelo: reserva / parada preventiva recomendada.
- Laranja: trecho realizado com combustível em PHEV/REEV.
- Vermelho: autonomia insuficiente.
- Novo painel Plano Inteligente da Viagem.
- Busca de postos de combustível em rotas de veículos com combustão.
- Recomendação de eletroposto considerando distância na rota, potência e preço disponível.
- Estimativa de segurança operacional e estratégia energética.
- Estrela de favorito do veículo ajustada para dourado quando ativa.
- Mantidas todas as funcionalidades da 3.3.
