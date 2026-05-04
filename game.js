// ─── Card Deck ────────────────────────────────────────────────────────────────

const DECK = [
  { t: "Printing press invented",            y: 1440,  d: "Gutenberg's movable type press",            e: "📖" },
  { t: "Moon landing",                        y: 1969,  d: "Apollo 11 lands on the lunar surface",      e: "🌕" },
  { t: "World Wide Web created",              y: 1991,  d: "Tim Berners-Lee launches the web",           e: "🌐" },
  { t: "French Revolution begins",            y: 1789,  d: "Storming of the Bastille",                   e: "⚔️" },
  { t: "Penicillin discovered",               y: 1928,  d: "Alexander Fleming's breakthrough",           e: "🔬" },
  { t: "First iPhone released",               y: 2007,  d: "Apple launches the smartphone era",          e: "📱" },
  { t: "Darwin's Origin of Species",          y: 1859,  d: "Theory of natural selection published",      e: "🦋" },
  { t: "First transatlantic flight",          y: 1927,  d: "Lindbergh flies New York to Paris",          e: "✈️" },
  { t: "DNA double helix discovered",         y: 1953,  d: "Watson and Crick's landmark paper",          e: "🧬" },
  { t: "Shakespeare born",                    y: 1564,  d: "Arrives in Stratford-upon-Avon",             e: "🎭" },
  { t: "Eiffel Tower opens",                  y: 1889,  d: "Paris gets its iconic iron tower",           e: "🗼" },
  { t: "First steam locomotive",              y: 1804,  d: "Trevithick's engine runs on rails",          e: "🚂" },
  { t: "Magna Carta signed",                  y: 1215,  d: "English barons limit royal power",           e: "📜" },
  { t: "Columbus reaches the Americas",       y: 1492,  d: "Voyage changes world history",               e: "⛵" },
  { t: "First email sent",                    y: 1971,  d: "Ray Tomlinson's network message",            e: "📧" },
  { t: "Berlin Wall falls",                   y: 1989,  d: "Reunification of Germany begins",            e: "🧱" },
  { t: "Marie Curie wins Nobel Prize",        y: 1903,  d: "First woman to win the Nobel Prize",         e: "⚗️" },
  { t: "The Titanic sinks",                   y: 1912,  d: "Ocean liner strikes an iceberg",             e: "🚢" },
  { t: "First modern Olympic Games",          y: 1896,  d: "Athens hosts the revived Games",             e: "🏅" },
  { t: "Edison opens power station",          y: 1882,  d: "Pearl Street Station lights New York",       e: "💡" },
  { t: "First human heart transplant",        y: 1967,  d: "Dr. Barnard operates in Cape Town",          e: "❤️" },
  { t: "Google founded",                      y: 1998,  d: "Brin and Page launch the search engine",     e: "🔍" },
  { t: "Wright Brothers first flight",        y: 1903,  d: "12 seconds of flight at Kitty Hawk",         e: "🛩️" },
  { t: "Napoleon defeated at Waterloo",       y: 1815,  d: "The French Emperor's final battle",          e: "⚔️" },
  { t: "Einstein's theory of relativity",     y: 1905,  d: "E=mc² changes physics forever",              e: "🧠" },
  { t: "Women get the vote in the US",        y: 1920,  d: "19th Amendment ratified",                    e: "🗳️" },
  { t: "Pyramids of Giza built",              y: -2560, d: "Ancient wonder constructed at Giza",         e: "🔺" },
  { t: "First human in space",                y: 1961,  d: "Yuri Gagarin orbits Earth",                  e: "🚀" },
  { t: "Mount Everest first climbed",         y: 1953,  d: "Hillary and Tenzing reach the summit",       e: "🏔️" },
  { t: "Netflix founded",                     y: 1997,  d: "DVD-by-mail startup launches",               e: "🎬" },
  { t: "American Declaration of Independence",y: 1776,  d: "Thirteen colonies break from Britain",       e: "🦅" },
  { t: "First antibiotic used clinically",    y: 1942,  d: "Penicillin saves soldiers in WWII",          e: "💊" },
  { t: "Black Death peaks in Europe",         y: 1349,  d: "Plague kills one-third of Europe",           e: "☠️" },
  { t: "Galileo confirms Earth orbits Sun",   y: 1610,  d: "Observations with the telescope",            e: "🔭" },
  { t: "First BBC television broadcast",      y: 1936,  d: "BBC launches public TV service",             e: "📺" },
  { t: "First computer bug found",            y: 1947,  d: "Grace Hopper finds a moth in a relay",       e: "🐛" },
  { t: "Soviet Union collapses",              y: 1991,  d: "Cold War era ends officially",               e: "🗺️" },
  { t: "Great Wall of China completed",       y: 1644,  d: "Final Ming dynasty sections finished",       e: "🏯" },
  { t: "ENIAC computer built",                y: 1945,  d: "First general-purpose electronic computer",  e: "🖥️" },
  { t: "Gutenberg Bible printed",             y: 1455,  d: "First major book printed in Europe",         e: "📚" },
];

// ─── State ────────────────────────────────────────────────────────────────────

