// ─── State ────────────────────────────────────────────────────────────────────
// DECK is loaded from data.js

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

// ─── DOM refs ─────────────────────────────────────────────────────────────────

const ghost    = document.getElementById('ghost');
const ghostE   = document.getElementById('ghost-e');
const ghostT   = document.getElementById('ghost-t');
const tlEl     = document.getElementById('tl');
const fbEl     = document.getElementById('fb');
const currCard = document.getElementById('curr-card');
const dragHint = document.getElementById('drag-hint');
const handLbl  = document.getElementById('hand-lbl');

// ─── Setup ────────────────────────────────────────────────────────────────────

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
  document.getElementById('sv').textContent = score;
  document.getElementById('pg').textContent = 'Card ' + (ci + 1) + ' of ' + N;
}

function renderCurrent() {
  const c = hand[ci];
  document.getElementById('ce').textContent  = c.e;
  document.getElementById('ctt').textContent = c.t;
  document.getElementById('cd').textContent  = c.d;

  currCard.className     = 'curr-card';
  dragHint.style.display = 'block';
  handLbl.textContent    = 'Drag this card onto the timeline below';
  fbEl.style.display     = 'none';

  pendingGap = null;
  confirmed  = false;
  hoverGap   = null;
  dragging   = false;

  makeDraggable(currCard, false);
}

function advanceCard() {
  ci++;
  if (ci >= N) {
    endGame();
  } else {
    confirmed = false;
    renderCurrent();
    renderTimeline();
  }
}

function endGame() {
  document.getElementById('play').style.display = 'none';
  document.getElementById('end').style.display  = 'block';
  const tot = N - 1;
  document.getElementById('fs').textContent = score + '/' + tot;
  document.getElementById('fv').textContent =
    score === tot       ? 'Perfect round! Historian level.'  :
    score >= tot * 0.75 ? 'Well done! Sharp memory.'         :
    score >= tot * 0.5  ? 'Not bad — keep practicing!'       :
                          'History is tricky. Try again!';
}

// ─── Drag & drop ──────────────────────────────────────────────────────────────

/**
 * Attach drag behaviour to an element.
 * isPreview: true when dragging the snapped preview card in the timeline.
 * When dragging from preview we clear pendingGap so it disappears during drag.
 */
function makeDraggable(el, isPreview) {
  el.onmousedown = e => {
    if (e.target.classList.contains('place-btn')) return;
    if (confirmed) return;
    e.preventDefault();
    if (isPreview) pendingGap = null;
    startDrag(e.clientX, e.clientY, el);
  };
  el.ontouchstart = e => {
    if (e.target.classList.contains('place-btn')) return;
    if (confirmed) return;
    if (isPreview) pendingGap = null;
    const t = e.touches[0];
    startDrag(t.clientX, t.clientY, el);
  };
}

