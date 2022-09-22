import changeHashPage from '../model/hashPage';
import drawAudioGame from '../views/renderAudioGame';
import htmlGamePageAudioCall from '../views/template/gamePageAudioGame';
import logicAudioGame from './logicAudioGame';
import saveWordLocal from './saveWordsLocal';

const startAudioGameBook = () => {
  localStorage.setItem('lengthCorrectAnswer', '0');
  const startButton = document.querySelector('#textbook-game-audio') as HTMLElement;
  startButton.addEventListener('click', async () => {
    await saveWordLocal();
    changeHashPage('game-audio/start');
    drawAudioGame();
    const gameWrapper = document.querySelector('.audio-game-wrapper') as HTMLElement;
    gameWrapper.innerHTML = htmlGamePageAudioCall;
    logicAudioGame();
  }, true);
};

export default startAudioGameBook;
