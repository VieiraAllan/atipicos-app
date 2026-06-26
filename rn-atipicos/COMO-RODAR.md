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

> **Novidade:** o app agora tem sessão real e dados ligados (criança ↔ terapeuta,
> tarefa ↔ criança, progresso editado pelo terapeuta).
>
> • **Modo Firebase** (com `.env`): contas reais + **sincronização em tempo real
>   entre aparelhos**. Aqui **não há terapeutas prontos** — cadastre um terapeuta
>   (Criar Conta → Sou Terapeuta) antes de vincular uma criança a ele.
> • **Modo local** (sem `.env`): tudo offline, e já vêm **dois terapeutas de
>   exemplo** prontos: `helena@atipicos.app` / `123456` e `rafael@atipicos.app` / `123456`.

**Fluxo completo recomendado (mostra tudo ligado)**
1. **Crie uma conta de Responsável** (ex.: nome "Gabriel"). Repare que o topo passa a mostrar **Gabriel**, não mais "Maria".
2. Na área do Responsável, toque **Cadastrar criança** → preencha, escolha **Dra. Helena Martins** como terapeuta, defina e-mail/senha da criança.
3. Toque **Editar Tarefas** → adicione tarefas (com emoji e horário) para essa criança.
4. **Saia** e entre por **Log in Atípico** com o e-mail/senha da criança → faça as tarefas (elas marcam e falam).
5. **Saia** e entre por **Log in Terapeuta** com `helena@atipicos.app` / `123456` → a criança aparece em **Pacientes**; abra, ajuste **Evolução da Fala/Cognitiva** e **Registre a avaliação**.
6. **Saia** e entre de novo como **Responsável** → em **Ver Progresso**, os gráficos refletem a avaliação do terapeuta e a % de tarefas concluídas.

**Checagens dos bugs corrigidos**
- [ ] Conta de Responsável **não** entra nas áreas de Terapeuta/Atípico (mensagem de perfil incorreto).
- [ ] O nome no topo é sempre o **da conta logada** (todas as áreas).
- [ ] Terapeuta → engrenagem abre **Config do Terapeuta** (não a home do Responsável).
- [ ] Cadastrar criança **conclui** sem erro e ela passa a aparecer nas listas.

**Cadastro**
- [ ] CPF inválido é recusado; e-mail/senha inválidos avisam; senhas diferentes avisam.

**APIs (novas)**
- [ ] **Mapa real:** entre como criança (abre a home → permita a localização) → saia → entre como Responsável → **Localização** mostra a criança num mapa OpenStreetMap de verdade.
- [ ] **SOS:** como criança, toque **SOS** → confirma "Localização enviada". O Responsável vê a posição atualizada (origem "SOS").
- [ ] **Notícias:** tela do Responsável (sino 🔔). Sem chave NewsAPI → "Conteúdo de exemplo". Com `EXPO_PUBLIC_NEWSAPI_KEY` no `.env` → "Notícias ao vivo" e o link abre no navegador.

> ⚠️ O mapa precisa de **internet** (tiles do OpenStreetMap). A localização e o
> WebView funcionam normalmente no **Expo Go** — teste num celular real para o GPS.

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
