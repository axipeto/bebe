# Convite do Chá Revelação

Arquivos:
- `index.html`: o convite
- `ilustracao.jpg`: a ilustração
- `apps-script.gs`: código da planilha que guarda confirmações e palpites

## 1. Criar a planilha (uns 5 minutos)
1. Crie uma planilha nova no Google Sheets (ex.: "Chá Revelação").
2. Menu **Extensões → Apps Script**.
3. Apague o código que aparece e cole todo o conteúdo de `apps-script.gs`. Salve.
4. Clique em **Implantar → Nova implantação**.
   - Tipo: **App da Web**
   - Executar como: **Eu**
   - Quem pode acessar: **Qualquer pessoa**
5. Autorize quando o Google pedir. Pode aparecer o aviso "app não verificado":
   clique em "Avançado" → "Acessar (não seguro)". O app é o seu próprio script.
6. Copie a **URL do app da Web** (termina em `/exec`).

## 2. Ligar o convite à planilha
No `index.html`, procure a linha:

    const SCRIPT_URL = "COLE_AQUI_A_URL_DO_APPS_SCRIPT";

e troque pelo endereço copiado, mantendo as aspas.

## 3. Publicar no GitHub Pages
1. Edite o `index.html` (passo 2) direto pelo GitHub: abra o arquivo, clique no lápis, troque a URL e faça commit.
2. No repositório: **Settings → Pages → Source: Deploy from a branch → Branch: main / (root) → Save**.
3. Em 1 a 2 minutos o link fica disponível em `https://axipeto.github.io/bebe/`.

## 4. Testar
Abra o link, confirme com um nome de teste e veja se a linha aparece na planilha.
Depois apague essa linha de teste na planilha.

## Observações
- O placar mostra só a contagem de palpites. Os nomes ficam apenas na planilha, que só você vê.
- A prévia do link no WhatsApp usa `https://axipeto.github.io/bebe/ilustracao.jpg`. Se o Pages
  publicar em outro endereço, ajuste a tag `og:image` no `index.html`.
- Se mudar o código do Apps Script depois, publique de novo em
  **Implantar → Gerenciar implantações → editar → Nova versão**.
