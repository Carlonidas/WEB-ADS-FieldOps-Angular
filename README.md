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

## O que foi praticado

- Componentes standalone com templates HTML e interpolação;
- rotas para dashboard, inspeções, planejamento, cadastros, checklists e revisão;
- formulários com `FormsModule` e `[(ngModel)]`;
- serviço injetável para compartilhar dados entre telas;
- diretivas como `*ngFor` e `*ngIf`;
- persistência local demonstrativa usando `localStorage`.

Clientes, locais, equipamentos, modelos e inspeções são dados fictícios. Não há login real nem sincronização entre navegadores.
