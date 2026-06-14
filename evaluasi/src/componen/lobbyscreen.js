import { createAvatarIcon } from './avataricon.js';

let avatarsData = [];
let groupsData = [];

export function setAvatarsData(avatars, groups) {
  avatarsData = avatars;
  groupsData = groups;
}

function createPlayerCard(label, playerState, onPlayerChange) {
  const card = document.createElement('div');
  card.className = 'wood-texture wood-grain rounded-xl p-4 sm:p-6 relative nail-decoration border-2 border-dark-brown/30 shadow-lg';

  const labelBadge = document.createElement('div');
  labelBadge.className =
    'absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold text-dark-brown font-poppins font-extrabold text-xs sm:text-sm px-3 sm:px-4 py-1 rounded-full shadow';
  labelBadge.textContent = label;

  const container = document.createElement('div');
  container.className = 'mt-3 space-y-4';

  // Name input section
  const nameSection = document.createElement('div');
  const nameLabel = document.createElement('label');
  nameLabel.className = 'block text-cream/80 font-poppins font-semibold text-xs sm:text-sm mb-1.5';
  nameLabel.textContent = 'Name';

  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.value = playerState.name;
  nameInput.placeholder = 'Enter name...';
  nameInput.maxLength = 20;
  nameInput.className =
    'w-full bg-[#5A3420] border-2 border-dark-brown/50 rounded-lg px-3 py-2 text-cream font-poppins font-semibold text-sm placeholder:text-cream/30 focus:outline-none focus:border-gold/60 transition-colors';

  let nameTouched = false;
  const errorMsg = document.createElement('p');
  errorMsg.className = 'text-red-400 text-xs font-poppins mt-1';
  errorMsg.style.display = 'none';
  errorMsg.textContent = 'Name is required';

  nameInput.addEventListener('change', (e) => {
    playerState.name = e.target.value;
    updateErrorMsg();
    onPlayerChange(playerState);
  });

  nameInput.addEventListener('blur', () => {
    nameTouched = true;
    updateErrorMsg();
  });

  const updateErrorMsg = () => {
    if (nameTouched && !playerState.name.trim()) {
      errorMsg.style.display = 'block';
    } else {
      errorMsg.style.display = 'none';
    }
  };

  nameSection.appendChild(nameLabel);
  nameSection.appendChild(nameInput);
  nameSection.appendChild(errorMsg);

  // Avatar selection section
  const avatarSection = document.createElement('div');
  const avatarLabel = document.createElement('label');
  avatarLabel.className = 'block text-cream/80 font-poppins font-semibold text-xs sm:text-sm mb-2';
  avatarLabel.textContent = 'Avatar';

  const avatarGrid = document.createElement('div');
  avatarGrid.className = 'grid grid-cols-4 gap-2';

  avatarsData.forEach((av) => {
    const btn = document.createElement('button');
    btn.className = `
      flex flex-col items-center gap-1 p-1.5 sm:p-2 rounded-lg transition-all duration-200
      ${playerState.avatar === av.id
        ? 'bg-gold/20 ring-2 ring-gold scale-105'
        : 'bg-[#5A3420]/60 hover:bg-[#5A3420] hover:scale-105'
      }
    `
      .replace(/\s+/g, ' ')
      .trim();

    btn.addEventListener('click', () => {
      playerState.avatar = av.id;
      onPlayerChange(playerState);
      render();
    });

    const avatarContainer = document.createElement('div');
    avatarContainer.appendChild(createAvatarIcon(av.id, 36));

    const avatarLabel = document.createElement('span');
    avatarLabel.className = 'text-cream font-poppins text-[10px] sm:text-xs font-semibold leading-tight';
    avatarLabel.textContent = av.label;

    btn.appendChild(avatarContainer);
    btn.appendChild(avatarLabel);
    avatarGrid.appendChild(btn);
  });

  avatarSection.appendChild(avatarLabel);
  avatarSection.appendChild(avatarGrid);

  container.appendChild(nameSection);
  container.appendChild(avatarSection);

  card.appendChild(labelBadge);
  card.appendChild(container);

  return card;
}

