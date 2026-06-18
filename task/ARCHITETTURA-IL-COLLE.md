# IL COLLE — Architettura & sinergia (nota strategica)

> Visione condivisa da ritrovare nelle chat future. Questa sessione lavora SOLO
> su **The Pincio**. Le altre due si faranno in chat dedicate:
> 1) chat **Nido del Corvo** (PWA ristorante)
> 2) chat **IL COLLE** (pagina-ponte)

## La struttura "una cosa sola"
- **IL COLLE** = ombrello / pagina-ponte. Da qui parte tutto: 2 tasti
  (**Nido del Corvo** · **The Pincio**), **QR** per accedere e **registrarsi**.
- **The Pincio** (pool · bites · bar) e **Nido del Corvo** (ristorante) = le due
  esperienze. L'utente sceglie dove "vivere" la propria esperienza.
- **Tutte e tre sono PWA** (installabili) e insieme siti indicizzabili.
- **Un solo database clienti** (Supabase) condiviso: la registrazione (anche via
  QR) salva il contatto con un campo *interesse: pincio / nido / entrambi* →
  marketing mirato da un'unica lista. È questo il vero motore commerciale.
- **Due schede Google Business Profile separate** (una per locale), ciascuna
  legata alla pagina del proprio locale → su Google escono distinte, entrambe
  sotto l'ombrello IL COLLE. (SEO/schede: si fanno in futuro.)

## Principio di "stessa sinergia"
**Stesso SISTEMA, anima DISTINTA.** Famiglia visiva coerente, ma ogni luogo ha
la sua emozione.

### Condiviso (il sistema — uguale ovunque)
- **Logo / marchio**: il cristallo + wordmark (file SVG già pronti: `logo.svg`,
  `logo-white.svg`, `logo-mark*.svg`).
- **Tipografia**: display serif (Cormorant) + sans (Jost), tracking dei label.
- **Motion language**: smooth scroll (Lenis), reveal mascherati (GSAP),
  preloader, marquee, **tutto mobile-first / GPU-light**, niente solo-hover.
- **Componenti riusabili**: `MediaSlot` (slot media drop-in), `FieldScene`
  (scena graduata), `Reveal`/`HeadingReveal`, `Marquee`.
- **Tono**: eleganza italiana, lentezza, lusso discreto.

### Distinto (l'anima — diversa per luogo)
- **The Pincio** → *immersione, non vista*. Piscina, bordo acqua, giorno→sera.
  Palette mediterranea chiara + oro/turchese.
- **Nido del Corvo** → *la vista*. Terrazza, tramonto sul lago, cucina. Palette
  più serale/profonda (da definire nella sua chat).
- **IL COLLE** → *la soglia / la scelta*. Minimale, sobria: due porte, QR,
  registrazione. Fa da cornice, non ruba la scena ai due locali.

## Backbone tecnico (da decidere nelle chat dedicate)
- **Codice**: monorepo (un pacchetto UI condiviso + 3 app) **oppure** 3 progetti
  che importano lo stesso design system. Obiettivo: *una cosa da mantenere*.
- **Domini**: separati (`thepincio.it`, `nidodelcorvo.it`, `ilcolle.it`) **o**
  sottocartelle (`ilcolle.it/pincio`, `/nido`). Entrambi ok per le 2 schede.
- **PWA**: manifest + icone (dal logo) + service worker per ognuna.
- **DB unico** Supabase: tabella `contatti` con `luogo`, consenso, data.

## Regola sull'installazione (importante)
Non contare sull'installazione: tutto deve funzionare **senza installare**.
La PWA installabile è un bonus per gli affezionati, non la base. Il motore
resta: **registrazione → database → email marketing**.

## Stato
- The Pincio (questo repo): v3 completata, live su Vercel. API invito pronta e
  auto-cablante a Supabase.
- Nido del Corvo: da fare (chat dedicata).
- IL COLLE: da fare (chat dedicata).
