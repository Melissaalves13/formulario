const questions = [
  {
    question: "O que significa a sigla IA?",
    answers: [
      "Internet Avançada",
      "Inteligência Artificial",
      "Informação Automatizada",
      "Integração Algorítmica"
    ],
    correct: 1
  },

  {
    question: "Qual destas tecnologias é um exemplo de Inteligência Artificial generativa?",
    answers: [
      "Uma calculadora simples",
      "Um editor de texto tradicional",
      "Um modelo que gera textos e imagens",
      "Um cabo de rede"
    ],
    correct: 2
  },

  {
    question: "O que é um prompt?",
    answers: [
      "Uma instrução fornecida a um sistema de IA",
      "Um tipo de computador",
      "Um programa antivírus",
      "Uma linguagem de programação"
    ],
    correct: 0
  },

  {
    question: "O que é Machine Learning?",
    answers: [
      "Um sistema operacional",
      "Uma técnica em que sistemas aprendem padrões a partir de dados",
      "Um tipo de banco de dados",
      "Uma ferramenta para criar sites"
    ],
    correct: 1
  },

  {
    question: "Qual é uma possível aplicação da IA na educação?",
    answers: [
      "Personalizar experiências de aprendizagem",
      "Eliminar todos os professores",
      "Impedir o acesso à internet",
      "Substituir livros automaticamente"
    ],
    correct: 0
  },

  {
    question: "Por que devemos verificar informações produzidas por uma IA?",
    answers: [
      "Porque a IA nunca consegue responder perguntas",
      "Porque modelos podem produzir informações incorretas",
      "Porque a IA não consegue escrever textos",
      "Porque toda IA funciona sem dados"
    ],
    correct: 1
  },

  {
    question: "O que é um modelo de linguagem?",
    answers: [
      "Um modelo de impressora",
      "Um sistema treinado para trabalhar com linguagem e texto",
      "Um tipo de placa de vídeo",
      "Um navegador de internet"
    ],
    correct: 1
  },

  {
    question: "Qual destes é um cuidado importante ao utilizar IA?",
    answers: [
      "Compartilhar todas as informações pessoais",
      "Confiar cegamente em qualquer resposta",
      "Proteger dados sensíveis e verificar resultados",
      "Nunca revisar o conteúdo produzido"
    ],
    correct: 2
  },

  {
    question: "O que caracteriza uma IA generativa?",
    answers: [
      "Ela apenas armazena arquivos",
      "Ela pode produzir novos conteúdos a partir de padrões aprendidos",
      "Ela funciona somente sem internet",
      "Ela serve apenas para fazer cálculos"
    ],
    correct: 1
  },

  {
    question: "Qual é uma boa prática ao criar um prompt?",
    answers: [
      "Ser claro sobre o que você deseja",
      "Usar sempre uma única palavra",
      "Não fornecer nenhum contexto",
      "Escrever instruções contraditórias"
    ],
    correct: 0
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("next-button");

const questionNumberElement =
  document.getElementById("question-number");

const scoreElement =
  document.getElementById("score");

const progressBar =
  document.getElementById("progress-bar");

const quizScreen =
  document.getElementById("quiz-screen");

const resultScreen =
  document.getElementById("result-screen");

const finalScore =
  document.getElementById("final-score");

const resultMessage =
  document.getElementById("result-message");

const restartButton =
  document.getElementById("restart-button");


function loadQuestion() {

  answered = false;

  nextButton.disabled = true;

  const question = questions[currentQuestion];

  questionElement.textContent = question.question;

  questionNumberElement.textContent =
    `Pergunta ${currentQuestion + 1} de ${questions.length}`;

  scoreElement.textContent =
    `Pontos: ${score}`;

  const progress =
    ((currentQuestion + 1) / questions.length) * 100;

  progressBar.style.width = `${progress}%`;

  answersElement.innerHTML = "";

  question.answers.forEach((answer, index) => {

    const button = document.createElement("button");

    button.classList.add("answer");

    button.textContent = answer;

    button.addEventListener("click", () => {
      selectAnswer(button, index);
    });

    answersElement.appendChild(button);
  });
}


function selectAnswer(button, selectedIndex) {

  if (answered) {
    return;
  }

  answered = true;

  const correctIndex =
    questions[currentQuestion].correct;

  const buttons =
    document.querySelectorAll(".answer");

  buttons.forEach((answerButton, index) => {

    answerButton.disabled = true;

    if (index === correctIndex) {
      answerButton.classList.add("correct");
    }
  });

  if (selectedIndex === correctIndex) {

    button.classList.add("correct");

    score++;

    scoreElement.textContent =
      `Pontos: ${score}`;

  } else {

    button.classList.add("wrong");
  }

  nextButton.disabled = false;
}


nextButton.addEventListener("click", () => {

  currentQuestion++;

  if (currentQuestion < questions.length) {

    loadQuestion();

  } else {

    showResult();
  }
});


function showResult() {

  quizScreen.classList.add("hidden");

  resultScreen.classList.remove("hidden");

  finalScore.textContent =
    `${score}/${questions.length}`;

  const percentage =
    (score / questions.length) * 100;

  if (percentage === 100) {

    resultMessage.textContent =
      "Excelente! Você domina os conceitos de IA. 🚀";

  } else if (percentage >= 70) {

    resultMessage.textContent =
      "Muito bem! Você já tem uma ótima base sobre IA. 👏";

  } else if (percentage >= 50) {

    resultMessage.textContent =
      "Bom começo! Continue estudando para evoluir. 📚";

  } else {

    resultMessage.textContent =
      "Você está começando. Que tal aprender mais sobre IA? 🤖";
  }
}


restartButton.addEventListener("click", () => {

  currentQuestion = 0;
  score = 0;

  resultScreen.classList.add("hidden");

  quizScreen.classList.remove("hidden");

  loadQuestion();
});


loadQuestion();
