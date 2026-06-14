import { createAvatarIcon } from './avataricon.js';

const TIMER_SECONDS = 15;

let questions = [];
let TOTAL_QUESTIONS = 0;
let POINTS_PER_CORRECT = 0;

export function setQuestionsData(questionsData, totalQuestions, pointsPerCorrect) {
  questions = questionsData;
  TOTAL_QUESTIONS = totalQuestions;
  POINTS_PER_CORRECT = pointsPerCorrect;
}

function createAnswerCard(label, text, colorClass, selected, isCorrect, disabled, onClickCb) {
  const button = document.createElement('button');
  let extraClass = '';

  if (isCorrect === true && selected) {
    extraClass = 'card-correct';
  } else if (isCorrect === false && selected) {
    extraClass = 'card-wrong';
  } else if (selected) {
    extraClass = 'card-selected';
  }

  button.className = `
    ${colorClass} ${extraClass}
    rounded-lg sm:rounded-xl p-3 sm:p-4 w-full text-center transition-all duration-150
    ${disabled ? 'cursor-default opacity-90' : 'cursor-pointer hover:brightness-110 active:scale-95'}
  `
    .replace(/\s+/g, ' ')
    .trim();

  button.disabled = disabled;
  button.innerHTML = `
    <span class="bg-white/25 rounded w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center font-poppins font-extrabold text-white text-sm sm:text-base mx-auto mb-1.5 sm:mb-2">
      ${label}
    </span>
    <span class="font-poppins font-bold text-white text-sm sm:text-lg">
      ${text}
    </span>
  `;

  button.addEventListener('click', onClickCb);
  return button;
}

function createPlayerSection(player, p1State, onAnswer, disabled, side, showFeedback) {
  const cardColors = ['answer-card-green', 'answer-card-red'];
  const cardLabels = ['A', 'B'];
  const answerTexts = ['BENAR', 'SALAH'];

  const feedbackClass = p1State.isCorrect === true
    ? 'animate-correct-flash'
    : p1State.isCorrect === false
      ? 'animate-wrong-flash'
      : '';

  const borderClass = side === 'left' ? 'border-gold/30' : 'border-forest-green/30';

  const section = document.createElement('div');
  section.className = `wood-texture wood-grain rounded-lg sm:rounded-xl p-2 sm:p-4 border-2 ${borderClass} shadow-lg ${feedbackClass} transition-all`
    .trim();

  const header = document.createElement('div');
  header.className = 'flex items-center gap-2 mb-3 sm:mb-4';
  header.innerHTML = `
    <div class="w-10 h-10 sm:w-12 sm:h-12 bg-[#5A3420] rounded-lg p-1 sm:p-1.5 flex-shrink-0">
    </div>
    <div class="flex-1 min-w-0">
      <p class="text-cream font-poppins font-bold text-sm sm:text-base truncate">${player.name}</p>
      <p class="text-gold/70 font-poppins text-xs sm:text-sm">${player.group}</p>
    </div>
    <div class="bg-dark-brown rounded-lg px-3 sm:px-4 py-1 sm:py-2 text-center flex-shrink-0">
      <p class="text-gold font-poppins font-extrabold text-lg sm:text-xl leading-none">${p1State.score}</p>
      <p class="text-cream/50 font-poppins text-[10px] sm:text-xs">PTS</p>
    </div>
  `;

  const avatarContainer = header.querySelector('.w-10.h-10');
  avatarContainer.appendChild(createAvatarIcon(player.avatar, 40));

  const answerGrid = document.createElement('div');
  answerGrid.className = 'grid grid-cols-2 gap-2 sm:gap-3';

  answerTexts.forEach((text, i) => {
    const card = createAnswerCard(
      cardLabels[i],
      text,
      cardColors[i],
      p1State.selectedAnswer === i,
      showFeedback ? p1State.isCorrect : null,
      disabled || p1State.selectedAnswer !== null,
      () => onAnswer(i)
    );
    answerGrid.appendChild(card);
  });

  section.appendChild(header);
  section.appendChild(answerGrid);

  return section;
}

