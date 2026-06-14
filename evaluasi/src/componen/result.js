import { createAvatarIcon } from './avataricon.js';

function createSvgElement(tag, attributes, innerHTML) {
  const elem = document.createElementNS('http://www.w3.org/2000/svg', tag);
  Object.entries(attributes).forEach(([key, value]) => {
    elem.setAttribute(key, String(value));
  });
  if (innerHTML) elem.innerHTML = innerHTML;
  return elem;
}

function CrownIcon() {
  const svg = createSvgElement('svg', {
    width: 48,
    height: 48,
    viewBox: '0 0 48 48',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
  });

  svg.innerHTML = `
    <path d="M8 36L4 14L14 22L24 8L34 22L44 14L40 36H8Z" fill="#F2C94C" stroke="#8B6914" stroke-width="2" />
    <rect x="8" y="36" width="32" height="4" fill="#8B6914" rx="1" />
    <circle cx="24" cy="20" r="3" fill="#8B6914" />
    <circle cx="14" cy="22" r="2" fill="#8B6914" />
    <circle cx="34" cy="22" r="2" fill="#8B6914" />
  `;

  return svg;
}

function GoldBadge() {
  const svg = createSvgElement('svg', {
    width: 40,
    height: 48,
    viewBox: '0 0 40 48',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
  });

  svg.innerHTML = `
    <circle cx="20" cy="18" r="16" fill="#F2C94C" stroke="#8B6914" stroke-width="2" />
    <path d="M20 6L22.5 14H31L24 19L26.5 27L20 22L13.5 27L16 19L9 14H17.5L20 6Z" fill="#8B6914" />
    <path d="M12 34L20 30L28 34V44L20 40L12 44V34Z" fill="#8B6914" />
    <path d="M12 34L20 38L28 34V44L20 40L12 44V34Z" fill="#6B3E26" />
  `;

  return svg;
}

function createResultCard(player, isWinner, maxScore) {
  const percentage = Math.round((player.score / maxScore) * 100);
  const card = document.createElement('div');
  card.className = `
    wood-texture wood-grain rounded-xl p-4 sm:p-6 border-2
    ${isWinner ? 'border-gold/60 winner-glow' : 'border-dark-brown/30'}
    shadow-lg transition-all duration-700 relative
  `.replace(/\s+/g, ' ').trim();

  const avatarWrapper = document.createElement('div');
  avatarWrapper.className = `w-16 h-16 sm:w-20 sm:h-20 bg-[#5A3420] rounded-xl p-2 ${isWinner ? 'ring-2 ring-gold' : ''}`.trim();
  avatarWrapper.appendChild(createAvatarIcon(player.avatar, 64));

  const nameBlock = document.createElement('div');
  nameBlock.className = 'text-center';
  nameBlock.innerHTML = `
    <p class="text-cream font-poppins font-bold text-sm sm:text-lg">${player.name}</p>
    <p class="text-gold/70 font-poppins font-semibold text-xs sm:text-sm">${player.group}</p>
  `;

  const scoreBlock = document.createElement('div');
  scoreBlock.className = 'bg-dark-brown/60 rounded-lg px-4 sm:px-6 py-2 sm:py-3 text-center';
  scoreBlock.innerHTML = `
    <p class="text-gold font-poppins font-extrabold text-2xl sm:text-3xl">${player.score}</p>
    <p class="text-cream/50 font-poppins text-[10px] sm:text-xs">POIN</p>
  `;

  const percentageBlock = document.createElement('div');
  percentageBlock.className = 'bg-dark-brown/40 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 text-center';
  percentageBlock.innerHTML = `
    <p class="text-cream font-poppins font-bold text-lg sm:text-xl">${percentage}%</p>
    <p class="text-cream/50 font-poppins text-[9px] sm:text-xs">NILAI</p>
  `;

  const barOuter = document.createElement('div');
  barOuter.className = 'w-full bg-dark-brown/40 rounded-full h-3 sm:h-4 overflow-hidden';
  const barInner = document.createElement('div');
  barInner.className = 'h-full score-bar-gradient rounded-full transition-all duration-1500 ease-out';
  barInner.style.width = '0%';
  barOuter.appendChild(barInner);

  if (isWinner) {
    const crownContainer = document.createElement('div');
    crownContainer.className = 'absolute -top-6 left-1/2 -translate-x-1/2';
    crownContainer.style.opacity = '0';
    crownContainer.appendChild(CrownIcon());
    card.appendChild(crownContainer);

    setTimeout(() => {
      crownContainer.style.transition = 'opacity 0.3s ease';
      crownContainer.style.opacity = '1';
    }, 200);
  }

  card.appendChild(avatarWrapper);
  card.appendChild(nameBlock);
  card.appendChild(scoreBlock);
  card.appendChild(percentageBlock);
  card.appendChild(barOuter);

  if (isWinner) {
    const badgeContainer = document.createElement('div');
    badgeContainer.className = 'animate-bounce-in';
    badgeContainer.style.animationDelay = '0.8s';
    badgeContainer.appendChild(GoldBadge());
    card.appendChild(badgeContainer);
  }

  setTimeout(() => {
    barInner.style.width = `${Math.min(percentage, 100)}%`;
  }, 100);

  return card;
}

