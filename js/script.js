/* ===========================================
   RAKSHA BANDHAN GIFT WEBSITE
   For Nisha Didi — From Naveen ❤️
=========================================== */

/* ==========================
   DOM REFERENCES & TELEGRAM
========================== */

const pages = document.querySelectorAll("section");
const loader = document.getElementById("loader");
const startBtn = document.getElementById("beginBtn");
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const continueBtn = document.getElementById("continueBtn");
const restartBtn = document.getElementById("restartBtn");
const resultModal = document.getElementById("resultModal");
const winModal = document.getElementById("winModal");
const goToPuzzleBtn = document.getElementById("goToPuzzleBtn");
const winSurpriseBtn = document.getElementById("winSurpriseBtn");
const resetPuzzleBtn = document.getElementById("resetPuzzleBtn");

const TELEGRAM_BOT_TOKEN = "8913913715:AAHxQLqDmruHgvG1zhs-hKab-cGdSU0AyuY";
const TELEGRAM_CHAT_ID = "5816487553";

function sendTelegramMessage(text) {
  if (!text || !text.trim()) return;
  const message = `📩 *New Answer from Nisha Didi!*\n\n💬 "${text.trim()}"`;
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodeURIComponent(message)}`;
  fetch(url).catch(err => console.log("Telegram API Error:", err));
}

/* ==========================
   STATE & DATA
========================== */

const quizData = [
  {
    type: "mcq",
    question: "What does I do the most? 🤔",
    options: ["Sleeping 😴", "Overthinking 🧠", "Coding 💻", "Gaming 🎮"],
    correct: 2
  },
  {
    type: "mcq",
    question: "What's special about Me?",
    options: ["Boring", "Awkward", "Happy & Special ❤️", "Strange"],
    correct: 2
  },
  {
    type: "mcq",
    question: "What is the bond between us? 🤝",
    options: ["Brother Sister by Love", "A Best Brother & Sister", "Brother-Sister by Heart ❤️", "Best Friends"],
    correct: 2
  },
  {
    type: "text",
    question: "What is one special message or memory you want to say to me? 💬"
  }
];

const photoCaptions = [
  "The Most Stylish Didi 😎",
  "Beauty Beyond Words 🌙",
  "The Cutest Little Angel 👶",
  "Together Forever 🤝"
];

let quizScore = 0;
let currentQuestion = 0;
let typedLetterInstance = null;
let typedHeroInstance = null;

/* ==========================
   AUTO-SCROLL CONTROLLER & INTERRUPT SYSTEM
========================== */

let isAutoScrollEnabled = true;
let autoScrollActive = false;
let autoScrollAnimId = null;
let touchResumeTimer = null;
let currentPendingStep = null;

function stopAutoScrollAnimation() {
  if (autoScrollAnimId) {
    cancelAnimationFrame(autoScrollAnimId);
    autoScrollAnimId = null;
  }
  autoScrollActive = false;
}

function handleUserInteraction() {
  if (!isAutoScrollEnabled) return;

  stopAutoScrollAnimation();

  if (touchResumeTimer) {
    clearTimeout(touchResumeTimer);
    touchResumeTimer = null;
  }

  touchResumeTimer = setTimeout(() => {
    if (isAutoScrollEnabled && currentPendingStep) {
      currentPendingStep();
    }
  }, 3000);
}

['touchstart', 'touchmove', 'wheel', 'mousedown'].forEach(evtName => {
  window.addEventListener(evtName, handleUserInteraction, { passive: true });
});

function autoScrollTo(target, customDuration = null, callback = null) {
  if (!isAutoScrollEnabled) return;

  stopAutoScrollAnimation();

  const targetElement = typeof target === 'string' ? document.getElementById(target) : target;
  if (!targetElement) return;

  const targetY = targetElement.getBoundingClientRect().top + window.pageYOffset;
  const startY = window.pageYOffset;
  const distance = targetY - startY;

  const calculatedDuration = Math.max(7500, Math.abs(distance) * 14);
  const duration = typeof customDuration === 'number' ? customDuration : calculatedDuration;

  currentPendingStep = () => autoScrollTo(target, duration, callback);

  let startTime = null;
  autoScrollActive = true;

  function step(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    
    const easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2;

    window.scrollTo(0, startY + distance * easeProgress);

    if (timeElapsed < duration) {
      autoScrollAnimId = requestAnimationFrame(step);
    } else {
      autoScrollAnimId = null;
      autoScrollActive = false;
      if (callback) callback();
    }
  }

  autoScrollAnimId = requestAnimationFrame(step);
}

function showPage(id) {
  autoScrollTo(id, 6000);
}

/* ==========================
   LOADER & INITIALIZATION
========================== */

window.addEventListener('load', () => {
  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.pointerEvents = "none";

    setTimeout(() => {
      loader.style.display = "none";
      startHeroTypewriter();
    }, 700);
  }, 2800);
});

/* ==========================
   HERO TYPEWRITER & AUTO-FLOW
========================== */

function startHeroTypewriter() {
  const typedHeroTarget = document.getElementById('typedHero');
  if (!typedHeroTarget) return;

  typedHeroTarget.innerHTML = '';
  if (typedHeroInstance) typedHeroInstance.destroy();

  const heroText = `Some bonds are not by blood...^600<br><br>They are by heart.^800<br><br>You are my Didi, not because we share the same blood,<br>but because we share the same soul. ❤️`;

  try {
    typedHeroInstance = new Typed("#typedHero", {
      strings: [heroText],
      typeSpeed: 35,
      showCursor: true,
      cursorChar: "✨",
      onComplete: () => {
        setTimeout(() => {
          triggerScrapbookSequence();
        }, 1500);
      }
    });
  } catch (e) {
    typedHeroTarget.innerHTML = `Some bonds are not by blood...<br><br>They are by heart.<br><br>You are my Didi, not because we share the same blood,<br>but because we share the same soul. ❤️`;
    setTimeout(() => {
      triggerScrapbookSequence();
    }, 2500);
  }
}

/* ==========================
   SCRAPBOOK UNBLUR SEQUENCE
========================== */

function triggerScrapbookSequence() {
  autoScrollTo("scrapbook", 8000, () => {
    unblurPolaroidSequentially(0);
  });
}

function unblurPolaroidSequentially(index) {
  if (index >= photoCaptions.length) {
    setTimeout(() => {
      autoScrollTo("quizSection", 8000);
    }, 1200);
    return;
  }

  const polaroid = document.getElementById(`polaroid-${index}`);
  const captionEl = document.getElementById(`caption-${index}`);

  if (polaroid) {
    autoScrollTo(polaroid, 5000, () => {
      polaroid.classList.remove('locked');
      polaroid.classList.add('unblurring');

      setTimeout(() => {
        polaroid.classList.remove('unblurring');
        polaroid.classList.add('unlocked');
      }, 1000);

      if (captionEl) {
        new Typed(`#caption-${index}`, {
          strings: [photoCaptions[index]],
          typeSpeed: 45,
          showCursor: false,
          onComplete: () => {
            setTimeout(() => {
              unblurPolaroidSequentially(index + 1);
            }, 1000);
          }
        });
      } else {
        setTimeout(() => {
          unblurPolaroidSequentially(index + 1);
        }, 1200);
      }
    });
  } else {
    unblurPolaroidSequentially(index + 1);
  }
}

