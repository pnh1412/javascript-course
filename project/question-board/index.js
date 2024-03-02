function fakeApi(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      fetch(data).then(res => res.json()).then(data => resolve(data))
    }, 1000)
  })
}

async function fetchQuestions() {
  const questions = await fakeApi('dataQuestions.json');
  return questions;
}

async function fetchSubmissions() {
  const submissions = await fakeApi('dataSubmissions.json');
  return submissions;
}


// element dom
const questionBoard = document.getElementById('question_board');

function renderQuestionBoard(questions, submissions) {
  Object.keys(questions).forEach(key => {
    const category = questions[key];

    const divColumn = document.createElement('div');
    divColumn.setAttribute('class', 'column');
    // divColumn.classList.add('column');

    const headingTitle = document.createElement('h2');
    headingTitle.innerHTML = key;

    const divBoards = document.createElement('div');
    divBoards.setAttribute('class', 'boards');

    category.forEach(item => {
      const submissionItem = submissions.find(submission => submission.questionId === item.id);
      const status = submissionItem?.status;
      // let classStatus = 'question__status--none';
      // if(status === 'CORRECT') {
      //   classStatus = 'question__status--correct';
      // }
      // if(status === 'INCORRECT') {
      //   classStatus = 'question__status--incorrect';
      // }
      // if(status === 'PARTIALLY_CORRECT') {
      //   classStatus = 'question__status--partially_correct';
      // }

      const divQuestion = document.createElement('div');
      divQuestion.setAttribute('class', 'question');

      const divStatus = document.createElement('div');
      divStatus.setAttribute('class', `question__status question__status--${status ? status.toLowerCase() : 'none'}`);

      const divStatusTitle = document.createElement('h2');
      divStatusTitle.setAttribute('class', 'question__title');
      divStatusTitle.innerHTML = item.name;

      divQuestion.appendChild(divStatus);
      divQuestion.appendChild(divStatusTitle);

      divBoards.appendChild(divQuestion);

    })

    divColumn.appendChild(headingTitle);
    divColumn.appendChild(divBoards);

    // append root element question
    questionBoard.appendChild(divColumn);
  })
}

async function loadHTML() {
  const questionBoard = await fetchQuestions();
  const categories = questionBoard.reduce((acc, currItem) => {
    if(!acc[currItem.category]) {
      acc[currItem.category] = [];
    }
    acc[currItem.category].push(currItem);
    return acc;
  }, {})

  const submissions = await fetchSubmissions();
  console.log('submissions', {
    submissions,
    categories
  });
  renderQuestionBoard(categories, submissions);
}

loadHTML();