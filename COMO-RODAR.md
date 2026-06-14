# Como rodar no Expo Go (validação) — Atípicos

Passo a passo pra ver o app rodando no seu celular e validar as telas.

## Pré-requisitos
- **Node 18 ou superior** instalado (`node -v` pra conferir).
- App **Expo Go** instalado no celular (Play Store / App Store).
- Celular e computador na **mesma rede Wi-Fi**.

## Rodar
```bash
cd rn-atipicos
npm install
npx expo install --fix     # alinha as versões nativas ao SDK 51
npx expo start
```
Vai abrir um QR Code no terminal/navegador:
- **Android:** abra o Expo Go → "Scan QR code".
- **iPhone:** abra a **câmera** e aponte pro QR → toque na notificação.

> Se o QR não conectar (redes corporativas/faculdade costumam bloquear), rode
> `npx expo start --tunnel` — é mais lento, mas fura o bloqueio de rede.

---

## Roteiro de validação (clique por clique)

**Auth / cadastro**
- [ ] Splash aparece e vai para a tela Inicial sozinha (ou ao tocar).
- [ ] Os 3 botões de login abrem a tela de login certa.
- [ ] "Criar Conta" → escolha de perfil → cadastro com os campos certos.
- [ ] Máscaras funcionam: CPF `000.000.000-00`, CEP `00000-000`, data `00/00/0000`.
- [ ] Dropdowns (pergunta de segurança / diagnóstico) abrem e selecionam.
- [ ] "Esqueci a senha" abre a recuperação.

**Área Kids** (entre por "Log in Atípico")
- [ ] Home mostra 6 cards coloridos.
- [ ] **Emoções**: tocar fala em voz alta ("Eu estou feliz"). 🔊
- [ ] **Tarefas**: marcar/desmarcar; fala o nome ao concluir.
- [ ] **Comunicação**: tocar símbolos monta a frase; 🔊 lê tudo.
- [ ] Fono / Psico / Escola abrem e leem o item ao tocar.
- [ ] Botão **SOS** abre a tela vermelha.

**Área Responsável** (entre por "Log in Responsável")
- [ ] Home: rotina, mapa, atalhos.
- [ ] Editar Tarefas: adicionar e remover.
- [ ] Controle de Uso: slider de horas + toggles de categoria.
- [ ] Relatórios: gráficos; "Cadastrar nova criança".
- [ ] Localização e Notícias abrem.
- [ ] Navegação inferior (🏠 📊 ⚙️) troca de tela.

**Área Terapeuta** (entre por "Log in Terapeuta")
- [ ] Lista de pacientes; tocar abre o detalhe.
- [ ] Escrever e salvar o relatório da sessão.

---

## Se algo der errado

A voz (`expo-speech`) **não funciona** se você pulou o `npx expo install --fix`.
Rode-o e reinicie com `npx expo start -c` (o `-c` limpa o cache).

Qualquer erro vermelho na tela: **tire um print ou copie o texto** e me mande —
eu corrijo na hora. Os mais comuns e já tratados:
- `Unable to resolve "@/..."` → já habilitei `tsconfigPaths` no `app.json`.
- Fontes não carregam → o app espera as fontes antes de renderizar (App.tsx).

> Lembrete: o app já roda em **MODO DEMONSTRAÇÃO** sem o Firebase — o login
> entra direto e você valida **todas** as telas e a navegação. Login/cadastro
> não persistem dados nesse modo. Para ativar o backend real (persistência,
> contas), crie o projeto no console e preencha o `.env` (ver `FIREBASE.md`);
> o app passa a usar o Firebase automaticamente.
