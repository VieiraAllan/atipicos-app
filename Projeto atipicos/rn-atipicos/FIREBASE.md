# Configuração do Firebase — Atípicos

Guia para ligar o backend (Auth + Firestore + Storage) ao app. Tudo usando o
**Firebase Web SDK** (funciona direto no Expo Go, sem build nativo).

---

## 1. Criar o projeto no Console

1. Acesse <https://console.firebase.google.com> → **Adicionar projeto**.
2. Nome: `atipicos` (pode desativar o Google Analytics).
3. Dentro do projeto, clique no ícone **Web `</>`** para registrar um app web.
   - Apelido: `atipicos-app` → **Registrar app**.
   - O console mostra o objeto `firebaseConfig`. **Copie esses valores.**

## 2. Preencher o `.env`

```bash
cp .env.example .env
```

Cole no `.env` os valores do `firebaseConfig`:

| firebaseConfig        | Variável no `.env`                          |
|-----------------------|---------------------------------------------|
| `apiKey`              | `EXPO_PUBLIC_FIREBASE_API_KEY`              |
| `authDomain`          | `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN`          |
| `projectId`           | `EXPO_PUBLIC_FIREBASE_PROJECT_ID`           |
| `storageBucket`       | `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET`       |
| `messagingSenderId`   | `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`  |
| `appId`               | `EXPO_PUBLIC_FIREBASE_APP_ID`               |

> Reinicie o `npx expo start` depois de alterar o `.env` (use `--clear` se precisar).

## 3. Ativar os serviços (tudo no plano GRATUITO — Spark)

- **Authentication** → *Get started* → aba **Sign-in method** → ative **Email/Password**.
- **Firestore Database** → *Create database* → comece em **produção** → escolha a região.

> 💸 **Storage NÃO é necessário.** Desde out/2024 o Firebase Storage exige o
> plano **Blaze** (pago/cartão). Este projeto **não usa Storage por padrão**: a
> foto da criança (RF18) é comprimida e salva como base64 dentro do Firestore
> (gratuito). Ou seja, **fique no plano Spark e não cadastre cartão**.
> Só se um dia quiser o Storage real: ative-o no console, defina
> `EXPO_PUBLIC_FIREBASE_USE_STORAGE=true` no `.env` e publique `storage.rules`.

## 4. Publicar as regras de segurança

O arquivo `firestore.rules` já está no projeto (o `storage.rules` só é preciso
se você optar pelo Storage pago — pode ignorá-lo).

**Pelo console (rápido):** cole o conteúdo de `firestore.rules` na aba **Rules**
do Firestore e clique em **Publicar**.

**Pela CLI (recomendado):**
```bash
npm install -g firebase-tools
firebase login
firebase init firestore            # aponte para firestore.rules
firebase deploy --only firestore:rules
```

## 5. Instalar dependências e rodar

```bash
npm install
npx expo install --fix
npx expo start
```

---

## Sincronização em tempo real (modo híbrido)

O app tem **dois modos**, escolhidos automaticamente:

- **Com `.env` configurado → modo Firebase:** contas reais (Auth) e dados no
  Firestore com **listeners em tempo real** (`onSnapshot`). A localização e o
  progresso da criança aparecem **ao vivo** no aparelho do responsável — é o
  multi-dispositivo de verdade.
- **Sem `.env` → modo local:** tudo no aparelho (offline), à prova de falhas
  para apresentar sem rede. Mesmas telas, mesmo comportamento.

> O cadastro da criança cria a conta de login dela numa **instância secundária**
> do Firebase, então o responsável **não é deslogado** no processo.

### Demonstração com 2 aparelhos
1. Aparelho A: entre como **Responsável**, cadastre a criança (vincule a um terapeuta) e crie tarefas.
2. Aparelho B: entre com o **Log in Atípico** da criança → conclua tarefas e abra o app (compartilha localização).
3. Aparelho A: em **Ver Progresso** e **Localização**, os dados atualizam **sozinhos**.
4. Em um terceiro login de **Terapeuta**, registre uma avaliação → o card do responsável muda na hora.

## Modelo de dados (Firestore)

```
usuarios/{uid}
  nome, email: string
  perfil: "responsavel" | "terapeuta" | "atipico"
  cpf?: string
  criancaId?: string               // só nas contas de criança
  criadoEm: timestamp

criancas/{id}
  nome, diagnostico: string
  cpf?, dataNascimento?: string
  responsavelUid: string           // dono (responsável)
  terapeutaId: string | null       // terapeuta vinculado
  contaUid: string                 // conta de login da criança
  falaHist: number[]               // avaliações do terapeuta (0–100)
  cognitivaHist: number[]
  criadoEm: timestamp

tarefas/{id}
  criancaId, responsavelUid, terapeutaId, contaUid: string
  emoji, nome, hora: string
  done: boolean

localizacoes/{criancaId}
  criancaId, responsavelUid, terapeutaId, contaUid: string
  lat, lng: number
  ts: number                       // quando foi atualizada
  origem: "inicial" | "gps" | "sos"
```

> Os uids relacionados são **denormalizados** nas tarefas e localizações para
> consultas e regras de segurança simples e rápidas.

### Requisitos atendidos
- **RF01** cadastro · **RF02** login (com checagem de perfil) · **RF03** recuperação por e-mail
- **RF04/RF05/RF06** criança vinculada a responsável e terapeuta
- **RF07–RF09** tarefas da rotina (criar/concluir/remover)
- **RF14/RF15** localização no mapa (OpenStreetMap) + SOS
- **RF16/RF17/RF20–RF22** progresso editado pelo terapeuta, visto pelo responsável
- **RF19** feed de notícias (NewsAPI)
- **RNF07/RNF08** regras de segurança por relação + autenticação obrigatória

---

## Notas / decisões de projeto (honestas para a banca)

1. **Recuperação de senha.** O método seguro e nativo do Firebase é o
   `sendPasswordResetEmail` (link por email) — é o que `recuperarSenha` faz. O
   fluxo "pergunta de segurança + digitar nova senha" da tela **não pode** ser
   concluído só no cliente, porque o SDK não permite definir a senha de outro
   usuário. Para honrar 100% aquela tela, use a Cloud Function abaixo.

2. **Resposta de segurança em texto.** Para um MVP está aceitável, mas o ideal é
   guardar um *hash* (bcrypt) e validar via Cloud Function — nunca liberar
   leitura pública desse campo nas regras.

3. **Login Atípico (criança).** No MVP a criança é um documento de perfil sob o
   responsável (sem conta de login própria), para não deslogar o responsável ao
   criar a conta. Para um login real da criança, crie a conta Auth dela usando
   uma **instância secundária** do app (`initializeApp(config, "secundario")`).

### (Opcional) Cloud Function para redefinir senha com pergunta de segurança

```js
// functions/index.js  —  requer plano Blaze
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.redefinirSenha = functions.https.onCall(async (data) => {
  const { email, respostaSeguranca, novaSenha } = data;
  const user = await admin.auth().getUserByEmail(email);
  const snap = await admin.firestore().doc(`usuarios/${user.uid}`).get();
  if (!snap.exists || snap.data().respostaSeguranca !== respostaSeguranca) {
    throw new functions.https.HttpsError("permission-denied", "Resposta incorreta.");
  }
  await admin.auth().updateUser(user.uid, { password: novaSenha });
  return { ok: true };
});
```

No app, troque o corpo de `recuperarSenha` por uma chamada
`httpsCallable(getFunctions(), "redefinirSenha")` passando os três campos.
