/* ============================================================
 * Lentera Meuseuraya — Challenge Energi
 * Vanilla JS — shared across index.html, duel.html, result.html
 * ============================================================ */

/* ---------- Shared constants ---------- */
const STORAGE_KEY = 'lentera_duel_state_v1';
const RESULT_KEY  = 'lentera_duel_result_v1';

const QUESTIONS = [
  { q:"Saat bencana banjir bandang melanda Sumatra dan terjadi blackout (mati lampu total) di suatu daerah, solusi energi terbaik jangka panjang yang paling aman dan ramah lingkungan untuk posko pengungsian adalah dengan memanfaatkan energi matahari (panel surya).", a:true },
  { q:"Di wilayah tempat tinggal Doni sedang mengalami blackout berkepanjangan akibat bencana banjir. Karena takut kegelapan, Doni ikut-ikutan panic buying dengan memborong habis lilin di toko grosir dan mengantre bensin berjam-jam. Apakah tindakan yang dilakukan Doni itu tepat?", a:false },
  { q:"Toko kelontong di desa terendam banjir dan warga panik berebut membeli baterai sekali pakai untuk senter. Alternatif teknologi energi terbarukan yang bisa dibagikan ke warga agar mereka tidak perlu panic buying baterai adalah senter bertenaga dinamo engkol atau tenaga surya mini.", a:true },
  { q:"Saat listrik PLN padam total akibat banjir Sumatra, warga menyerbu toko untuk membeli lilin dan genset berbahan bakar minyak. Tindakan berbelanja berlebihan karena rasa panik ini disebut dengan istilah Panic Buying.", a:true },
  { q:"Setelah banjir Sumatra surut, cuaca berubah menjadi sangat panas dan terik. Budi berpendapat bahwa semakin panas suhu udara di sekitar posko, maka panel surya akan menghasilkan listrik berkali-kali lipat lebih banyak.", a:false },
  { q:"Menggabungkan beberapa panel surya kecil milik warga yang selamat menjadi satu jaringan lokal bersama (Mini-Grid) terbukti mampu mempercepat pemulihan energi desa dari dampak pemadaman total PLN.", a:true },
  { q:"Panel surya darurat dipasang di atas atap posko pengungsian yang tinggi bebas dari banjir. Namun, sebagian permukaannya tertutup bayangan pohon besar (shading). Produksi listrik panel tersebut akan tetap keluar 100% maksimal karena matahari sangat terik.", a:false },
  { q:"Menggunakan lampu jenis LED hemat daya di posko pengungsian Sumatra jauh lebih cerdas daripada memakai lampu pijar hias berdaya besar, karena bisa menghemat cadangan baterai surya untuk bertahan sepanjang malam.", a:true },
  { q:"Berdasarkan prinsip efisiensi energi terbarukan, menggunakan energi dari panel surya di siang hari secara langsung untuk menyalakan pompa air tandon jauh lebih hemat baterai daripada menyalakan pompanya di malam hari.", a:true },
  { q:"Energi matahari yang diubah oleh panel surya menjadi listrik adalah salah satu contoh energi terbarukan. Keuntungan utama menggunakan energi ini di lokasi bencana banjir Sumatra yang terisolasi adalah karena sumber energinya (matahari) tersedia gratis di alam dan sistemnya bisa berdiri sendiri tanpa bergantung pada kabel PLN yang putus.", a:true }
];

const GROUPS = ['Surya','Angin','Air','Bio'];

