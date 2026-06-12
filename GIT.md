# Organização das branches — Atípicos

Guia prático para subir o trabalho ao repositório em **duas branches**:

| Branch | O que contém | Para quê |
|---|---|---|
| `feature/auth-cadastro` | **Sua parte definida**: backend Firebase + telas iniciais e de cadastro | Entrega oficial da sua função |
| `plano-b-completo` | **App inteiro navegável** (Kids + Responsável + Terapeuta) | "Plano B" caso a equipe não feche o app a tempo |

A ideia: as duas partem da **mesma base** (o projeto `rn-atipicos`). A diferença é o
quanto de tela interna cada uma traz. Assim, se o plano B for necessário, é só
mesclar; se não, sua branch entra limpa.

---

## 0. Antes de começar

```bash
# na raiz do repositório já clonado
git status              # confirme que está limpo
git checkout main       # ou 'master', conforme seu repo
git pull
```

> O projeto Expo fica na pasta `rn-atipicos/`. Copie a pasta que te entreguei para
> a raiz do repositório antes de seguir.

---

## 1. Branch `feature/auth-cadastro` (sua parte)

Esta branch leva **tudo que é seu**: backend + fluxo de autenticação/cadastro.
As áreas internas ficam apenas como o **placeholder** `AreaStubScreen` (pós-login),
sem as telas de Kids/Responsável/Terapeuta.

```bash
git checkout -b feature/auth-cadastro

# copie a pasta do app (sem as telas internas — veja a lista abaixo)
git add rn-atipicos/
git commit -m "feat: backend Firebase + telas iniciais e de cadastro

- Auth: login, cadastro (responsável/terapeuta), recuperação de senha (RF01-RF03)
- Firestore: perfis e crianças (RF04-RF06) + firestore.rules (RNF07/RNF08)
- Storage: upload de foto (RF18) + storage.rules
- Telas: Splash, Inicial, Cadastro, Login, Recuperação, Sucesso
- Navegação tipada (React Navigation) + tema fiel ao protótipo"

git push -u origin feature/auth-cadastro
```

**Arquivos que pertencem a esta branch** (auth + cadastro + backend):

```
rn-atipicos/
├─ App.tsx, app.json, package.json, tsconfig.json, babel.config.js
├─ .env.example, .gitignore, README.md, FIREBASE.md
├─ firestore.rules, storage.rules
├─ assets/logo-atipicos.png
└─ src/
   ├─ theme/            (colors.ts, typography.ts)
   ├─ navigation/       (types.ts, RootNavigator.tsx)
   ├─ constants/formData.ts
   ├─ utils/masks.ts
   ├─ services/         (firebase.ts, auth.ts, criancas.ts, storage.ts)
   ├─ components/       (Logo, BackButton, PrimaryButton, Field, SelectField,
   │                     ScreenContainer, FormScreen)
   └─ screens/
       ├─ SplashScreen.tsx
       ├─ InicialScreen.tsx
       ├─ CadastroEscolhaScreen.tsx
       ├─ LoginScreen.tsx
       ├─ CadastroAdultoScreen.tsx
       ├─ CadastroCriancaScreen.tsx
       ├─ RecuperacaoSenhaScreen.tsx
       ├─ SucessoScreen.tsx
       └─ AreaStubScreen.tsx     ← placeholder pós-login
```

---

## 2. Branch `plano-b-completo` (app inteiro)

Parte da sua branch e **adiciona as telas internas** (Kids, Responsável, Terapeuta).
Quando o time tiver essas telas em RN, elas entram aqui.

```bash
git checkout feature/auth-cadastro
git checkout -b plano-b-completo

# adicione as telas internas (a partir do protótipo HTML que te entreguei)
# e troque o destino dos logins de "Area" para as homes reais:
#   Login(atipico)     -> HomeKids
#   Login(responsavel) -> HomeResponsavel
#   Login(terapeuta)   -> HomeTerapeuta

git add .
git commit -m "feat: app completo navegável (plano B)

- Área Kids: emoções, rotina, fono, psico, comunicação (CAA), escola, SOS
- Área Responsável: rotina, localização, editar tarefas, controle de uso,
  relatórios, notícias
- Área Terapeuta: pacientes, gráficos de evolução, relatório de sessão
- Placeholders para OpenStreetMap (localização) e NewsAPI (notícias)"

git push -u origin plano-b-completo
```

> Enquanto as telas internas em RN não existem, o **protótipo HTML**
> (`Atípicos - Protótipo.html`) é a referência viva dessa branch — você pode
> versioná-lo numa pasta `prototipo/` para a equipe consultar.

---

## 3. No dia da entrega — qual usar?

```bash
# Cenário A: time entregou tudo → use a sua branch + merges do time
git checkout main
git merge feature/auth-cadastro
# ... merges das branches dos colegas ...

# Cenário B: faltou app funcional → "salve" com o plano B
git checkout main
git merge plano-b-completo
```

Abra um **Pull Request** de cada branch no GitHub para revisão antes do merge.

---

## 4. Dicas de higiene

- **Nunca** versione `.env`, `node_modules/`, `google-services.json` — já estão no `.gitignore`.
- Commits pequenos e descritivos (use o prefixo `feat:` / `fix:` / `docs:`).
- Antes de abrir PR: `npx tsc --noEmit` (checa tipos) e `npx expo start` (roda).
- Se o repo usa `main` e não `master`, troque nos comandos acima.
