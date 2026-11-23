# Field Ops em Angular

Replica do protótipo Field Ops feita com Angular standalone e Angular Router. A aplicação não tem backend: os dados demonstrativos são mantidos no `localStorage` do navegador.

## Executar localmente

Requer Node.js compatível com Angular 22 e npm.

```bash
npm install
npm start
```

Abra `http://localhost:4200/`. Para gerar a versão de produção:

```bash
npm run build
```

## Publicar no GitHub Pages

O workflow do GitHub Actions gera o build com o caminho do repositório, inclui um fallback para as rotas do Angular e publica os arquivos estáticos na branch `gh-pages`.

1. Em **Settings → Pages**, selecione **Deploy from a branch**, escolha `gh-pages` e a pasta `/(root)`.
2. Em **Settings → Actions → General**, permita que o `GITHUB_TOKEN` tenha acesso de leitura e escrita ao conteúdo do repositório.
3. Envie alterações para `main` ou execute manualmente o workflow **Deploy Angular to GitHub Pages** na aba **Actions**.

Quando a publicação terminar, acesse <https://carlonidas.github.io/WEB-ADS-FieldOps-Angular/>.

## O que foi praticado

- Componentes standalone com templates HTML e interpolação;
- componentes reutilizáveis de navegação, indicadores, status, filtros e estados vazios;
- rotas para dashboard, inspeções, planejamento, cadastros, checklists e revisão;
- formulários com `FormsModule` e `[(ngModel)]`;
- serviço injetável para compartilhar dados entre telas;
- diretivas como `*ngFor` e `*ngIf`;
- persistência local demonstrativa usando `localStorage`.

Clientes, locais, equipamentos, modelos e inspeções são dados fictícios. Não há login real nem sincronização entre navegadores.
