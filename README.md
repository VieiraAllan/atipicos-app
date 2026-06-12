# Atípicos — App (React Native + Expo + TypeScript)

Fluxo de **autenticação e cadastro** do app Atípicos, fiel ao protótipo do Figma.
Esta é a entrega da **Fase 2** (telas + navegação). O backend (Firebase) entra na
**Fase 3** — as telas já chamam `src/services/auth.ts`, hoje um *stub*, que será
implementado com Firebase sem precisar alterar as telas.

---

## Como rodar

```bash
cd rn-atipicos
npm install
# garante as versões nativas certas do SDK do Expo:
npx expo install --fix
npx expo start
```

Abra no **Expo Go** (celular) lendo o QR Code, ou tecle `a` (Android) / `i` (iOS) /
`w` (web) no terminal.

> Requer Node 18+ e o app **Expo Go** no celular. Não precisa de Android Studio/Xcode
> para testar no Expo Go.

---

## Estrutura

```
rn-atipicos/
├─ App.tsx                      # carrega fontes + NavigationContainer
├─ app.json                     # config Expo (nome, ícone, splash)
├─ assets/
│   └─ logo-atipicos.png
└─ src/
   ├─ theme/                    # colors.ts, typography.ts (tokens do protótipo)
   ├─ navigation/
   │   ├─ types.ts              # RootStackParamList (navegação tipada)
   │   └─ RootNavigator.tsx     # pilha de telas (native-stack)
   ├─ components/               # Logo, BackButton, PrimaryButton, Field,
   │                            # SelectField, ScreenContainer, FormScreen
   ├─ constants/formData.ts     # configuração dos campos de cada formulário
   ├─ utils/masks.ts            # máscaras de CPF / CEP / data
   ├─ services/
   │   ├─ firebase.ts           # init do Firebase (Auth + Firestore + Storage)
   │   ├─ auth.ts               # login, cadastro, recuperação de senha
   │   ├─ criancas.ts           # CRUD de crianças (RF04/05/06)
   │   └─ storage.ts            # upload de foto (RF18)
   └─ screens/
       ├─ SplashScreen.tsx
       ├─ InicialScreen.tsx
       ├─ CadastroEscolhaScreen.tsx
       ├─ LoginScreen.tsx           # reutilizada p/ Atípico/Responsável/Terapeuta
       ├─ CadastroAdultoScreen.tsx  # Responsável e Terapeuta
       ├─ CadastroCriancaScreen.tsx
       ├─ RecuperacaoSenhaScreen.tsx
       ├─ SucessoScreen.tsx
       └─ AreaStubScreen.tsx        # placeholder pós-login (Fase 4)
```

## Fluxo de navegação

```
Splash → Inicial
Inicial → Login {perfil}                         (Atípico | Responsável | Terapeuta)
Inicial → CadastroEscolha → CadastroAdulto {perfil} → Sucesso → Inicial
Login → RecuperacaoSenha → Sucesso → Inicial
Login → Area {perfil}                            (placeholder)
Area(responsavel) → CadastroCrianca → Sucesso
```

## Requisitos cobertos

- **RF01** Cadastro de responsáveis e terapeutas (`CadastroAdultoScreen`)
- **RF02** Login (`LoginScreen`) · **RF03** Recuperação de senha (`RecuperacaoSenhaScreen`)
- **RF04/RF05** Cadastro da criança com diagnóstico e observações (`CadastroCriancaScreen`)
- **RNF01/RNF02** Interface intuitiva, cores suaves, botões grandes, alvos de toque ≥ 44px

## Notas

- Path alias `@/*` resolvido nativamente pelo Expo via `tsconfig.json`.
- Fontes via `@expo-google-fonts` (Quicksand, Inter, Happy Monkey).
- Dropdowns implementados com `Modal` nativo (sem dependências extras).
- **Backend (Fase 3):** configuração e regras em **`FIREBASE.md`**. Crie o `.env`
  a partir do `.env.example` antes de rodar com Firebase real.
- Próximo passo (Fase 4): áreas internas Pais/Kids/Terapeuta + APIs externas.