let N, hand, placed, ci, score, pendingGap, confirmed, dragging, hoverGap;
let gapRects = [];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatYear(y) {
  return y < 0 ? Math.abs(y) + ' BC' : String(y);
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── DOM references ───────────────────────────────────────────────────────────

const ghost     = document.getElementById('ghost');
const ghostE    = document.getElementById('ghost-e');
const ghostT    = document.getElementById('ghost-t');
const tlEl      = document.getElementById('tl');
const fbEl      = document.getElementById('fb');
const svEl      = document.getElementById('sv');
const pgEl      = document.getElementById('pg');
const currCard  = document.getElementById('curr-card');
const dragHint  = document.getElementById('drag-hint');
const nbtn      = document.getElementById('nbtn');

// ─── Setup screen ─────────────────────────────────────────────────────────────

document.querySelectorAll('.cb').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.cb').forEach(b => b.classList.remove('sel'));
    btn.classList.add('sel');
    N = +btn.dataset.n;
    document.getElementById('sbtn').disabled = false;
  });
});

document.getElementById('sbtn').addEventListener('click', startGame);
document.getElementById('abtn').addEventListener('click', () => {
  document.getElementById('end').style.display = 'none';
  document.getElementById('setup').style.display = 'block';
  document.querySelectorAll('.cb').forEach(b => b.classList.remove('sel'));
  document.getElementById('sbtn').disabled = true;
});

nbtn.addEventListener('click', nextCard);

// ─── Game flow ────────────────────────────────────────────────────────────────

function startGame() {
  hand      = shuffle(DECK).slice(0, N);
  placed    = [{ ...hand[0], s: 'anc' }];
  ci        = 1;
  score     = 0;
  pendingGap = null;
  confirmed  = false;
  dragging   = false;
  hoverGap   = null;

  document.getElementById('setup').style.display = 'none';
  document.getElementById('play').style.display  = 'block';
  document.getElementById('end').style.display   = 'none';

  updateTop();
  renderCurrent();
  renderTimeline();
}

function updateTop() {
  svEl.textContent = score;
  pgEl.textContent = 'Card ' + (ci + 1) + ' of ' + N;
}

function renderCurrent() {
  const c = hand[ci];
  document.getElementById('ce').textContent  = c.e;
  document.getElementById('ctt').textContent = c.t;
  document.getElementById('cd').textContent  = c.d;
  currCard.className = 'curr-card';
  dragHint.style.display = 'block';
  nbtn.style.display     = 'none';
  fbEl.style.display     = 'none';
  pendingGap = null;
  confirmed  = false;
  hoverGap   = null;
  dragging   = false;
  attachDrag();
}

function nextCard() {
  ci++;
  if (ci >= N) { endGame(); return; }
  confirmed  = false;
  pendingGap = null;
  hoverGap   = null;
  dragging   = false;
  nbtn.style.display = 'none';
  fbEl.style.display = 'none';
  renderCurrent();
  renderTimeline();
}

function endGame() {
  document.getElementById('play').style.display = 'none';
  document.getElementById('end').style.display  = 'block';
  const tot = N - 1;
  document.getElementById('fs').textContent = score + '/' + tot;
  document.getElementById('fv').textContent =
    score === tot         ? 'Perfect round! Historian level.'  :
    score >= tot * 0.75   ? 'Well done! Sharp memory.'         :
    score >= tot * 0.5    ? 'Not bad — keep practicing!'       :
                            'History is tricky. Try again!';
}

// ─── Drag & Drop ──────────────────────────────────────────────────────────────

function attachDrag() {
  currCard.onmousedown = e => { e.preventDefault(); startDrag(e.clientX, e.clientY); };
  currCard.ontouchstart = e => { const t = e.touches[0]; startDrag(t.clientX, t.clientY); };
}

function collectGapRects() {
  gapRects = [];
  const cards = Array.from(document.querySelectorAll('.tl-card-el'));
  const tlRect = tlEl.getBoundingClientRect();
  const total  = placed.length;

  for (let i = 0; i <= total; i++) {
    let top, bottom;
    if (i === 0) {
      top    = tlRect.top - 20;
      bottom = cards[0] ? cards[0].getBoundingClientRect().top : tlRect.bottom;
    } else if (i === total) {
      const lastR = cards[total - 1] ? cards[total - 1].getBoundingClientRect() : null;
      top    = lastR ? lastR.bottom : tlRect.top;
      bottom = tlRect.bottom + 80;
    } else {
      top    = cards[i - 1].getBoundingClientRect().bottom;
      bottom = cards[i].getBoundingClientRect().top;
    }
    gapRects.push({ idx: i, top, bottom });
  }
}

function gapAtY(cy) {
  for (const g of gapRects) {
    if (cy >= g.top && cy <= g.bottom) return g.idx;
  }
  // fallback: nearest gap within 100px
  let best = null, bestD = Infinity;
  for (const g of gapRects) {
    const mid = (g.top + g.bottom) / 2;
    const d   = Math.abs(cy - mid);
    if (d < bestD) { bestD = d; best = g.idx; }
  }
  return bestD < 100 ? best : null;
}

