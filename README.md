
# Golaço Solfácil (Front-end estático • Demo)

Este projeto é um **simulacro estático** (HTML/CSS/JS) para apresentar o layout ao cliente **antes de conectar na API**.

## Páginas

- `index.html` — Landing Page
- `dashboard.html` — Área Logada (demo) com seletor de perfil (**Integrador** / **Cliente final**)

## Como rodar

> Dica: evite abrir via `file://` quando for usar `fetch()` no futuro. Para a demo atual, funciona em qualquer servidor local.

### Opção 1: VS Code (Live Server)
1. Instale a extensão **Live Server**
2. Clique com o botão direito em `index.html` → **Open with Live Server**

### Opção 2: Python
```bash
python -m http.server 8080
```
Abra no navegador:
- `http://localhost:8080/index.html`
- `http://localhost:8080/dashboard.html`

## Onde trocar do MOCK para API (OpenAPI)

Atualmente os dados são mocks em:
- `assets/js/demo.js`

Quando a API estiver pronta, o caminho mais simples é:
1. Substituir os objetos `DEMO`/`FAQ` por chamadas `fetch()` para os endpoints.
2. Mapear os campos retornados da API para os `data-*` já existentes no HTML.

Sugestão: manter um modo demo por querystring:
- `dashboard.html?demo=1`