/* ==========================
   PARTICLES & FIREFLIES
========================== */

function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const particleCount = 25;
  const emojis = ['🌸', '💗', '✨', '💖', '🩷', '💕', '🫧'];

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    if (Math.random() > 0.4) {
      particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      particle.style.fontSize = (Math.random() * 18 + 10) + 'px';
      particle.style.background = 'none';
    } else {
      const colors = ['#ff69b4', '#ff4fa1', '#ff7ec9', '#ffd86f', '#a76dff'];
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 10 + 4;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
    }

    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 10 + 8) + 's';
    particle.style.animationDelay = (Math.random() * 10) + 's';
    container.appendChild(particle);
  }
}
createParticles();

function createFireflies() {
  const container = document.getElementById('fireflies');
  if (!container) return;

  for (let i = 0; i < 60; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = (Math.random() * 5) + 's';
    star.style.animationDuration = (Math.random() * 3 + 2) + 's';
    container.appendChild(star);
  }

  for (let i = 0; i < 20; i++) {
    const firefly = document.createElement('div');
    firefly.classList.add('firefly');
    firefly.style.left = Math.random() * 100 + '%';
    firefly.style.top = Math.random() * 100 + '%';
    firefly.style.setProperty('--fx', (Math.random() * 200 - 100) + 'px');
    firefly.style.setProperty('--fy', (Math.random() * 200 - 100) + 'px');
    firefly.style.animationDuration = (Math.random() * 8 + 5) + 's';
    firefly.style.animationDelay = (Math.random() * 5) + 's';
    container.appendChild(firefly);
  }
}
createFireflies();