/* ---------- Avatar SVGs (renewable-energy themed, hand-drawn) ---------- */
const AVATARS = {
  sun:    `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g><circle cx="50" cy="50" r="22" fill="#FFD54A" stroke="#5B341F" stroke-width="3"/><g stroke="#5B341F" stroke-width="3" stroke-linecap="round"><line x1="50" y1="10" x2="50" y2="22"/><line x1="50" y1="78" x2="50" y2="90"/><line x1="10" y1="50" x2="22" y2="50"/><line x1="78" y1="50" x2="90" y2="50"/><line x1="22" y1="22" x2="30" y2="30"/><line x1="70" y1="70" x2="78" y2="78"/><line x1="78" y1="22" x2="70" y2="30"/><line x1="22" y1="78" x2="30" y2="70"/></g><circle cx="43" cy="48" r="2.5" fill="#5B341F"/><circle cx="57" cy="48" r="2.5" fill="#5B341F"/><path d="M42 56 Q50 62 58 56" stroke="#5B341F" stroke-width="2.5" fill="none" stroke-linecap="round"/></g></svg>`,
  panel:  `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="18" y="28" width="64" height="44" rx="4" fill="#3B2417" stroke="#5B341F" stroke-width="3"/><g stroke="#F4C542" stroke-width="2"><line x1="18" y1="42" x2="82" y2="42"/><line x1="18" y1="58" x2="82" y2="58"/><line x1="40" y1="28" x2="40" y2="72"/><line x1="60" y1="28" x2="60" y2="72"/></g><rect x="46" y="72" width="8" height="14" fill="#5B341F"/><circle cx="78" cy="20" r="8" fill="#FFD54A" stroke="#5B341F" stroke-width="2"/></svg>`,
  leaf:   `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 15 C20 25, 18 70, 50 88 C82 70, 80 25, 50 15Z" fill="#6D8F2E" stroke="#5B341F" stroke-width="3"/><path d="M50 18 L50 86" stroke="#4F6B1F" stroke-width="2"/><path d="M50 40 Q35 45 32 55" stroke="#4F6B1F" stroke-width="2" fill="none"/><path d="M50 40 Q65 45 68 55" stroke="#4F6B1F" stroke-width="2" fill="none"/><path d="M50 60 Q38 65 36 75" stroke="#4F6B1F" stroke-width="2" fill="none"/><path d="M50 60 Q62 65 64 75" stroke="#4F6B1F" stroke-width="2" fill="none"/></svg>`,
  wind:   `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="46" y="50" width="8" height="40" fill="#5B341F"/><circle cx="50" cy="50" r="6" fill="#F4C542" stroke="#5B341F" stroke-width="2"/><g fill="#FFF9EE" stroke="#5B341F" stroke-width="2.5"><path d="M50 50 L50 18 Q56 22 58 30 L52 48Z"/><path d="M50 50 L78 64 Q72 68 64 66 L50 56Z"/><path d="M50 50 L22 64 Q28 68 36 66 L50 56Z"/></g></svg>`,
  bulb:   `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 14 C32 14 22 28 22 42 C22 54 30 60 34 68 L66 68 C70 60 78 54 78 42 C78 28 68 14 50 14Z" fill="#FFD54A" stroke="#5B341F" stroke-width="3"/><rect x="36" y="68" width="28" height="6" fill="#5B341F"/><rect x="38" y="76" width="24" height="6" fill="#5B341F"/><rect x="42" y="84" width="16" height="4" fill="#5B341F"/><path d="M42 36 Q50 30 58 36" stroke="#5B341F" stroke-width="2.5" fill="none"/></svg>`,
  drop:   `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 12 C30 38 22 56 22 68 A28 28 0 0 0 78 68 C78 56 70 38 50 12Z" fill="#6D8F2E" stroke="#5B341F" stroke-width="3"/><circle cx="42" cy="62" r="3" fill="#FFF9EE" opacity=".8"/><circle cx="38" cy="55" r="2" fill="#FFF9EE" opacity=".7"/></svg>`,
  flame:  `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 14 C44 30 36 36 36 50 C36 38 42 32 46 28 C44 44 56 46 56 60 C56 50 64 46 64 56 C64 76 56 86 50 86 C40 86 30 78 30 64 C30 46 44 38 50 14Z" fill="#F4C542" stroke="#5B341F" stroke-width="3"/><path d="M50 50 C48 60 52 66 52 74" stroke="#5B341F" stroke-width="2" fill="none"/></svg>`,
  battery:`<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="22" y="32" width="50" height="44" rx="6" fill="#FFF9EE" stroke="#5B341F" stroke-width="3"/><rect x="72" y="44" width="8" height="20" fill="#5B341F"/><rect x="28" y="38" width="38" height="32" fill="#6D8F2E"/><path d="M40 44 L34 60 L46 60 L40 72" stroke="#FFD54A" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`
};
const AVATAR_LIST = Object.keys(AVATARS);

/* ---------- Audio (WebAudio, no asset files) ---------- */
let _ac = null;
function ac(){ if(!_ac){ try{ _ac = new (window.AudioContext||window.webkitAudioContext)(); }catch(e){} } return _ac; }
function beep(freq, dur, type='sine', vol=0.18){
  const a = ac(); if(!a) return;
  const o = a.createOscillator(); const g = a.createGain();
  o.type = type; o.frequency.value = freq; o.connect(g); g.connect(a.destination);
  const t = a.currentTime;
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(vol, t+0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t+dur);
  o.start(t); o.stop(t+dur+0.02);
}
const SFX = {
  correct(){ beep(660,0.12,'triangle',0.18); setTimeout(()=>beep(990,0.18,'triangle',0.18),120); },
  wrong(){ beep(180,0.25,'sawtooth',0.18); },
  tick(){ beep(1200,0.04,'square',0.10); },
  go(){ beep(880,0.25,'triangle',0.2); },
  count(){ beep(520,0.12,'sine',0.18); },
  win(){ [523,659,784,1046].forEach((f,i)=>setTimeout(()=>beep(f,0.22,'triangle',0.2),i*140)); }
};

