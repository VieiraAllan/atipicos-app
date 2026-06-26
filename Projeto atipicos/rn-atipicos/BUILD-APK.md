# Gerar o APK do Atípicos

Como transformar o projeto num **APK instalável** no Android. Usamos o
**EAS Build** (build na nuvem da Expo) — **não precisa de Android Studio**.

> Por que na nuvem? Compilar um APK exige o SDK do Android + Java. O EAS faz
> isso em servidores da Expo e te devolve o `.apk` por um link. É grátis para
> uso pessoal/acadêmico (há uma fila no plano free, mas funciona).

---

## Pré-requisitos
- Conta **Expo** (grátis): <https://expo.dev/signup>
- Node 18+ instalado.

## Passo a passo

```bash
cd rn-atipicos

# 1. Instala as dependências (inclui as novas: location, webview)
npm install
npx expo install --fix

# 2. Instala o EAS CLI e faz login
npm install -g eas-cli
eas login

# 3. Vincula o projeto à sua conta Expo (cria o projeto lá)
eas init

# 4. Gera o APK (perfil "preview" = APK, já configurado no eas.json)
eas build -p android --profile preview
```

Ao final, o terminal mostra um **link**. Abra-o: há um botão para **baixar o
`.apk`**. Transfira para o celular (ou abra o link no próprio celular) e instale
— será preciso permitir “instalar de fontes desconhecidas”.

> A primeira build pergunta se pode **gerar um keystore** automaticamente:
> responda **Yes** (a Expo guarda a chave de assinatura para você).

---

## Tempo e fila
- A build leva ~10–20 min (mais a fila do plano gratuito).
- Você acompanha o progresso pelo link ou em <https://expo.dev> → seu projeto → Builds.

## Antes de gerar (checklist)
- [ ] `app.json` tem `android.package` (`com.atipicos.app`) — **já configurado**.
- [ ] Permissão de localização declarada — **já configurada** (plugin `expo-location`).
- [ ] Se for usar Firebase/NewsAPI no APK, crie um `.env` com as chaves **antes**
      de buildar (as `EXPO_PUBLIC_*` são embutidas no momento da build).

## Variáveis de ambiente na build da nuvem
O `.env` local **não** sobe para a nuvem automaticamente. Para o APK já sair com
as chaves, cadastre-as no projeto EAS:

```bash
eas env:create --name EXPO_PUBLIC_NEWSAPI_KEY --value SUACHAVE --environment preview
# repita para cada EXPO_PUBLIC_FIREBASE_* que você usa
```
Ou rode a build mesmo sem elas: o app funciona em **modo demonstração** (login
local) e com **notícias de exemplo** — ideal para apresentar sem depender de rede.

---

## Alternativa local (avançado, opcional)
Se você tiver **Android Studio + JDK 17** e quiser compilar na sua máquina:
```bash
npx expo prebuild -p android
cd android && ./gradlew assembleRelease
# APK em: android/app/build/outputs/apk/release/app-release.apk
```
Para a maioria dos casos, o **EAS Build (nuvem)** acima é mais simples e confiável.

---

## Resumo
| Quero… | Comando |
|---|---|
| Testar rápido no celular | `npx expo start` + Expo Go |
| Gerar APK para instalar/entregar | `eas build -p android --profile preview` |
| Gerar AAB para a Play Store | `eas build -p android --profile production` |
