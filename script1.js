const quizQuestions = [
    {
      question: ' What is JavaScript?',
      options: [ 'JavaScript is a scripting language used to make the website interactive',
         'JavaScript is an assembly language used to make the website interactive',
         'JavaScript is a compiled language used to make the website interactive',
         'None of the mentioned'],
      answer: 'JavaScript is a scripting language used to make the website interactive',
    },
    {
      question: 'Arrays in JavaScript are defined by which of the following statements?',
      options: [' It is an ordered list of values',
        ' It is an ordered list of objects',
         'It is an ordered list of string',
         'It is an ordered list of functions'],
      answer: ' It is an ordered list of values',
    },
    {
      question: 'Which of the following is not javascript data types?',
      options: [ 'Null type',
         'Undefined type',
         'Number type',
         'All of the mentioned'],
      answer: 'All of the mentioned',
    },
    {
      question: 'Why JavaScript Engine is needed?',
      options: ['Both Compiling & Interpreting the JavaScript',
         'Parsing the javascript',
         'Interpreting the JavaScript',
         'Compiling the JavaScript'],
      answer: 'Interpreting the JavaScript',
    },
    {
      question: 'In which HTML element, we put the JavaScript code?',
      options: ['<javascript>...</javascript>',
        '<js>...</js>',
        ' <script>...</script>',
        '<css>...</css>'
      ],
      answer: '<script>...</script>',
    },
    {
      question: 'Which JavaScript method is used to access an HTML element by id?',
      options: ['getElementById()',
       ' getElement(id)',
       ' getElementById(id)',
       ' elementById(id)]',
    ],
      answer: 'getElementById(id)',
    },
    {
      question: 'Which property is used to define the HTML content to an HTML element with a specific id?',
      options: ['innerText',
       'innerContent',
       'elementText',
       'innerHTML',
      ],
      answer: 'innerHTML',
    },
    {
      question: 'Which JavaScript method is used to write HTML output?',
      options: ['document.write()',
        'document.output()',
        'console.log()',
        'document.writeHTML()',],
      answer: 'document.write()',
    },
    {
      question: ' What is the default value of an uninitialized variable?',
      options: ['0',
        'undefined',
        'null',
        'NaN',
        
      ],
      answer: 'undefined',
    },
    {
      question: 'JavaScript arrays are written with _____.',
      options: ['round brackets ()',
        'curly brackets {}',
        'double quotes ""',
        'square brackets []'],
      answer: 'square brackets []',
    },
  ];
  const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();