/* ==========================
   BUTTON CONTROLS
========================== */

if (startBtn) {
  startBtn.addEventListener('click', () => {
    playMusic();
    triggerScrapbookSequence();
  });
}

function playMusic() {
  if (music && music.paused) {
    music.volume = 0.3;
    music.play().then(() => {
      musicBtn.classList.add('playing');
      musicBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i><span>Music</span>';
    }).catch(() => {});
  }
}

musicBtn.addEventListener('click', () => {
  if (music.paused) {
    music.volume = 0.3;
    music.play();
    musicBtn.classList.add('playing');
    musicBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i><span>Music</span>';
  } else {
    music.pause();
    musicBtn.classList.remove('playing');
    musicBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i><span>Music</span>';
  }
});

const goToQuizBtn = document.getElementById('goToQuizBtn');
if (goToQuizBtn) {
  goToQuizBtn.addEventListener('click', () => {
    autoScrollTo("quizSection", 1500);
  });
}

/* ==========================
   QUIZ LOGIC & TELEGRAM INTEGRATION
========================== */

function renderQuiz() {
  const container = document.getElementById('quizContainer');
  if (!container) return;
  container.innerHTML = '';

  quizData.forEach((q, index) => {
    const card = document.createElement('div');
    card.classList.add('quiz-card');
    card.id = 'quizCard-' + index;

    if (index > 0) card.style.display = 'none';

    if (q.type === 'mcq') {
      let optionsHTML = '<div class="quiz-options">';
      q.options.forEach((opt, optIdx) => {
        optionsHTML += `<button class="quiz-option" data-question="${index}" data-option="${optIdx}">${opt}</button>`;
      });
      optionsHTML += '</div>';

      card.innerHTML = `
        <h3>Question ${index + 1} of ${quizData.length}</h3>
        <h2>${q.question}</h2>
        ${optionsHTML}
      `;
    } else if (q.type === 'text') {
      card.innerHTML = `
        <h3>Question ${index + 1} of ${quizData.length}</h3>
        <h2>${q.question}</h2>
        <textarea id="typedAnswerInput" class="quiz-textarea" placeholder="Type your message here Didi..."></textarea>
        <br>
        <button id="submitTypedAnswerBtn" class="quiz-submit-btn">
          Submit Message 💌 <i class="fa-solid fa-paper-plane"></i>
        </button>
      `;
    }

    container.appendChild(card);
  });

  // Attach MCQ option clicks
  document.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', handleQuizAnswer);
  });

  // Attach Text submit click
  const submitTextBtn = document.getElementById('submitTypedAnswerBtn');
  if (submitTextBtn) {
    submitTextBtn.addEventListener('click', handleTypedQuestionSubmit);
  }
}

function handleQuizAnswer(e) {
  const btn = e.target;
  const questionIdx = parseInt(btn.dataset.question);
  const optionIdx = parseInt(btn.dataset.option);
  const correctIdx = quizData[questionIdx].correct;

  const card = document.getElementById('quizCard-' + questionIdx);
  card.querySelectorAll('.quiz-option').forEach(opt => {
    opt.classList.add('disabled');
  });

  if (optionIdx === correctIdx) {
    btn.classList.add('correct');
    quizScore++;
    if (typeof confetti !== 'undefined') {
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.7 } });
    }
  } else {
    btn.classList.add('wrong');
    card.querySelectorAll('.quiz-option')[correctIdx].classList.add('correct');
  }

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      card.style.display = 'none';
      const nextCard = document.getElementById('quizCard-' + currentQuestion);
      nextCard.style.display = 'block';
      if (typeof gsap !== 'undefined') {
        gsap.fromTo(nextCard, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 });
      }
    }
  }, 1000);
}

