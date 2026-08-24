# Controle de versões — EV Planner Pro

## Fonte única
A versão canônica fica em `config.js`, em `EV_CONFIG.version`. O `index.html` não contém números de versão hardcoded.

## Regra 3.x
- **Alterou `index.html`**: abrir uma nova versão minor: `3.8.0` → `3.9.0`.
- **Alterou somente arquivos auxiliares** (`app.js`, `styles.css`, `vehicles.js`, etc.): incrementar o patch: `3.8.0` → `3.8.1` → `3.8.2`.
- Se uma release alterar `index.html` e outros arquivos ao mesmo tempo, prevalece a nova minor (ex.: `3.7.0`).

## Histórico
Sempre acrescente a nova entrada no início de `versionHistory` em `config.js`.

## Script
`node scripts/release-version.mjs 3.8 24/08/2026 "Descrição"` atualiza a versão de release e os metadados associados. Para patches, informe a versão completa no fluxo de release e mantenha a mesma regra de histórico.