export function renderResultScreen({ p1, p2, onPlayAgain, onFinish, maxScore = 100 }, container) {
  const winner = p1.score > p2.score ? p1 : p2.score > p1.score ? p2 : null;
  const isDraw = p1.score === p2.score;

  container.innerHTML = `
    <div class="min-h-screen flex flex-col items-center justify-center village-bg relative overflow-hidden">
      <div class="absolute top-0 left-0 right-0 h-2 wood-texture"></div>
      <div class="absolute bottom-0 left-0 right-0 h-2 wood-texture"></div>
      <div class="absolute top-6 left-[15%] w-24 h-10 bg-white/40 rounded-full blur-sm"></div>
      <div class="absolute top-3 right-[25%] w-20 h-8 bg-white/30 rounded-full blur-sm"></div>
      <div class="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#3A5A18] to-transparent"></div>
      <div class="relative z-10 w-full max-w-3xl px-3 sm:px-6 py-6 sm:py-10 flex flex-col items-center gap-5 sm:gap-8">
        <div class="wood-texture wood-grain rounded-xl px-5 sm:px-8 py-3 sm:py-4 border-2 border-gold/40 shadow-xl relative nail-decoration">
          <h2 class="text-cream font-poppins font-extrabold text-lg sm:text-2xl text-center">Hasil Challenge</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 w-full max-w-2xl">
          <div id="result-card-1"></div>
          <div id="result-card-2"></div>
        </div>
        <div id="result-summary"></div>
        <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-sm">
          <button id="playAgainBtn" class="flex-1 wood-texture wood-grain rounded-xl px-5 sm:px-6 py-3 border-2 border-gold/40 shadow-lg font-poppins font-bold text-cream text-sm sm:text-base hover:scale-105 active:scale-95 transition-transform relative nail-decoration">MAIN LAGI</button>
          <button id="finishBtn" class="flex-1 bg-dark-brown rounded-xl px-5 sm:px-6 py-3 border-2 border-cream/20 shadow-lg font-poppins font-bold text-cream text-sm sm:text-base hover:scale-105 active:scale-95 transition-transform">SELESAI</button>
        </div>
      </div>
    </div>
  `;

  const card1 = container.querySelector('#result-card-1');
  const card2 = container.querySelector('#result-card-2');
  const summary = container.querySelector('#result-summary');

  if (card1 && card2 && summary) {
    card1.appendChild(createResultCard(p1, winner === p1, maxScore));
    card2.appendChild(createResultCard(p2, winner === p2, maxScore));

    summary.className = 'animate-bounce-in wood-texture wood-grain rounded-xl px-6 sm:px-10 py-4 sm:py-6 border-2 border-gold/50 shadow-2xl winner-glow text-center';
    summary.innerHTML = isDraw
      ? `
        <p class="text-gold font-poppins font-extrabold text-xl sm:text-2xl">SERI</p>
        <p class="text-cream font-poppins font-bold text-sm sm:text-base mt-1">Kedua pemain mendapat ${p1.score} poin</p>
      `
      : `
        <p class="text-gold font-poppins font-extrabold text-base sm:text-lg tracking-wider uppercase">Pemenang Duel</p>
        <p class="text-cream font-poppins font-extrabold text-xl sm:text-3xl mt-1">${winner?.name || ''}</p>
      `;
  }

  const playAgainBtn = container.querySelector('#playAgainBtn');
  const finishBtn = container.querySelector('#finishBtn');

  if (playAgainBtn) playAgainBtn.addEventListener('click', onPlayAgain);
  if (finishBtn) finishBtn.addEventListener('click', onFinish);
}
