# Atualização para o Expo SDK 54

Necessária para testar no **iOS via Expo Go** (a App Store só publica o Expo Go
do SDK mais recente). Seu projeto não tem código nativo customizado, então a
subida é viável.

## Passos (na pasta `rn-atipicos/`)

```bash
# 1. Limpe o estado anterior
rm -rf node_modules package-lock.json   # Windows: apague as duas manualmente

# 2. Instale ignorando o check de peer deps (necessário no meio da migração)
npm install --legacy-peer-deps

# 3. Deixe a Expo alinhar TODAS as libs ao SDK 54
npx expo install --fix

# 4. Garanta o preset do Babel e rode limpando o cache
npx expo install babel-preset-expo
npx expo start --clear

# 5. (opcional) verifique incompatibilidades
npx expo-doctor
```

> **Por que `--legacy-peer-deps`?** Durante a migração, algumas libs ainda
> apontam para o React 18 enquanto o núcleo já está no React 19 — isso gera
> erro `ERESOLVE` no npm. A flag instala mesmo assim; em seguida o
> `expo install --fix` acerta as versões e o conflito some.

## O que já preparei
- `package.json`: `expo` fixado em `~54.0.0` (o resto o `--fix` alinha).
- `src/services/notificacoes.ts`: o handler de notificação já cobre a API nova
  (SDK 53+ trocou `shouldShowAlert` por `shouldShowBanner`/`shouldShowList`).

## Pontos para vigiar depois do upgrade
1. **React 19** — o SDK 54 usa React 19. Nada no código depende de algo removido,
   mas se o `expo-doctor` reclamar de `@types/react`, rode
   `npx expo install @types/react` para casar a versão.
2. **expo-notifications** — teste o alerta de SOS depois de subir. Se aparecer
   aviso de depreciação, é só ruído; a notificação deve disparar normalmente.
3. **Firebase** — segue na v10 (não é gerenciado pela Expo). Funciona no 54.
   Se quiser, depois dá para subir para a v11, mas **não é necessário**.
4. **Mapa (react-native-webview)** — confirme que os tiles do OpenStreetMap
   ainda carregam após o `--fix` realinhar a versão.

## Se algo quebrar
- **`Cannot find module 'babel-preset-expo'`** (erro comum logo após o upgrade):
  o preset do Babel não foi reinstalado. Resolva com:
  ```bash
  npx expo install babel-preset-expo
  npx expo start --clear
  ```
- Rode `npx expo-doctor` — ele aponta a lib fora de versão e sugere o comando.
- Em último caso, volte o `expo` para `~51.0.28` no package.json e refaça os
  passos 1–4 (você volta ao estado estável que já funcionava no Android).

## Lembrete
Para **Android/APK** o SDK 51 já bastava. Esta subida é para destravar o **iOS no
Expo Go**. Teste o fluxo principal (login → cadastro → SOS → mapa → notificação)
logo após atualizar, antes da apresentação.