export function renderLobbyScreen({ onStart }, container) {
  let p1 = { name: '', avatar: null };
  let p2 = { name: '', avatar: null };
  let selectedGroup = groupsData[0] || 'Group 1';
  let triedStart = false;

  const getCanStart = () => p1.name.trim() && p2.name.trim() && p1.avatar && p2.avatar;

  const onP1Change = (newState) => {
    p1 = newState;
    updateStartButton();
  };

  const onP2Change = (newState) => {
    p2 = newState;
    updateStartButton();
  };

  const handleStart = () => {
    if (!getCanStart()) {
      triedStart = true;
      updateStartButton();
      updateErrorMessage();
      return;
    }
    onStart(
      { name: p1.name.trim(), avatar: p1.avatar, group: selectedGroup },
      { name: p2.name.trim(), avatar: p2.avatar, group: selectedGroup }
    );
  };

  const updateStartButton = () => {
    const btn = container.querySelector('#start-btn');
    const canStart = getCanStart();
    if (btn) {
      btn.disabled = !canStart;
      if (canStart) {
        btn.className = btn.className.replace('opacity-70 ring-2 ring-red-400/50', 'hover:scale-105 hover:shadow-2xl animate-pulse-glow');
      } else if (triedStart) {
        btn.className = btn.className.replace('hover:scale-105 hover:shadow-2xl animate-pulse-glow', 'opacity-70 ring-2 ring-red-400/50');
      }
    }
  };

  const updateErrorMessage = () => {
    const errorDiv = container.querySelector('#error-msg');
    if (errorDiv) {
      if (!getCanStart() && triedStart) {
        errorDiv.style.display = 'block';
      } else {
        errorDiv.style.display = 'none';
      }
    }
  };

  const render = () => {
    container.innerHTML = '';

    const mainDiv = document.createElement('div');
    mainDiv.className = 'min-h-screen flex flex-col items-center justify-center village-bg relative overflow-hidden';

    const topBar = document.createElement('div');
    topBar.className = 'absolute top-0 left-0 right-0 h-2 wood-texture';

    const cloud1 = document.createElement('div');
    cloud1.className = 'absolute top-4 left-[10%] w-20 h-8 bg-white/40 rounded-full blur-sm';

    const cloud2 = document.createElement('div');
    cloud2.className = 'absolute top-8 left-[60%] w-28 h-10 bg-white/30 rounded-full blur-sm';

    const cloud3 = document.createElement('div');
    cloud3.className = 'absolute top-2 right-[20%] w-16 h-6 bg-white/35 rounded-full blur-sm';

    const grassGradient = document.createElement('div');
    grassGradient.className = 'absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#3A5A18] to-transparent';

    // Content section
    const contentDiv = document.createElement('div');
    contentDiv.className =
      'relative z-10 w-full max-w-4xl px-3 sm:px-6 py-6 sm:py-10 flex flex-col items-center gap-5 sm:gap-6';

    // Title
    const titleBox = document.createElement('div');
    titleBox.className =
      'wood-texture wood-grain rounded-xl px-5 sm:px-8 py-4 sm:py-5 border-2 border-dark-brown/40 shadow-xl relative nail-decoration max-w-xl w-full';
    titleBox.innerHTML = `
      <h1 class="text-cream font-poppins font-extrabold text-lg sm:text-2xl md:text-3xl text-center leading-tight">
        Challenge Energi Meuseuraya
      </h1>
      <p class="text-gold font-poppins font-bold text-xs sm:text-sm md:text-base text-center mt-1">
        Challenge your teammate
      </p>
    `;

    // Player cards grid
    const playerGrid = document.createElement('div');
    playerGrid.className = 'grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full max-w-3xl';
    playerGrid.appendChild(createPlayerCard('Player 1', p1, onP1Change));
    playerGrid.appendChild(createPlayerCard('Player 2', p2, onP2Change));

    // Group selector
    const groupBox = document.createElement('div');
    groupBox.className = 'wood-texture wood-grain rounded-xl px-4 sm:px-6 py-3 sm:py-4 border-2 border-dark-brown/30 shadow-lg w-full max-w-md';
    groupBox.innerHTML = `
      <label class="block text-cream font-poppins font-bold text-xs sm:text-sm mb-2 text-center">
        Select Group
      </label>
    `;

    const groupButtonsDiv = document.createElement('div');
    groupButtonsDiv.className = 'flex flex-wrap justify-center gap-2';

    groupsData.forEach((g) => {
      const btn = document.createElement('button');
      btn.className = `
        px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-poppins font-bold text-xs sm:text-sm transition-all duration-200
        ${selectedGroup === g
          ? 'bg-gold text-dark-brown shadow-md scale-105'
          : 'bg-[#5A3420] text-cream/70 hover:bg-[#5A3420]/80 hover:text-cream'
        }
      `
        .replace(/\s+/g, ' ')
        .trim();

      btn.textContent = g;
      btn.addEventListener('click', () => {
        selectedGroup = g;
        render();
      });

      groupButtonsDiv.appendChild(btn);
    });

    groupBox.appendChild(groupButtonsDiv);

    // Start button
    const startBtn = document.createElement('button');
    startBtn.id = 'start-btn';
    const canStart = getCanStart();
    startBtn.className = `
      wood-texture wood-grain rounded-xl px-8 sm:px-12 py-3 sm:py-4 border-2 border-gold/40 shadow-xl
      font-poppins font-extrabold text-cream text-lg sm:text-xl md:text-2xl tracking-wide
      transition-all duration-300 relative nail-decoration
      ${canStart
        ? 'hover:scale-105 hover:shadow-2xl animate-pulse-glow'
        : triedStart
          ? 'opacity-70 ring-2 ring-red-400/50'
          : 'opacity-90'
      }
    `
      .replace(/\s+/g, ' ')
      .trim();

    startBtn.textContent = 'START DUEL';
    startBtn.addEventListener('click', handleStart);

    // Error message
    const errorDiv = document.createElement('p');
    errorDiv.id = 'error-msg';
    errorDiv.className =
      'text-red-300 font-poppins font-semibold text-xs sm:text-sm text-center bg-dark-brown/60 px-4 py-2 rounded-lg';
    errorDiv.textContent = 'Please enter both names and select both avatars';
    errorDiv.style.display = !canStart && triedStart ? 'block' : 'none';

    // Bottom bar
    const bottomBar = document.createElement('div');
    bottomBar.className = 'absolute bottom-0 left-0 right-0 h-2 wood-texture';

    contentDiv.appendChild(titleBox);
    contentDiv.appendChild(playerGrid);
    contentDiv.appendChild(groupBox);
    contentDiv.appendChild(startBtn);
    contentDiv.appendChild(errorDiv);

    mainDiv.appendChild(topBar);
    mainDiv.appendChild(cloud1);
    mainDiv.appendChild(cloud2);
    mainDiv.appendChild(cloud3);
    mainDiv.appendChild(grassGradient);
    mainDiv.appendChild(contentDiv);
    mainDiv.appendChild(bottomBar);

    container.appendChild(mainDiv);
  };

  render();
}
