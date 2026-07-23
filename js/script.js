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
const goToQuizBtn = document.getElementById("goToQuizBtn");
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
    type: "text",
    question: "What do You Like Most about Me? 🤔",
    placeholder: "Type what you like most about me Didi..."
  },
  {
    type: "text",
    question: "What's so special about me?",
    placeholder: "Type what you think is special about me..."
  },
  {
    type: "text",
    question: "What is a Secret that You Want to Tell Me?.. But You Never Did! 🤝",
    placeholder: "Type what you want to tell me..."
  },
  {
    type: "text",
    question: "Is there any special message for me? if you could give advice, what would be?",
    placeholder: "Type your message here Didi..."
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
let unlockedPhotosCount = 0;
let letterScrollInterval = null;

/* ==========================
   SMOOTH SCROLL HELPER
========================== */

function smoothScrollToSection(targetId) {
  const targetElement = document.getElementById(targetId);
  if (!targetElement) return;

  targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
   HERO TYPEWRITER
========================== */

function startHeroTypewriter() {
  const typedHeroTarget = document.getElementById('typedHero');
  if (!typedHeroTarget) return;

  typedHeroTarget.innerHTML = '';
  if (typedHeroInstance) typedHeroInstance.destroy();

  const heroText = `So, Raksha Bandhan is finally here!^600<br><br>Here is a small gift, made with love, just for you...^800<br><br>Do you know why our bond is the best?<br>Because we share the same soul. ❤️`;

  try {
    typedHeroInstance = new Typed("#typedHero", {
      strings: [heroText],
      typeSpeed: 35,
      showCursor: true,
      cursorChar: "✨"
    });
  } catch (e) {
    typedHeroTarget.innerHTML = `So, Raksha Bandhan is finally here!<br><br>Here is a small gift, made with love, just for you...<br><br>Do you know why our bond is the best?<br>Because we share the same soul. ❤️`;
  }
}

/* ==========================
   SCRAPBOOK CLICK-TO-UNLOCK PHOTOS
========================== */

function setupClickToUnlockPhotos() {
  const polaroidElements = document.querySelectorAll('.polaroid');

  polaroidElements.forEach((polaroid, index) => {
    polaroid.addEventListener('click', () => {
      if (!polaroid.classList.contains('locked')) return; // Already unlocked

      // Remove locked state & add unblurring transition
      polaroid.classList.remove('locked');
      polaroid.classList.add('unblurring');

      const lockOverlay = document.getElementById(`lock-${index}`);
      if (lockOverlay) {
        lockOverlay.classList.add('unlocked');
      }

      setTimeout(() => {
        polaroid.classList.remove('unblurring');
        polaroid.classList.add('unlocked');
      }, 800);

      // Start live typewriter caption for this photo
      const captionEl = document.getElementById(`caption-${index}`);
      if (captionEl && photoCaptions[index]) {
        captionEl.innerHTML = '';
        new Typed(`#caption-${index}`, {
          strings: [photoCaptions[index]],
          typeSpeed: 45,
          showCursor: false
        });
      }

      // Confetti burst for unlocking photo
      if (typeof confetti !== 'undefined') {
        confetti({ particleCount: 35, spread: 60, origin: { y: 0.6 } });
      }

      unlockedPhotosCount++;

      // When all 4 photos are unlocked, reveal Go to Quiz button!
      if (unlockedPhotosCount >= 4) {
        setTimeout(() => {
          const goToQuiz = document.getElementById('goToQuizBtn');
          if (goToQuiz) {
            goToQuiz.style.display = 'inline-flex';
            if (typeof gsap !== 'undefined') {
              gsap.fromTo(goToQuiz, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 });
            }
          }
          if (typeof confetti !== 'undefined') {
            confetti({ particleCount: 120, spread: 100, origin: { y: 0.7 } });
          }
        }, 800);
      }
    });
  });
}

setupClickToUnlockPhotos();

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
   BUTTON CONTROLS & NAVIGATION
========================== */

if (startBtn) {
  startBtn.addEventListener('click', () => {
    playMusic();
    smoothScrollToSection("scrapbook");
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

if (goToQuizBtn) {
  goToQuizBtn.addEventListener('click', () => {
    smoothScrollToSection("quizSection");
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
        <textarea id="typedAnswerInput-${index}" class="quiz-textarea" placeholder="${q.placeholder || 'Type your message here Didi...'}"></textarea>
        <br>
        <button class="quiz-submit-btn submit-text-btn" data-question="${index}">
          Submit Answer 💌 <i class="fa-solid fa-paper-plane"></i>
        </button>
      `;
    }

    container.appendChild(card);
  });

  document.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', handleQuizAnswer);
  });

  document.querySelectorAll('.submit-text-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const questionIdx = parseInt(e.currentTarget.dataset.question);
      const inputEl = document.getElementById(`typedAnswerInput-${questionIdx}`);
      const userText = inputEl ? inputEl.value.trim() : '';

      if (userText.length > 0) {
        sendTelegramMessage(`Question ${questionIdx + 1} (${quizData[questionIdx].question}): ${userText}`);
      }

      if (typeof confetti !== 'undefined') {
        confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
      }

      const card = document.getElementById('quizCard-' + questionIdx);
      currentQuestion++;

      if (currentQuestion < quizData.length) {
        card.style.display = 'none';
        const nextCard = document.getElementById('quizCard-' + currentQuestion);
        nextCard.style.display = 'block';
        if (typeof gsap !== 'undefined') {
          gsap.fromTo(nextCard, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 });
        }
      } else {
        if (resultModal) {
          resultModal.classList.add('active');
        }
      }
    });
  });
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
   MODAL ACTIONS
========================== */

if (goToPuzzleBtn) {
  goToPuzzleBtn.addEventListener('click', () => {
    if (resultModal) {
      resultModal.classList.remove('active');
    }
    smoothScrollToSection("puzzleSection");
    initPuzzleBoard();
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

    smoothScrollToSection("letterSection");
    setTimeout(() => {
      startTypedLetter();
    }, 600);
  });
}

/* ==========================
   TYPED LETTER WITH AUTO-FOLLOW SCROLL
========================== */

function startTypedLetter() {
  const typedTarget = document.getElementById('typedLetter');
  if (!typedTarget) return;

  typedTarget.innerHTML = '';
  if (typedLetterInstance) typedLetterInstance.destroy();
  if (letterScrollInterval) clearInterval(letterScrollInterval);

  // Smooth auto-follow scroll ONLY while the letter is typing out
  letterScrollInterval = setInterval(() => {
    const rect = typedTarget.getBoundingClientRect();
    if (rect.bottom > window.innerHeight - 120) {
      const targetY = rect.bottom + window.pageYOffset - window.innerHeight + 160;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  }, 400);

  const letterText = `Dear Nisha Didi ❤️,

First of all, Happy Raksha Bandhan! 🌸

I honestly don't know how to put all my feelings into words...

We don't share the same blood, but you know what?
That never mattered. Not even for a single second.

You became my Didi not by birth, but by love.
And honestly? That's a bond even stronger than blood.

Sometimes I misunderstand you, and I am truly sorry for that.
But you were always there for me.
Every time I needed someone, you were there.
Every time I felt lost, you showed me the way.
You are not just a sister — you are my strength,
my protector, who always guided and supported me.

Our bond of 5 beautiful years means everything to me,
This might be our last Raksha Bandhan together like this...
and that thought alone always makes my heart heavy whenever
i think about it.
I grew from a child into an adult under your love & support.

I am Obssed with You
But the way you ignore... that Hurt ☹️ Deeply
I also try to ignore... but don't know why i fail.
I just start hating Me...

May Be I am Excepted too Much
So Sorry... 🙁

You'll always be my Didi. Always. ❤️

Thank you for being in my life.
Thank you for being YOU.
You know <3000! 💖

Happy Raksha Bandhan ❤️

— Your Brother,
   Naveen`;

  try {
    typedLetterInstance = new Typed("#typedLetter", {
      strings: [letterText],
      typeSpeed: 28,
      contentType: 'null',
      showCursor: true,
      cursorChar: "❤️",
      onComplete: () => {
        if (letterScrollInterval) {
          clearInterval(letterScrollInterval);
          letterScrollInterval = null;
        }

        const footer = document.getElementById('letterFooter');
        if (footer) {
          footer.style.display = 'block';
          if (typeof gsap !== 'undefined') {
            gsap.from(footer, { opacity: 0, y: 20, duration: 0.6 });
          }
        }
      }
    });
  } catch (e) {
    if (letterScrollInterval) {
      clearInterval(letterScrollInterval);
      letterScrollInterval = null;
    }
    typedTarget.textContent = letterText;
    const footer = document.getElementById('letterFooter');
    if (footer) footer.style.display = 'block';
  }
}

/* ==========================
   CONTINUE BUTTON & ENDING
========================== */

if (continueBtn) {
  continueBtn.addEventListener('click', () => {
    smoothScrollToSection("certificateSection");
    if (typeof confetti !== 'undefined') {
      confetti({ particleCount: 150, spread: 120, origin: { y: 0.5 } });
    }
  });
}

/* ==========================
   RESTART BUTTON (Watch Again)
========================== */

if (restartBtn) {
  restartBtn.addEventListener('click', () => {
    quizScore = 0;
    currentQuestion = 0;
    unlockedPhotosCount = 0;

    if (letterScrollInterval) {
      clearInterval(letterScrollInterval);
      letterScrollInterval = null;
    }

    // Lock polaroids & clear captions
    document.querySelectorAll('.polaroid').forEach((p, idx) => {
      p.className = 'polaroid locked';
      const cap = document.getElementById(`caption-${idx}`);
      if (cap) cap.innerHTML = '';
      const lockOverlay = document.getElementById(`lock-${idx}`);
      if (lockOverlay) lockOverlay.classList.remove('unlocked');
    });

    const goToQuiz = document.getElementById('goToQuizBtn');
    if (goToQuiz) goToQuiz.style.display = 'none';

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

    smoothScrollToSection("hero");
    setTimeout(() => {
      startHeroTypewriter();
    }, 600);
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