/* ---------- Helpers ---------- */
function $(sel, root=document){ return root.querySelector(sel); }
function $all(sel, root=document){ return Array.from(root.querySelectorAll(sel)); }
function saveState(s){ localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); }
function loadState(){ try{ return JSON.parse(localStorage.getItem(STORAGE_KEY)||'null'); }catch(e){ return null; } }
function saveResult(r){ localStorage.setItem(RESULT_KEY, JSON.stringify(r)); }
function loadResult(){ try{ return JSON.parse(localStorage.getItem(RESULT_KEY)||'null'); }catch(e){ return null; } }

/* =========================================================
 * SETUP PAGE
 * ========================================================= */
const LenteraSetup = {
  state: {
    1: { name:'', avatar:null, group:null },
    2: { name:'', avatar:null, group:null }
  },
  init(){
    if(!document.body.classList.contains('page-setup')) return;
    [1,2].forEach(p => this.buildPlayerCard(p));
    $('#start-btn').addEventListener('click', () => this.start());
    this.refresh();
  },
  buildPlayerCard(p){
    const avRow = $(`[data-avatar-row="${p}"]`);
    AVATAR_LIST.forEach(key => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'avatar-pick';
      btn.dataset.key = key;
      btn.innerHTML = AVATARS[key];
      btn.addEventListener('click', () => {
        this.state[p].avatar = key;
        $all('.avatar-pick', avRow).forEach(b => b.classList.toggle('selected', b.dataset.key === key));
        $(`#avatar-display-${p}`).innerHTML = AVATARS[key];
        this.refresh();
      });
      avRow.appendChild(btn);
    });
    const grpRow = $(`[data-group-row="${p}"]`);
    GROUPS.forEach(g => {
      const b = document.createElement('button');
      b.type='button'; b.className='group-btn'; b.textContent = 'Kelompok ' + g;
      b.addEventListener('click', () => {
        this.state[p].group = g;
        $all('.group-btn', grpRow).forEach(x => x.classList.toggle('selected', x === b));
        this.refresh();
      });
      grpRow.appendChild(b);
    });
    $(`#name-${p}`).addEventListener('input', e => {
      this.state[p].name = e.target.value.trim();
      this.refresh();
    });
  },
  refresh(){
    const ok = [1,2].every(p => this.state[p].name && this.state[p].avatar && this.state[p].group);
    $('#start-btn').disabled = !ok;
    $('#start-hint').style.visibility = ok ? 'hidden' : 'visible';
  },
  start(){
    saveState({
      players: this.state,
      qIndex: 0,
      scores: {1:0, 2:0},
      combos: {1:0, 2:0}
    });
    localStorage.removeItem(RESULT_KEY);
    location.href = 'duel.html';
  }
};

/* =========================================================
 * DUEL PAGE — real-time simultaneous
 * ========================================================= */