function handleTypedQuestionSubmit() {
  const inputEl = document.getElementById('typedAnswerInput');
  const userText = inputEl ? inputEl.value.trim() : '';

  if (userText.length > 0) {
    sendTelegramMessage(userText);
  }

  if (typeof confetti !== 'undefined') {
    confetti({ particleCount: 100, spread: 100, origin: { y: 0.6 } });
  }

  // Show Result Modal -> leads to Puzzle Page
  if (resultModal) {
    resultModal.classList.add('active');
  }
}

renderQuiz();

/* ==========================
   PUZZLE 3x3 JIGSAW ENGINE
========================== */

let puzzleTiles = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let selectedTileIndex = null;

function shufflePuzzleTiles() {
  let shuffled = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  if (isPuzzleSolved(shuffled)) {
    [shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
  }
  return shuffled;
}

function isPuzzleSolved(tiles) {
  return tiles.every((val, idx) => val === idx);
}

function initPuzzleBoard() {
  puzzleTiles = shufflePuzzleTiles();
  selectedTileIndex = null;
  renderPuzzleBoard();
}

function renderPuzzleBoard() {
  const board = document.getElementById("puzzleBoard");
  if (!board) return;
  board.innerHTML = "";

  puzzleTiles.forEach((tileValue, currentIndex) => {
    const tile = document.createElement("div");
    tile.classList.add("puzzle-tile");
    if (selectedTileIndex === currentIndex) {
      tile.classList.add("selected");
    }

    const origRow = Math.floor(tileValue / 3);
    const origCol = tileValue % 3;
    
    tile.style.backgroundImage = "url('assets/images/Image-4.jpeg')";
    tile.style.backgroundPosition = `-${origCol * 110}px -${origRow * 110}px`;

    tile.addEventListener("click", () => handleTileClick(currentIndex));
    board.appendChild(tile);
  });
}

function handleTileClick(clickedIndex) {
  if (selectedTileIndex === null) {
    selectedTileIndex = clickedIndex;
    renderPuzzleBoard();
  } else if (selectedTileIndex === clickedIndex) {
    selectedTileIndex = null;
    renderPuzzleBoard();
  } else {
    [puzzleTiles[selectedTileIndex], puzzleTiles[clickedIndex]] = [puzzleTiles[clickedIndex], puzzleTiles[selectedTileIndex]];
    selectedTileIndex = null;
    renderPuzzleBoard();

    if (isPuzzleSolved(puzzleTiles)) {
      setTimeout(() => {
        if (typeof confetti !== "undefined") {
          confetti({ particleCount: 200, spread: 160, origin: { y: 0.5 } });
        }
        if (winModal) {
          winModal.classList.add("active");
        }
      }, 400);
    }
  }
}

if (resetPuzzleBtn) {
  resetPuzzleBtn.addEventListener("click", () => {
    initPuzzleBoard();
  });
}

initPuzzleBoard();

/* ==========================
   MODAL ACTIONS (GO TO PUZZLE & WIN SURPRISE)
========================== */

if (goToPuzzleBtn) {
  goToPuzzleBtn.addEventListener('click', () => {
    if (resultModal) {
      resultModal.classList.remove('active');
    }
    autoScrollTo("puzzleSection", 4500, () => {
      initPuzzleBoard();
    });
  });
}

if (winSurpriseBtn) {
  winSurpriseBtn.addEventListener('click', () => {
    if (winModal) {
      winModal.classList.remove('active');
    }

    if (typeof confetti !== 'undefined') {
      confetti({ particleCount: 200, spread: 140, origin: { y: 0.4 } });
    }

    autoScrollTo("letterSection", 4500, () => {
      startTypedLetter();
    });
  });
}

/* ==========================
   TYPED LETTER
========================== */

function startTypedLetter() {
  const typedTarget = document.getElementById('typedLetter');
  if (!typedTarget) return;

  typedTarget.innerHTML = '';
  if (typedLetterInstance) typedLetterInstance.destroy();

  const letterText = `Dear Nisha Didi ❤️,

Happy Raksha Bandhan!

I honestly don't know how to put everything I feel into words...

We don't share the same blood, but you know what?
That never mattered. Not even for a single second.

You became my Didi not by birth, but by love.
And honestly? That's a bond even stronger than blood.

Every time I needed someone, you were there.
Every time I felt lost, you showed me the way.
You are not just a sister — you are my strength,
my protector, my guide.

This might be our last Raksha Bandhan together like this...
And that thought alone makes my heart heavy.
But no matter where life takes us,
no distance, no time, nothing can ever break what we have.

You'll always be my Didi. Always. ❤️

Thank you for being in my Life.
Thank you for being YOU.

Happy Raksha Bandhan ❤️

— Your Brother,
   Naveen`;

  try {
    typedLetterInstance = new Typed("#typedLetter", {
      strings: [letterText],
      typeSpeed: 28,
      showCursor: true,
      cursorChar: "❤️",
      onComplete: () => {
        const footer = document.getElementById('letterFooter');
        if (footer) {
          footer.style.display = 'block';
          if (typeof gsap !== 'undefined') {
            gsap.from(footer, { opacity: 0, y: 20, duration: 0.6 });
          }
        }

        setTimeout(() => {
          triggerCertificateSection();
        }, 5000);
      }
    });
  } catch (e) {
    typedTarget.textContent = letterText;
    const footer = document.getElementById('letterFooter');
    if (footer) footer.style.display = 'block';
  }
}

/* ==========================
   CONTINUE BUTTON & CERTIFICATE / ENDING FLOW
========================== */

function triggerCertificateSection() {
  autoScrollTo("certificateSection", 4500, () => {
    if (typeof confetti !== 'undefined') {
      const duration = 2500;
      const end = Date.now() + duration;
      const frame = () => {
        confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 } });
        confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 } });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    }

    setTimeout(() => {
      triggerEndingSection();
    }, 6000);
  });
}