function collectGapRects() {
  gapRects = [];
  const cards   = Array.from(document.querySelectorAll('.tl-card-el'));
  const tlRect  = tlEl.getBoundingClientRect();
  const total   = placed.length;

  for (let i = 0; i <= total; i++) {
    let top, bottom;
    if (i === 0) {
      top    = tlRect.top - 20;
      bottom = cards[0] ? cards[0].getBoundingClientRect().top : tlRect.bottom;
    } else if (i === total) {
      const lr = cards[total - 1] ? cards[total - 1].getBoundingClientRect() : null;
      top    = lr ? lr.bottom : tlRect.top;
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
  // Fallback: nearest gap within 100px
  let best = null, bestD = Infinity;
  for (const g of gapRects) {
    const mid = (g.top + g.bottom) / 2;
    const d   = Math.abs(cy - mid);
    if (d < bestD) { bestD = d; best = g.idx; }
  }
  return bestD < 100 ? best : null;
}

function startDrag(sx, sy, srcEl) {
  dragging = true;
  hoverGap = null;
  renderTimeline();
  setTimeout(collectGapRects, 30);

  ghost.style.display = 'flex';
  ghostE.textContent  = hand[ci].e;
  ghostT.textContent  = hand[ci].t;
  moveGhost(sx, sy);

  srcEl.classList.add('dragging-src');
  currCard.className = 'curr-card faded';

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
    srcEl.classList.remove('dragging-src');
    document.removeEventListener('mousemove', mm);
    document.removeEventListener('mouseup',   mu);
    document.removeEventListener('touchmove', tm);
    document.removeEventListener('touchend',  te);

    const g = gapAtY(cy);
    hoverGap = null;

    if (g !== null) {
      snapCard(g);
    } else {
      // Dropped nowhere — revert to unsnapped state
      pendingGap = null;
      currCard.className     = 'curr-card';
      dragHint.style.display = 'block';
      handLbl.textContent    = 'Drag this card onto the timeline below';
      renderTimeline();
    }
  }

  const mm = e => onMove(e.clientX, e.clientY);
  const mu = e => onUp(e.clientX, e.clientY);
  const tm = e => { e.preventDefault(); const t = e.touches[0]; onMove(t.clientX, t.clientY); };
  const te = e => { const t = e.changedTouches[0]; onUp(t.clientX, t.clientY); };

  document.addEventListener('mousemove', mm);
  document.addEventListener('mouseup',   mu);
  document.addEventListener('touchmove', tm, { passive: false });
  document.addEventListener('touchend',  te);
}

function moveGhost(cx, cy) {
  ghost.style.left = (cx + 14) + 'px';
  ghost.style.top  = (cy - 18) + 'px';
}

function snapCard(gapIdx) {
  pendingGap             = gapIdx;
  currCard.className     = 'curr-card faded';
  dragHint.style.display = 'none';
  handLbl.textContent    = 'Drag to reposition, or tap Place it';
  renderTimeline();
}

// ─── Render timeline ──────────────────────────────────────────────────────────

function renderTimeline() {
  tlEl.innerHTML = '';

  for (let i = 0; i <= placed.length; i++) {
    const isHovered = dragging && hoverGap === i;
    const isSnapped = !dragging && pendingGap === i;

    // Gap slot — only visible when hovering or snapped
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

      const peSpan = document.createElement('span');
      peSpan.className   = 'pe';
      peSpan.textContent = c.e;

      const ptSpan = document.createElement('span');
      ptSpan.className   = 'pt';
      ptSpan.textContent = c.t;

      const btn = document.createElement('button');
      btn.className   = 'place-btn';
      btn.textContent = 'Place it ✓';
      // Stop mousedown/touchstart from bubbling to the card's drag handler
      btn.addEventListener('mousedown', e => e.stopPropagation(), true);
      btn.addEventListener('touchstart', e => e.stopPropagation(), true);
      btn.addEventListener('click', confirmPlacement);

      pv.appendChild(peSpan);
      pv.appendChild(ptSpan);
      pv.appendChild(btn);
      tlEl.appendChild(pv);

      // Allow re-dragging from the preview card
      makeDraggable(pv, true);
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
  if (pendingGap === null || confirmed) return;
  confirmed = true;

  const card = hand[ci];
  const g    = pendingGap;
  const ly   = g > 0             ? placed[g - 1].y : -Infinity;
  const ry   = g < placed.length ? placed[g].y     :  Infinity;
  const ok   = card.y >= ly && card.y <= ry;

  const entry = { ...card, s: ok ? 'ok' : 'bad' };
  placed.splice(g, 0, entry);

  if (!ok) {
    // Move to correct sorted position
    placed.splice(placed.indexOf(entry), 1);
    const tp = placed.findIndex(p => p.y > card.y);
    if (tp === -1) placed.push(entry);
    else placed.splice(tp, 0, entry);
  }

  if (ok) score++;

  fbEl.textContent  = ok
    ? 'Correct! ' + card.t + ' was in ' + formatYear(card.y) + '.'
    : 'Not quite — ' + card.t + ' was in ' + formatYear(card.y) + '.';
  fbEl.className    = 'fb ' + (ok ? 'ok' : 'bad');
  fbEl.style.display = 'block';

  pendingGap = null;
  updateTop();
  renderTimeline();

  // Auto-advance after a short pause so player can read feedback
  setTimeout(advanceCard, 1400);
}