function startDrag(sx, sy) {
  if (confirmed) return;
  dragging  = true;
  hoverGap  = null;
  renderTimeline();
  setTimeout(collectGapRects, 30);

  ghost.style.display = 'flex';
  ghostE.textContent  = hand[ci].e;
  ghostT.textContent  = hand[ci].t;
  moveGhost(sx, sy);
  currCard.classList.add('dragging-src');

  function onMove(cx, cy) {
    moveGhost(cx, cy);
    const g = gapAtY(cy);
    if (g !== hoverGap) {
      hoverGap = g;
      renderTimeline();
      setTimeout(collectGapRects, 20);
    }
  }

  function onUp(cx, cy) {
    ghost.style.display = 'none';
    dragging = false;
    currCard.classList.remove('dragging-src');
    document.removeEventListener('mousemove', mm);
    document.removeEventListener('mouseup', mu);
    document.removeEventListener('touchmove', tm);
    document.removeEventListener('touchend', te);
    const g = gapAtY(cy);
    hoverGap = null;
    if (g !== null) snapCard(g);
    else renderTimeline();
  }

  function mm(e) { onMove(e.clientX, e.clientY); }
  function mu(e) { onUp(e.clientX, e.clientY); }
  function tm(e) { e.preventDefault(); const t = e.touches[0]; onMove(t.clientX, t.clientY); }
  function te(e) { const t = e.changedTouches[0]; onUp(t.clientX, t.clientY); }

  document.addEventListener('mousemove', mm);
  document.addEventListener('mouseup', mu);
  document.addEventListener('touchmove', tm, { passive: false });
  document.addEventListener('touchend', te);
}

function moveGhost(cx, cy) {
  ghost.style.left = (cx + 14) + 'px';
  ghost.style.top  = (cy - 18) + 'px';
}

function snapCard(gapIdx) {
  pendingGap = gapIdx;
  currCard.className     = 'curr-card faded';
  dragHint.style.display = 'none';
  renderTimeline();
}

// ─── Render timeline ──────────────────────────────────────────────────────────

function renderTimeline() {
  tlEl.innerHTML = '';

  for (let i = 0; i <= placed.length; i++) {
    const isHovered = dragging && hoverGap === i;
    const isSnapped = !dragging && pendingGap === i;

    // Gap slot
    if (isHovered) {
      const slot = document.createElement('div');
      slot.className = 'gap-slot open';
      const dz = document.createElement('div');
      dz.className   = 'drop-zone';
      dz.textContent = 'Drop here';
      slot.appendChild(dz);
      tlEl.appendChild(slot);

    } else if (isSnapped) {
      const c  = hand[ci];
      const pv = document.createElement('div');
      pv.className = 'preview-card';
      pv.innerHTML =
        '<span class="pe">' + c.e + '</span>' +
        '<span class="pt">' + c.t + '</span>' +
        '<button class="place-btn" id="place-btn-inline">Place it ✓</button>';
      tlEl.appendChild(pv);
      setTimeout(() => {
        const btn = document.getElementById('place-btn-inline');
        if (btn) btn.addEventListener('click', confirmPlacement);
      }, 0);
    }

    // Placed card
    if (i < placed.length) {
      const p  = placed[i];
      const pc = document.createElement('div');
      pc.className = 'pc ' + p.s + ' tl-card-el';
      pc.innerHTML =
        '<span class="pe2">' + p.e + '</span>' +
        '<span class="pt2">' + p.t + '</span>' +
        '<span class="py2">' + formatYear(p.y) + '</span>' +
        (p.s === 'ok'  ? '<span class="pico">✓</span>' :
         p.s === 'bad' ? '<span class="pico">✗</span>' : '');
      tlEl.appendChild(pc);
    }
  }

  if (dragging) setTimeout(collectGapRects, 20);
}

// ─── Confirm placement ────────────────────────────────────────────────────────

function confirmPlacement() {
  if (pendingGap === null) return;
  confirmed = true;

  const card = hand[ci];
  const g    = pendingGap;
  const ly   = g > 0             ? placed[g - 1].y : -Infinity;
  const ry   = g < placed.length ? placed[g].y     :  Infinity;
  const ok   = card.y >= ly && card.y <= ry;

  const entry = { ...card, s: ok ? 'ok' : 'bad' };
  placed.splice(g, 0, entry);

  if (!ok) {
    // Move card to its correct sorted position
    placed.splice(placed.indexOf(entry), 1);
    const tp = placed.findIndex(p => p.y > card.y);
    if (tp === -1) placed.push(entry);
    else placed.splice(tp, 0, entry);
  }

  if (ok) score++;

  fbEl.textContent = ok
    ? 'Correct! ' + card.t + ' was in ' + formatYear(card.y) + '.'
    : 'Not quite — ' + card.t + ' was in ' + formatYear(card.y) + '.';
  fbEl.className    = 'fb ' + (ok ? 'ok' : 'bad');
  fbEl.style.display = 'block';

  nbtn.style.display = 'inline-block';
  pendingGap = null;
  updateTop();
  renderTimeline();
}
