import {
  arrowLeft,
  arrowRight,
  circleLeft, expand, trophy, volumeOn,
} from '../utils/icons';
import htmlSprintGameMainPage from './template/mainSprintGame';

const drawSprintGame = (): void => {
  const content = document.querySelector('.main') as HTMLElement;
  content.innerHTML = htmlSprintGameMainPage;
};

export default drawSprintGame;

export function renderGame() {
  const gameHeader = document.querySelector('.sprint-game-header') as HTMLDivElement;
  const gameContent = document.querySelector('.sprint-game-content') as HTMLDivElement;

  const header = `<button class="game-out">${circleLeft}</button>
                  <button class="music-img music-on">${volumeOn}</button>
                  <button class="fullscreen-game fullscreen">${expand}</button>`;

  const content = `<h2 class="score-game">Score: <span class="score">0</span></h2>
                  <div class="wrapper-game">
                    <div class="game-content">
                      <div class="progress-game">
                        <div class="wrapper-dotted">
                          <div class="dotted dotted-1"></div>
                          <div class="dotted dotted-2"></div>
                          <div class="dotted dotted-3"></div>
                        </div>
                        <p class="progress-game-text">+10 points for right answer</p>
                      </div>
                      <div class="wrapper-img-win">
                        <div class="win win-1">${trophy}</div>
                        <div class="win win-2">${trophy}</div>
                        <div class="win win-3">${trophy}</div>
                        <div class="win win-4">${trophy}</div>
                      </div>
                      <div class ="game-word-wrapper">
                        <div class="word-game"> </div>
                        <div class="word-translate"></div>
                      </div>
                      <div class="wrapper-answer-btn">
                        <button class="answer wrong-answer">Wrong</button>
                        <button class="answer right-answer">Right</button>
                      </div>
                      <div class="wrapper-arrows">
                        <div class="arrows"> ${arrowLeft} </div>
                        <div class="arrows"> ${arrowRight} </div>
                      </div>
                    </div>
                    <div class="timer-game">60</div>
                  </div>
                  <div id="modal-window-sprint-game" class="game-sprint-modal-window hidden">
                    <div class="game-sprint-modal-content">
                      <div class="modal-content-header">
                        <h2>Result</h2>
                      </div>
                      <div class="modal-content-result">
                        <div class="modal-content-correct">
                          <h3>Correct:</h3>
                        </div>
                        <div class="modal-content-wrong">
                          <h3>Wrong:</h3>
                        </div>
                      </div>
                      <div class="modal-content-bottom">
                        <button class="modal-close modal-close-sprint">Close</button>
                      </div>
                    </div>
                  </div>`;

  gameHeader.innerHTML = `${header}`;
  gameContent.innerHTML = `${content}`;
}
