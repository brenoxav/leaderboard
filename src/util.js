import myGame from './Game.js';

const scoreList = document.querySelector('.score-list');
const inputName = document.querySelector('.input-name');
const inputScore = document.querySelector('.input-score');

const compareScores = (a, b) => {
  return (a.score > b.score) ? -1 : ((a.score < b.score) ? 1 : 0);
}

const renderList = () => {
  scoreList.innerHTML = '';
  myGame.getScores()
    .then((scores) => {
      const scoresArr = scores.result;
      scoresArr.sort(compareScores);
      scoresArr.forEach((score, index) => {
        scoreList.innerHTML += `
          <li class="score-item${index % 2 === 0 ? ' item-shade' : ''}">
            <span class="item-user">${score.user}</span>
            <span class="item-score">${score.score}</span>
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