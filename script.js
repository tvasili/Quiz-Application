document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const nextBtn = document.getElementById("next-btn");
  const restartBtn = document.getElementById("restart-btn");
  const questionContainer = document.getElementById("question-container");
  const questionText = document.getElementById("question-text");
  const choicesList = document.getElementById("choices-list");
  const resultContainer = document.getElementById("result-container");
  const scoreDisplay = document.getElementById("score");

  const questions = [
    {
      question: "What describes thinking critically?",
      choices: ["Thinking emotionally", "Thinking logically", "Think actively and be aware of potential problems in the information you encounter.", "None of the above"],
      answer: "Think actively and be aware of potential problems in the information you encounter."
    },
    {
      question: "Which division of the nervous system calms the body down after an emotional crisis passes?",
      choices: ["Sympathetic nervous system", "Parasympathetic nervous system", "Somatic nervous system", "Central nervous system"],
      answer: "Parasympathetic nervous system"
    },
    {
      question: "According to research on happiness, what is the adaptation-level phenomenon ?",
      choices: [
        "The ability to ignore negative emotions completely",
        "The tendency to judge new stimuli relative to our past experiences",
        "The biological limit of how happy a person can ever get",
        "The process of learning to love a stressful job",
      ],
      answer: "The tendency to judge new stimuli relative to our past experiences"
    }
  ];

  let currentQuestionIndex = 0;
  let score = 0;
  startBtn.addEventListener("click", startQuiz);
  nextBtn.addEventListener("click", () => {
    if (currentQuestionIndex === questions.length - 1) {
      showResult();
    } else {
      currentQuestionIndex++;
      showQuestion();
    }
  });
  restartBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add("hidden");
    startQuiz();
  });
  function startQuiz() {
    startBtn.classList.add("hidden");
    resultContainer.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    showQuestion();
  }
  function showQuestion() {
    nextBtn.classList.add("hidden");
    questionText.textContent = questions[currentQuestionIndex].question;
    choicesList.innerHTML = "";
    if (currentQuestionIndex === questions.length - 1) {
      nextBtn.textContent = "See Results";
    } else {
      nextBtn.textContent = "Next Question";
    }
    questions[currentQuestionIndex].choices.forEach((choice) => {
      const li = document.createElement("li");
      li.textContent = choice;
      li.addEventListener("click", () => selectAnswer(choice, li));
      choicesList.appendChild(li);
    });
  }
  function selectAnswer(choice, selectedLi) {
    const correctAnswer = questions[currentQuestionIndex].answer.trim();
    const currentChoice = choice.trim();
    if (currentChoice === correctAnswer) {
      score++;
      selectedLi.classList.add("correct");
    } else {
      selectedLi.classList.add("wrong");
      Array.from(choicesList.children).forEach((li) => {
        if (li.textContent.trim() === correctAnswer) {
          li.classList.add("correct");
        }
      });
    }
    Array.from(choicesList.children).forEach((li) => {
      li.style.pointerEvents = "none";
    });
    nextBtn.classList.remove("hidden");
  }
  function showResult() {
    questionContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    scoreDisplay.textContent = `${score} out of ${questions.length}`;
    if (score === questions.length) {
      triggerBalloons();
    } else {
      triggerCryingEmojis();
    }
  }
  function triggerBalloons() {
    const container = document.createElement("div");
    container.className = "animation-container";
    document.body.appendChild(container);
    const colors = ["#ff4050", "#44ff98", "#98e5ff", "#ffeb3b", "#e040fb"];
    for (let i = 0; i < 35; i++) {
      setTimeout(() => {
        const balloon = document.createElement("div");
        balloon.className = "balloon";
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        balloon.style.backgroundColor = randomColor;
        balloon.style.color = randomColor;
        balloon.style.left = `${Math.random() * 100}vw`;
        balloon.style.setProperty("--drift", `${(Math.random() - 0.5) * 250}px`);
        balloon.style.setProperty("--rotation", `${(Math.random() - 0.5) * 60}deg`);
        balloon.style.animationDelay = `${Math.random() * 1.5}s`;
        container.appendChild(balloon);
      }, i * 80);
    }
    setTimeout(() => container.remove(), 6500);
  }
  function triggerCryingEmojis() {
    const container = document.createElement("div");
    container.className = "animation-container";
    document.body.appendChild(container);
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        const emoji = document.createElement("div");
        emoji.className = "crying-emoji";
        emoji.textContent = "😭";
        emoji.style.left = `${Math.random() * 100}vw`;
        emoji.style.setProperty("--drift", `${(Math.random() - 0.5) * 180}px`);
        emoji.style.setProperty("--rotation", `${(Math.random() - 0.5) * 120}deg`);
        emoji.style.animationDelay = `${Math.random() * 1.2}s`;
        container.appendChild(emoji);
      }, i * 100);
    }
    setTimeout(() => container.remove(), 6000);
  }
});