const LenteraDuel = {
  state: null,
  timer: null,
  timeLeft: 20,
  TIME_MAX: 20,
  answered: {1:false, 2:false},
  lastTick: null,
  resolving: false,

  init(){
    if(!document.body.classList.contains('page-duel')) return;
    this.state = loadState();
    if(!this.state){ location.href = 'index.html'; return; }

    // Fill player heads
    [1,2].forEach(p => {
      $(`#side-avatar-${p}`).innerHTML = AVATARS[this.state.players[p].avatar];
      $(`#side-name-${p}`).textContent = this.state.players[p].name;
      $(`#intro-avatar-${p}`).innerHTML = AVATARS[this.state.players[p].avatar];
      $(`#intro-name-${p}`).textContent = this.state.players[p].name;
      $(`#intro-group-${p}`).textContent = 'Kelompok ' + this.state.players[p].group;
      $(`#score-${p}`).textContent = this.state.scores[p];
    });

    // Answer buttons
    $all('.answer-btn').forEach(b => {
      b.addEventListener('click', () => {
        const p = +b.dataset.player;
        const ans = b.dataset.answer === 'true';
        this.submitAnswer(p, ans);
      });
    });

    // Keyboard shortcuts: P1 = A/Z, P2 = K/M
    document.addEventListener('keydown', e => {
      const k = e.key.toLowerCase();
      if(k==='a') this.submitAnswer(1, true);
      else if(k==='z') this.submitAnswer(1, false);
      else if(k==='k') this.submitAnswer(2, true);
      else if(k==='m') this.submitAnswer(2, false);
    });

    this.runIntro();
  },

  runIntro(){
    const cd = $('#countdown');
    const seq = ['3','2','1','MULAI'];
    let i = 0;
    cd.textContent = seq[i];
    SFX.count();
    const tick = () => {
      i++;
      if(i < seq.length){
        cd.textContent = seq[i];
        cd.style.animation = 'none'; void cd.offsetWidth; cd.style.animation = '';
        if(seq[i]==='MULAI') SFX.go(); else SFX.count();
        setTimeout(tick, 750);
      } else {
        const overlay = $('#intro');
        overlay.classList.add('hide');
        setTimeout(() => { overlay.style.display = 'none'; this.loadQuestion(); }, 400);
      }
    };
    setTimeout(tick, 750);
  },

  loadQuestion(){
    const idx = this.state.qIndex;
    const q = QUESTIONS[idx];
    $('#q-index').textContent = (idx+1);
    $('#q-text').textContent = q.q;
    const isFinal = (idx === QUESTIONS.length - 1);
    $('#hud-final').hidden = !isFinal;
    $('#q-panel').classList.toggle('final-q', isFinal);

    this.answered = {1:false, 2:false};
    this.resolving = false;
    $all('.answer-btn').forEach(b => {
      b.classList.remove('locked','correct','wrong');
      b.disabled = false;
    });
    [1,2].forEach(p => $(`#side-${p}`).classList.remove('correct-flash','wrong-flash'));

    this.updateLeaderboard();
    this.startTimer();
  },

  startTimer(){
    clearInterval(this.timer);
    this.timeLeft = this.TIME_MAX;
    this.updateRing();
    this.timer = setInterval(() => {
      this.timeLeft -= 1;
      this.updateRing();
      if(this.timeLeft <= 5 && this.timeLeft > 0) SFX.tick();
      if(this.timeLeft <= 0){
        clearInterval(this.timer);
        // Force unanswered players to wrong
        [1,2].forEach(p => { if(!this.answered[p]) this.submitAnswer(p, null, true); });
        this.resolveRound(true);
      }
    }, 1000);
  },

  updateRing(){
    const ring = $('#timer-ring');
    const fg = $('#ring-fg');
    const C = 2*Math.PI*44; // ≈ 276.46
    const ratio = Math.max(0, this.timeLeft) / this.TIME_MAX;
    fg.style.strokeDashoffset = (C * (1 - ratio)).toFixed(2);
    $('#timer-num').textContent = Math.max(0, this.timeLeft);
    ring.classList.toggle('warn', this.timeLeft <= 10 && this.timeLeft > 5);
    ring.classList.toggle('crit', this.timeLeft <= 5);
  },

  submitAnswer(p, ans, forced=false){
    if(this.resolving) return;
    if(this.answered[p]) return;
    this.answered[p] = { ans, forced };
    // Lock that player's buttons
    $all(`.answer-btn[data-player="${p}"]`).forEach(b => {
      b.classList.add('locked'); b.disabled = true;
    });
    // If both answered, resolve immediately
    if(this.answered[1] && this.answered[2] && !forced){
      clearInterval(this.timer);
      this.resolveRound(false);
    }
  },

  resolveRound(/*timeUp*/){
    if(this.resolving) return;
    this.resolving = true;
    const correct = QUESTIONS[this.state.qIndex].a;
    [1,2].forEach(p => {
      const a = this.answered[p];
      const userAns = a ? a.ans : null;
      const isCorrect = (userAns === correct);
      const btn = document.querySelector(`.answer-btn[data-player="${p}"][data-answer="${correct}"]`);
      const wrongBtn = document.querySelector(`.answer-btn[data-player="${p}"][data-answer="${!correct}"]`);
      btn.classList.add('correct');
      if(isCorrect){
        this.state.scores[p] += 10;
        this.state.combos[p] += 1;
        $(`#side-${p}`).classList.add('correct-flash');
        this.spawnFloat(p, '+10');
        this.animateScore(p);
      } else {
        this.state.combos[p] = 0;
        if(userAns !== null) wrongBtn.classList.add('wrong');
        $(`#side-${p}`).classList.add('wrong-flash');
      }
      this.updateCombo(p);
    });

    // Single sound (avoid double-blast)
    const anyCorrect = [1,2].some(p => this.answered[p] && this.answered[p].ans === correct);
    if(anyCorrect) SFX.correct(); else SFX.wrong();

    saveState(this.state);

    setTimeout(() => this.next(), 1800);
  },

  animateScore(p){
    const el = $(`#score-${p}`);
    el.textContent = this.state.scores[p];
    el.style.transition = 'transform .2s ease';
    el.style.transform = 'scale(1.4)';
    setTimeout(() => el.style.transform = 'scale(1)', 200);
  },

  spawnFloat(p, text){
    const f = document.createElement('div');
    f.className = 'float-plus';
    f.textContent = text;
    $(`#floaters-${p}`).appendChild(f);
    setTimeout(() => f.remove(), 1200);
  },

  updateCombo(p){
    const c = this.state.combos[p];
    const el = $(`#combo-${p}`);
    el.classList.remove('fire');
    if(c >= 5){ el.textContent = 'ENERGY MASTER'; el.classList.add('fire'); }
    else if(c === 4){ el.textContent = 'ON FIRE'; el.classList.add('fire'); }
    else if(c === 3){ el.textContent = 'COMBO x3'; }
    else if(c === 2){ el.textContent = 'COMBO x2'; }
    else el.textContent = '';
  },

  updateLeaderboard(){
    const s1 = this.state.scores[1], s2 = this.state.scores[2];
    const lb = $('#lb-name');
    if(s1 === s2) lb.textContent = 'TIE GAME';
    else lb.textContent = (s1 > s2 ? this.state.players[1].name : this.state.players[2].name)
                          + '  ' + Math.max(s1,s2);
  },

  next(){
    this.state.qIndex += 1;
    saveState(this.state);
    if(this.state.qIndex >= QUESTIONS.length){
      // finish
      const players = this.state.players;
      const s = this.state.scores;
      let winner = 0; // 0 = tie
      if(s[1] > s[2]) winner = 1;
      else if(s[2] > s[1]) winner = 2;
      saveResult({
        players,
        scores: s,
        winner
      });
      SFX.win();
      location.href = 'result.html';
      return;
    }
    this.loadQuestion();
  }
};