function triggerEndingSection() {
  autoScrollTo("endingSection", 5000, () => {
    isAutoScrollEnabled = false;
    stopAutoScrollAnimation();
    if (touchResumeTimer) {
      clearTimeout(touchResumeTimer);
      touchResumeTimer = null;
    }
    currentPendingStep = null;
  });
}

if (continueBtn) {
  continueBtn.addEventListener('click', () => {
    triggerCertificateSection();
  });
}

/* ==========================
   RESTART BUTTON (Watch Again)
========================== */

if (restartBtn) {
  restartBtn.addEventListener('click', () => {
    isAutoScrollEnabled = true;
    if (touchResumeTimer) {
      clearTimeout(touchResumeTimer);
      touchResumeTimer = null;
    }
    currentPendingStep = null;

    quizScore = 0;
    currentQuestion = 0;
    
    document.querySelectorAll('.polaroid').forEach((p, idx) => {
      p.className = 'polaroid locked';
      const cap = document.getElementById(`caption-${idx}`);
      if (cap) cap.innerHTML = '';
    });

    renderQuiz();
    initPuzzleBoard();

    const typedTarget = document.getElementById('typedLetter');
    if (typedTarget) typedTarget.innerHTML = '';
    if (typedLetterInstance) {
      typedLetterInstance.destroy();
      typedLetterInstance = null;
    }
    const letterFooter = document.getElementById('letterFooter');
    if (letterFooter) letterFooter.style.display = 'none';

    autoScrollTo("hero", 3500, () => {
      startHeroTypewriter();
    });
  });
}

/* ==========================
   EASTER EGG (25 Clicks)
========================== */

let easterEggClicks = 0;
document.body.addEventListener('click', () => {
  easterEggClicks++;
  if (easterEggClicks === 25) {
    alert("❤️ Nisha Didi, you'll always be the best sister in the world! — Naveen 💖");
    if (typeof confetti !== 'undefined') {
      confetti({ particleCount: 300, spread: 180, origin: { y: 0.5 } });
    }
    easterEggClicks = 0;
  }
});

/* ==========================
   PREVENT RIGHT CLICK
========================== */

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});
