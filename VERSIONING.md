# Controle de versões

1. Edite o código normalmente.
2. Antes de publicar uma alteração do `index.html`, incremente `EV_CONFIG.version` em `config.js`.
3. Acrescente uma entrada no início de `versionHistory` com versão, data e descrição.
4. O `index.html` não deve conter números de versão hardcoded.
5. O Service Worker e o manifesto devem acompanhar a versão de release.

A interface lê a versão exclusivamente de `config.js`, evitando duplicidade.
