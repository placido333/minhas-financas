# Minhas Finanças — contexto para o Claude Code

Este é um app pessoal de finanças. O dono **não programa**. Seja prático: faça as
mudanças, explique em 1 ou 2 frases o que fez, e mantenha tudo funcionando.

## O que é
Um painel (1 página) que roda no navegador e é instalável como app no celular (PWA).
Registra gastos, mostra patrimônio, gráficos por dia/mês e por categoria.

## Arquivos
- `index.html` — **o app inteiro** (HTML + CSS + JavaScript num arquivo só). É aqui que quase tudo acontece.
- `manifest.webmanifest` — define nome/ícone do app instalável.
- `sw.js` — service worker (cache offline + atualização automática).
- `icon-192.png`, `icon-512.png` — ícones do app.

## Como os dados são guardados
- Usa `localStorage` do navegador (ficam no aparelho do usuário, não num servidor).
- Chaves: `pf_transactions_v1` (lançamentos) e `pf_balances_v1` (saldos/cotação).
- **NUNCA** voltar a usar `window.storage` (isso só existe dentro do Claude.ai e quebra fora dele).

## Formato de registro de gasto
Texto: `Categoria - valor` + sufixo de moeda no fim do valor:
- `R` = desconta do "Livre em Real" (ex.: `Ifood - 101,50R`)
- `D` = desconta do "Livre em Dólar" (ex.: `Uber 25D`)
- sem sufixo = Real (padrão).
Aceita vírgula ou ponto e milhar (`1.234,56`). A hora é registrada automaticamente.

## Recursos atuais
- Cards: gasto hoje, mês, média/dia, total do período.
- "Montante do meu dinheiro": rosca com Investido (R$), Livre em Real (R$), Livre em Dólar (US$).
  O dólar entra na rosca convertido pela cotação editável em "Editar saldos".
- Filtros de período (Hoje, Ontem, 7 Dias, Este mês, Este ano, Customizado).
- Gráfico de gastos por dia/mês e quebra por categoria (clicar numa categoria filtra).
- Modo privacidade (olhinho): inicia **borrado**, clica pra revelar. Não persiste (reabre oculto).
- Exportar CSV e apagar tudo.

## Regras ao editar (IMPORTANTE)
1. Manter tudo em `index.html` (não criar build, não adicionar frameworks).
2. Idioma: português. Moeda padrão R$ (pt-BR).
3. Ao mudar qualquer arquivo do app, **incremente a versão no `sw.js`** (ex.: `VERSION = 'v1'` -> `'v2'`).
   Isso garante que o app no celular pegue a versão nova.
4. Não quebrar `localStorage` nem as chaves existentes (não apagar dados do usuário).
5. Depois de aplicar mudanças: `git add -A`, `git commit -m "<resumo curto>"`, `git push`.
   O site (GitHub Pages) republica sozinho em ~1 min, no mesmo link.

## Deploy
Hospedado no **GitHub Pages**, a partir da branch `main`, pasta raiz (`/`).
O link fica no formato `https://SEU-USUARIO.github.io/NOME-DO-REPO/`.