/* =========================================================
 * RESULT PAGE
 * ========================================================= */
const LenteraResult = {
  init(){
    if(!document.body.classList.contains('page-result')) return;
    const r = loadResult();
    if(!r){ location.href = 'index.html'; return; }

    [1,2].forEach(p => {
      $(`#result-avatar-${p}`).innerHTML = AVATARS[r.players[p].avatar];
      $(`#result-name-${p}`).textContent = r.players[p].name;
      $(`#result-group-${p}`).textContent = 'Kelompok ' + r.players[p].group;
      $(`#result-score-${p}`).textContent = r.scores[p];
      $(`#result-pct-${p}`).textContent = ((r.scores[p]/100)*100).toFixed(0) + '%';
    });

    if(r.winner === 0){
      $('#winner-name').textContent = 'SERI';
      $('#winner-avatar').innerHTML = AVATARS[r.players[1].avatar];
      $('#winner-score').textContent = r.scores[1] + ' : ' + r.scores[2];
    } else {
      const w = r.winner;
      $('#winner-name').textContent = r.players[w].name;
      $('#winner-avatar').innerHTML = AVATARS[r.players[w].avatar];
      $('#winner-score').textContent = r.scores[w] + ' POIN';
      $(`#result-card-${w}`).classList.add('winner');
    }

    this.confetti();

    $('#play-again').addEventListener('click', () => {
      // keep player setup, reset progress
      const s = loadState();
      if(s){
        s.qIndex = 0;
        s.scores = {1:0,2:0};
        s.combos = {1:0,2:0};
        saveState(s);
      }
      location.href = 'duel.html';
    });
    $('#finish').addEventListener('click', () => {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(RESULT_KEY);
      location.href = 'index.html';
    });
  },

  confetti(){
    const root = $('#confetti');
    const colors = ['#F4C542','#FFD54A','#6D8F2E','#4F6B1F','#5B341F'];
    for(let i=0;i<80;i++){
      const s = document.createElement('span');
      s.style.left = Math.random()*100 + 'vw';
      s.style.background = colors[i % colors.length];
      s.style.animationDuration = (3 + Math.random()*3) + 's';
      s.style.animationDelay = (Math.random()*1.5) + 's';
      s.style.transform = `rotate(${Math.random()*360}deg)`;
      root.appendChild(s);
    }
  }
};

/* Expose for inline init scripts */
window.LenteraSetup = LenteraSetup;
window.LenteraDuel = LenteraDuel;
window.LenteraResult = LenteraResult;