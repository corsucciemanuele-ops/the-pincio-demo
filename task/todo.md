# The Pincio — Piano sessione v3 (riorganizzazione strategica)

> **NON implementare finché il piano non è approvato.** Questo file è il piano.
> Scope: SOLO il sito The Pincio. La home **IL COLLE** (bottoni-porta verso le
> due PWA) è un progetto separato → NON in questa sessione.

## Spina emotiva (nord magnetico di tutto)
**IMMERSIONE, non vista.** The Pincio non ha panorama: sei *dentro* un'oasi
disegnata (piscina, estetica, verde del Montefeltro). Luogo + emozione prima,
mai una lista di servizi. (Il Nido del Corvo — sito separato — avrà l'opposto:
vista, terrazza, tramonto sul lago.)

## Già fatto nelle sessioni precedenti — NON rifare
- [x] Pivot lago → piscina (rimossi lago/tramonto/terrazza/piatti del ristorante)
- [x] GDPR checkbox in Invito + API route `/api/invito`
- [x] Placeholder dove mancano foto Pincio
- [x] Pallini statici → braci animate nel finale
- [x] Frase Pineta spostata in alto (subito dopo l'hero)
- [x] Logo vettoriale SVG (marrone + bianco) in header/hero/footer
- [x] Marquee riscritto in CSS (DA RIVERIFICARE su mobile — vedi blocchi effetti)

---

## Nuovo ordine sezioni (obiettivo)
| # | Sezione | Azione |
|---|---------|--------|
| 1 | Hero (video + logo) | Snellire ancora: solo emozione, via il superfluo |
| 2 | Frase Pineta | ✅ resta com'è |
| 3 | **Manifesto del luogo** (NUOVO) | Crea — testo blindato (sotto) |
| 4 | **Le sere · eventi · calendario** | **Spostare MOLTO più in alto** (cuore commerciale) |
| 5 | **L'esperienza del luogo** (ex "Pool Experience") | Rinominare + reframe immersivo; piscina resta il cuore; via la lista-feature in primo piano |
| 6 | **Bites — minimo** | Solo una riga nel racconto; rimuovere showcase, slot "immagini presto", galleria |
| 7 | Dove siamo | Resta; aggiungere citazione + **cross-link al Nido del Corvo** |
| 8 | Invito (email + GDPR) | ✅ |
| 9 | Finale | ✅ |

### Cosa si rimuove / cambia di struttura
- **"La giornata, in tre tempi" (componente `Tempi`)** → il Manifesto la
  **sostituisce/precede**. Proposta: **rimuovere** la sezione a 3 atti
  (Pool/Bites/Bar come storytelling-giornata) perché reintroduce il framing
  "lista/servizi". Le sue idee vivono in: Manifesto + L'esperienza del luogo +
  la riga Bites. → **DECISIONE 1 da confermare.**
- **Gallery** → non è nel nuovo ordine ma la spec dice "resta vuota/placeholder".
  Proposta: tenerla come placeholder minimale **in fondo** (dopo L'esperienza) o
  rimuoverla del tutto finché non ci sono foto del luogo. → **DECISIONE 2.**
- **Marquee** → tenerlo (parole di *luogo*: Montefeltro · luce · piscina · verde ·
  Sassocorvaro · Il Colle · Nido del Corvo) e collocarlo dopo il Manifesto.
  → **DECISIONE 3 (posizione).**

---

## Testi BLINDATI (usare ESATTAMENTE, non riscrivere)

### Manifesto del luogo (sezione 3, in alto)
> **Non una vista da osservare. Un luogo in cui entrare.**
> Sul colle, immersi nel Montefeltro: piscina, tramonti e sere d'estate.
> *The Pincio è un invito a rallentare.*

- Prima riga = spina del brand (immersione, non vista) → in evidenza/più grande.
- Frammenti-tocco ammessi altrove (mai al posto del manifesto):
  "un luogo che non chiede di correre", "l'estate non si guarda, si vive".

### Meta description / OG (SEO — NON visibile in pagina)
> Sul colle, nel cuore del Montefeltro, The Pincio nasce come destinazione
> d'estate: piscina, aperitivi e sere a bordo acqua. Apertura estate 2027.

### Bites (una riga, dentro il racconto — NO showcase)
> la mano del Nido del Corvo, più libera — aperitivo, bites, cocktail a bordo piscina

---

## Sezione per sezione (task)

### Hero
- [ ] Avvicinare a "solo video + logo": rimuovere elementi che affollano il
      primo schermo (mantenere logo + tagline; valutare di togliere eyebrow e/o
      meta in basso se affollano). Emozione del luogo, non slogan servizi.

### Manifesto del luogo (nuovo componente `Manifesto.tsx`)
- [ ] Creare sezione subito dopo la frase Pineta, prima di tutto il resto.
- [ ] Testo blindato (sopra). Reveal sobrio (mask/fade-up, GPU-light).

### Le sere · eventi · calendario (`Sere.tsx`) — SPOSTARE IN ALTO
- [ ] Posizionare come sezione 4 (subito dopo Manifesto/marquee).
- [ ] Testi correnti già corretti → restano.
- [ ] Calendario serate: struttura dati `lib/events.ts` (già vuota) → "in arrivo".

### L'esperienza del luogo (ex `PoolExperience.tsx`)
- [ ] Rinominare: via "Pool Experience" (titolo inglese). Occhiello IT, es.
      "L'esperienza del luogo" / "Il luogo".
- [ ] Reframe: piscina = cuore raccontato come **atmosfera/immersione**, non menu.
- [ ] Togliere dal primo piano la lista-feature (pills). Se restano pills →
      versione minimale e **reattiva al tocco** (non hover).

### Bites — minimo (`FoodExperience.tsx`)
- [ ] Rimuovere lo showcase, lo slot "Le immagini del Pincio, presto", ogni
      foto/portata. Niente galleria piatti.
- [ ] Ridurre a **una riga** dentro il racconto (testo blindato Bites).
      Valutare: fonderla in "L'esperienza del luogo" invece di sezione a sé.
      → **DECISIONE 4.**

### Gallery (`Gallery.tsx`)
- [ ] Resta vuota/placeholder; quando ci saranno foto = **luogo** (piscina,
      estetica, sere), **mai piatti**. (Vedi DECISIONE 2 su tenerla o no.)

### Dove siamo (`Location.tsx`)
- [ ] Resta (sul colle del Nido, sopra il lago = geografia).
- [ ] Aggiungere citazione **Nido del Corvo** + **cross-link** al sito del
      ristorante (URL da te). NIENTE porta "IL COLLE" qui.

### Invito / Finale
- [x] Già a posto (verificare solo il backend, sotto).

---

## EFFETTI & MOBILE — BLOCCHI (il 90% del traffico è telefono)
Regola: ciò che funziona solo su PC e non su mobile = **rotto**, non da rifinire.
- [ ] **Marquee**: deve **scorrere su mobile**. Riverificare l'animazione CSS
      (transform/keyframes), niente dipendenza da hover/JS. Test a 390px.
- [ ] **Pills** (se restano): reazione al **tocco** (`active:`), non hover.
- [ ] **Video**: autoplay `muted` + `playsinline` + `poster` di fallback
      (già impostato in MediaSlot — riconfermare su iOS, niente play-button).
- [ ] **Primo caricamento fluido**: lo scroll deve partire subito; niente
      blocco. Preloader non deve inceppare. Lazy-load di immagini/video pesanti.
      Tutti gli effetti GPU-light (transform/opacity).
- [ ] **Niente effetti solo-desktop**: già rimosso WebGL + parallax-mouse;
      ricontrollare che non resti nulla legato a hover/mouse come unico trigger.
- [ ] Micro-interazioni: meglio 2–3 eccellenti e fluide che tante che scattano.

## Backend — DA VERIFICARE
- [ ] **Il form scrive davvero in una lista?** Oggi `/api/invito` valida e
      logga, **non persiste** (nessun DB). Opzioni: Supabase / Resend / Mailchimp.
      Richiede tue **credenziali** (env vars). → confermare servizio + chiavi.

---

## Decisioni da confermare PRIMA di implementare
1. **Rimuovere** la sezione "La giornata in tre tempi" (3 atti)? *(proposto: sì)*
2. **Gallery**: tenerla come placeholder minimale o rimuoverla per ora?
   *(proposto: tenerla minimale, in fondo)*
3. **Marquee**: posizione (dopo Manifesto) e set di parole "luogo".
4. **Bites**: sezione a sé minima, o una riga dentro "L'esperienza del luogo"?
   *(proposto: una riga dentro L'esperienza)*
5. **Cross-link Nido del Corvo**: URL del sito ristorante.
6. **Backend lista**: quale servizio + credenziali.

## Ordine di esecuzione (a blocchi, dopo approvazione)
1. **Riordino struttura** (page.tsx) + nuovo `Manifesto` + spostare Le sere su +
   rimozioni (tre tempi / showcase bites). Verifica build + mobile.
2. **Reframe** L'esperienza del luogo + Bites one-liner.
3. **Effetti mobile**: marquee, pills tap, autoplay, primo caricamento fluido.
4. **Dove siamo**: cross-link Nido.
5. **Backend**: cablaggio lista (se arrivano credenziali).
6. SEO meta/OG (layout metadata).
7. Verifica finale sul telefono (390px), commit, push.

> Metodo: piano approvato → eseguo a blocchi, in locale, controllando ogni
> pezzo a larghezza mobile prima di proseguire.

---

## Stato avanzamento sessione v3
- [x] **Blocco 1** — riordino struttura (Manifesto, Le sere in alto, via tre tempi/gallery/showcase bites, marquee dopo manifesto)
- [x] **Blocco 2** — reframe "L'esperienza del luogo" (rinomina, immersione, via lista-feature, riga Bites dentro)
- [x] **Blocco 3** — effetti mobile: marquee sempre attivo; rimosso il freeze globale da "Riduci movimento"; preloader con safety timeout; lazy-load immagini; finale responsive (mobile: reveal one-shot, no sticky-scrub jank)
- [x] **Blocco 4** — Dove siamo: sinergia + cross-link Nido del Corvo (nidodelcorvo.it)
- [~] **Blocco 5** — Supabase: API `/api/invito` **pronta e auto-cablante**. Si attiva da sola appena su Vercel ci sono `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` e la tabella `invites` (SQL nel file route.ts). Finché mancano: valida + GDPR + log, risponde `{ok, stored:false}`.

### Per attivare la lista (quando vuoi)
1. Supabase → crea tabella `invites` (SQL in `app/api/invito/route.ts`).
2. Vercel → Settings → Environment Variables: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`.
3. Redeploy. Fine — gli iscritti finiscono in tabella, senza modifiche al codice.
