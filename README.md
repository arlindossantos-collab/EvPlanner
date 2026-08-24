# EV Planner Pro 3.2

Versão atualizada do EV Planner Pro, preservando a base de veículos e as funcionalidades anteriores e acrescentando melhorias de usabilidade, favoritos, pontos manuais, resumo detalhado e performance.

## Principais melhorias da 3.2

- Histórico discreto de versões no topo da interface, mostrando as alterações das versões 3.0, 3.1 e 3.2.
- O histórico fica dentro do próprio `index.html`, facilitando sua atualização sempre que a interface receber uma nova versão.

- Favorito do veículo com estrela preenchida quando salvo.
- Layout mais compacto no celular, reduzindo a altura das seções.
- Botão **Adicionar a favoritos** para cadastrar Casa e Trabalho.
- Ao usar Casa ou Trabalho, o usuário escolhe **Origem** ou um dos **Destinos**.
- Resumo da viagem com informações detalhadas de rota, veículo, energia, combustível, custos e condições.
- Cadastro manual de carregadores com endereço pesquisável ou seleção diretamente no mapa.
- Pontos manuais persistidos no navegador e incluídos no backup.
- Busca de eletropostos otimizada com consulta agrupada, cache local e expansão sob demanda pelo botão **Buscar mais**.
- Autocomplete de endereços com debounce, cancelamento de requisições anteriores e cache.
- Geocodificação de múltiplos pontos da rota em paralelo.
- O cálculo principal é liberado antes das buscas secundárias de eletropostos/clima terminarem, melhorando a percepção de velocidade.
- Mensagem **Cálculo concluído** mantida após o cálculo da rota.
- PWA atualizado para 3.2, com nova versão do cache do service worker para garantir que alterações do `index.html` sejam carregadas após uma atualização.

## Arquivos

- `index.html` — interface
- `styles.css` — layout e responsividade
- `app.js` — lógica da aplicação
- `config.js` — configurações e serviços
- `vehicles.js` / `vehicles.json` — base de veículos
- `logo.png` — logo fornecida para a aplicação
- `manifest.webmanifest` — PWA
- `sw.js` — cache/offline do PWA
- `icon.svg` — ícone auxiliar

## Execução

Para testar corretamente o PWA e o service worker, use um servidor HTTP local em vez de abrir o HTML diretamente como `file://`.

Exemplo:

```bash
python -m http.server 8080
```

Depois abra `http://localhost:8080/`.

## Performance

A busca de carregadores é a operação externa mais pesada. A versão 3.2 evita várias consultas sequenciais: a rota é amostrada em pontos representativos e os carregadores são consultados em uma única consulta agrupada ao Overpass, com fallback de endpoint. Os resultados são armazenados em cache durante a sessão. O botão **Buscar mais** amplia o raio apenas quando necessário.