export function renderDuelScreen(
  { p1Info, p2Info, onFinished },
  container
) {
  let phase = 'countdown';
  let countdown = 3;
  let questionIndex = 0;
  let p1 = { score: 0, selectedAnswer: null, isCorrect: null };
  let p2 = { score: 0, selectedAnswer: null, isCorrect: null };
  let timeLeft = TIMER_SECONDS;

  let timerInterval = null;
  let processingQuestion = false;

  const clearTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  };

  const updateScore = (playerState, isCorrect) => {
    if (isCorrect === null) return playerState;
    const scoreDelta = isCorrect ? POINTS_PER_CORRECT : 0;
    return {
      ...playerState,
      score: playerState.score + scoreDelta,
      isCorrect,
    };
  };

  const processQuestionEnd = () => {
    if (processingQuestion) return;
    processingQuestion = true;

    clearTimer();
    phase = 'feedback';

    const q = questions[questionIndex];
    let p1ScoreDelta = 0;
    let p2ScoreDelta = 0;
    let p1Correct = null;
    let p2Correct = null;

    if (p1.selectedAnswer === q.correctIndex) {
      p1ScoreDelta = POINTS_PER_CORRECT;
      p1Correct = true;
    } else if (p1.selectedAnswer !== null) {
      p1Correct = false;
    }

    if (p2.selectedAnswer === q.correctIndex) {
      p2ScoreDelta = POINTS_PER_CORRECT;
      p2Correct = true;
    } else if (p2.selectedAnswer !== null) {
      p2Correct = false;
    }

    p1 = {
      ...p1,
      score: p1.score + p1ScoreDelta,
      isCorrect: p1Correct,
    };

    p2 = {
      ...p2,
      score: p2.score + p2ScoreDelta,
      isCorrect: p2Correct,
    };

    render();

    setTimeout(() => {
      processingQuestion = false;

      if (questionIndex + 1 >= TOTAL_QUESTIONS) {
        const finalP1 = {
          ...p1Info,
          score: p1.score,
          selectedAnswer: null,
          isCorrect: null,
        };
        const finalP2 = {
          ...p2Info,
          score: p2.score,
          selectedAnswer: null,
          isCorrect: null,
        };
        onFinished(finalP1, finalP2);
      } else {
        questionIndex += 1;
        p1 = { score: p1.score, selectedAnswer: null, isCorrect: null };
        p2 = { score: p2.score, selectedAnswer: null, isCorrect: null };
        timeLeft = TIMER_SECONDS;
        phase = 'playing';
        render();
        startTimer();
      }
    }, 2000);
  };

  const handleAnswer = (playerKey, index) => {
    if (playerKey === 'p1') {
      if (p1.selectedAnswer === null) {
        p1.selectedAnswer = index;
        render();

        if (p1.selectedAnswer !== null && p2.selectedAnswer !== null) {
          setTimeout(() => processQuestionEnd(), 400);
        }
      }
    } else {
      if (p2.selectedAnswer === null) {
        p2.selectedAnswer = index;
        render();

        if (p1.selectedAnswer !== null && p2.selectedAnswer !== null) {
          setTimeout(() => processQuestionEnd(), 400);
        }
      }
    }
  };

  const startCountdown = () => {
    phase = 'countdown';
    countdown = 3;
    render();

    const countdownInterval = setInterval(() => {
      countdown -= 1;
      if (countdown < 0) {
        clearInterval(countdownInterval);
        phase = 'playing';
        timeLeft = TIMER_SECONDS;
        render();
        startTimer();
      } else {
        render();
      }
    }, 1000);
  };

  const startTimer = () => {
    clearTimer();
    timerInterval = setInterval(() => {
      timeLeft -= 1;
      if (timeLeft <= 0) {
        timeLeft = 0;
        clearTimer();
        processQuestionEnd();
      } else {
        render();
      }
    }, 1000);
  };

  const render = () => {
    container.innerHTML = '';

    if (phase === 'countdown') {
      container.innerHTML = `
        <div class="min-h-screen flex items-center justify-center wood-texture">
          <div class="animate-bounce-in">
            <div class="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gold flex items-center justify-center shadow-2xl border-4 border-dark-brown">
              <span class="text-dark-brown font-poppins font-extrabold text-5xl sm:text-6xl">
                ${countdown > 0 ? countdown : 'GO!'}
              </span>
            </div>
          </div>
        </div>
      `;
      return;
    }

    const currentQuestion = questions[questionIndex];
    const timerPercent = (timeLeft / TIMER_SECONDS) * 100;
    const timerColor = timeLeft <= 5 ? 'bg-red-500' : timeLeft <= 10 ? 'bg-gold' : 'bg-forest-green';
    const timerBorderColor = timeLeft <= 5 ? 'border-red-500 animate-timer-pulse' : 'border-gold';
    const timerTextColor = timeLeft <= 5 ? 'text-red-400' : 'text-gold';

    const mainDiv = document.createElement('div');
    mainDiv.className = 'min-h-screen flex flex-col wood-texture';

    const header = document.createElement('div');
    header.className =
      'bg-dark-brown/90 px-2 sm:px-4 py-2 flex items-center justify-between border-b-2 border-gold/20 flex-shrink-0';
    header.innerHTML = `
      <span class="text-cream font-poppins font-bold text-[10px] sm:text-sm">
        Soal ${questionIndex + 1} of ${TOTAL_QUESTIONS}
      </span>
      <div class="w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center border-2 ${timerBorderColor} bg-dark-brown">
        <span class="font-poppins font-extrabold text-sm sm:text-base ${timerTextColor}">
          ${timeLeft}
        </span>
      </div>
      <span class="text-cream/60 font-poppins text-[9px] sm:text-xs">${p1Info.group}</span>
    `;

    const timerBar = document.createElement('div');
    timerBar.className = 'h-1.5 sm:h-2 bg-[#5A3420] flex-shrink-0';
    const timerBarInner = document.createElement('div');
    timerBarInner.className = `h-full ${timerColor} transition-all duration-1000 ease-linear`;
    timerBarInner.style.width = `${timerPercent}%`;
    timerBar.appendChild(timerBarInner);

    const questionBlock = document.createElement('div');
    questionBlock.className =
      'bg-dark-brown/50 px-3 sm:px-5 py-3 sm:py-4 border-b border-gold/10 flex-shrink-0';
    questionBlock.innerHTML = `
      <p class="text-cream font-poppins font-bold text-xs sm:text-sm md:text-base text-center leading-relaxed max-w-2xl mx-auto">
        ${currentQuestion?.question || ''}
      </p>
    `;

    const playersContainer = document.createElement('div');
    playersContainer.className = 'flex-1 flex flex-col sm:flex-row gap-2 sm:gap-4 p-2 sm:p-4 overflow-auto';

    const p1Section = document.createElement('div');
    p1Section.className = 'flex-1 min-h-0';
    p1Section.appendChild(
      createPlayerSection(
        p1Info,
        p1,
        (i) => handleAnswer('p1', i),
        phase !== 'playing',
        'left',
        phase === 'feedback'
      )
    );

    const vsDesktop = document.createElement('div');
    vsDesktop.className = 'hidden sm:flex items-center justify-center px-2';
    vsDesktop.innerHTML = `
      <div class="w-14 h-14 rounded-full bg-dark-brown border-2 border-gold flex items-center justify-center shadow-lg flex-shrink-0">
        <span class="text-gold font-poppins font-extrabold text-base">VS</span>
      </div>
    `;

    const vsMobile = document.createElement('div');
    vsMobile.className = 'sm:hidden flex items-center justify-center py-1';
    vsMobile.innerHTML = `
      <div class="h-8 w-8 rounded-full bg-dark-brown border-2 border-gold flex items-center justify-center shadow flex-shrink-0">
        <span class="text-gold font-poppins font-extrabold text-xs">VS</span>
      </div>
    `;

    const p2Section = document.createElement('div');
    p2Section.className = 'flex-1 min-h-0';
    p2Section.appendChild(
      createPlayerSection(
        p2Info,
        p2,
        (i) => handleAnswer('p2', i),
        phase !== 'playing',
        'right',
        phase === 'feedback'
      )
    );

    playersContainer.appendChild(p1Section);
    playersContainer.appendChild(vsDesktop);
    playersContainer.appendChild(vsMobile);
    playersContainer.appendChild(p2Section);

    mainDiv.appendChild(header);
    mainDiv.appendChild(timerBar);
    mainDiv.appendChild(questionBlock);
    mainDiv.appendChild(playersContainer);

    container.appendChild(mainDiv);
  };

  startCountdown();
}
