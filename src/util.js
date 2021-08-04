import myGame from './Game.js';

const scoreList = document.querySelector('.score-list');
const inputName = document.querySelector('.input-name');
const inputScore = document.querySelector('.input-score');

const renderList = () => {
  scoreList.innerHTML = '';
  myGame.getScores()
    .then((scores) => {
      scores.result.forEach((score, index) => {
        scoreList.innerHTML += `
          <li class="score-item${index % 2 === 0 ? ' item-shade' : ''}">
            ${score.user}: ${score.score}
          </li>
        `;
      });
    });
};

const postHandler = () => {
  if (inputName.value === '' || inputScore.value === '') {
    return;
  }

  myGame.postScore(inputName.value, inputScore.value)
    .then(() => {
      myGame.getScores()
        .then((scores) => {
          renderList(scores.result);
        });
    });
  inputName.value = '';
  inputScore.value = '';
};

export { renderList, postHandler };