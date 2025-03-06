// Sound ein- und ausschalten
function toggleSound() {
  const audio = document.getElementById("audio");
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

// Quiz-Daten
const quizData = [
  {
    question:
      "Welche der folgenden Eigenschaften wird verwendet, um die Ausrichtung der Elemente entlang der Hauptachse in einem Flex-Container zu steuern?",
    options: ["align-items", "justify-content", "flex-wrap"],
    answer: "justify-content",
  },
  {
    question: "Was bewirkt die CSS-Eigenschaft grid-template-areas?",
    options: [
      "Definiert die Spalten und Zeilen des Grids.",
      "Ermöglicht die Benennung von Bereichen im Grid, die dann von Elementen belegt werden können.",
      "Legt fest, wie groß die Abstände zwischen den Grid-Zellen sein sollen.",
    ],
    answer:
      "Ermöglicht die Benennung von Bereichen im Grid, die dann von Elementen belegt werden können.",
  },
  {
    question: "Welche der folgenden Aussagen zu let, const und var ist falsch?",
    options: [
      "let und const sind block-scoped, während var function-scoped ist.",
      "const erlaubt keine Neuzuweisung des Wertes.",
      "let erlaubt keine Neudeklaration derselben Variable im gleichen Scope.",
    ],
    answer:
      "let erlaubt keine Neudeklaration derselben Variable im gleichen Scope.",
  },
  {
    question: "Was ist der Unterschied zwischen == und === in JavaScript?",
    options: [
      "== vergleicht nur den Wert, während === sowohl Wert als auch Typ vergleicht.",
      "== ist für Strings, === ist für Zahlen.",
      "== vergleicht sowohl Wert als auch Typ, während === nur den Wert vergleicht.",
    ],
    answer:
      "== vergleicht nur den Wert, während === sowohl Wert als auch Typ vergleicht.",
  },
  {
    question:
      "Welche der folgenden Schleifen wird garantiert mindestens einmal ausgeführt?",
    options: ["for", "do...while", "forEach"],
    answer: "do...while",
  },
  {
    question:
      "Welches HTML-Element wird verwendet, um eine unabhängige, in sich geschlossene Einheit in einem Dokument darzustellen, wie z. B. einen Blogpost oder einen Artikel?",
    options: ["section", "article", "div"],
    answer: "article",
  },
  {
    question:
      "Welche der folgenden Aussagen zu JavaScript-Promises ist falsch?",
    options: [
      "Promises sind asynchron.",
      "Promises können nur einmal resolved oder rejected werden.",
      "Promises können gechained werden.",
    ],
    answer: "Promises können nur einmal resolved oder rejected werden.",
  },
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next");
const resultElement = document.getElementById("result");

// Frage laden mit Animation
function loadQuestion() {
  const question = quizData[currentQuestion];
  questionElement.textContent = question.question;

  optionsElement.innerHTML = "";
  question.options.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("option-btn");
    button.addEventListener("click", () => checkAnswer(option, button));
    optionsElement.appendChild(button);
  });

  // Einblendung der Frage
  questionElement.style.opacity = 0;
  optionsElement.style.opacity = 0;
  setTimeout(() => {
    questionElement.style.opacity = 1;
    optionsElement.style.opacity = 1;
  }, 400);
}

// Antwort prüfen mit Farbfeedback
function checkAnswer(answer, button) {
  if (answer === quizData[currentQuestion].answer) {
    score++;
    button.style.backgroundColor = "green"; // Richtig: Grün
  } else {
    button.style.backgroundColor = "red"; // Falsch: Rot
  }

  nextButton.style.display = "block"; // Nächste Frage Button anzeigen
}

// Nächste Frage laden
nextButton.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
    nextButton.style.display = "none"; // Button wieder verstecken
  } else {
    showResult();
  }
});

// Ergebnis
function showResult() {
  questionElement.textContent = "Quiz beendet!";
  optionsElement.innerHTML = "";
  resultElement.textContent = `Du hast ${score} von ${quizData.length} Fragen richtig beantwortet!`;
  nextButton.style.display = "none";
}

// Erste Frage laden
loadQuestion();
