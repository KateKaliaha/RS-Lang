import serverRequests from '../model/appModel';
import htmlGamePageAudioCall from '../views/template/gamePageAudioGame';
import playSound from './playSound';
import saveWordLocal from './saveWordsLocal';
import logicAudioGame from './logicAudioGame';
import changeHashPage from '../model/hashPage';

export const eventStartGame = async (event: KeyboardEvent): Promise<void> => {
  const gameWrapper = document.querySelector('.audio-game-wrapper') as HTMLElement;
  const keyCode = event.key;
  switch (keyCode) {
    case 'Enter':
      await saveWordLocal();
      gameWrapper.innerHTML = htmlGamePageAudioCall;
      logicAudioGame();
      changeHashPage('game-audio/start');
      window.removeEventListener('keydown', eventStartGame);
      break;
    default:
      break;
  }
};

const startAudioGame = () => {
  localStorage.setItem('lengthCorrectAnswer', '0');
  const serverPath = serverRequests.baseUrl;
  const startButton = document.querySelector('.audio-game-start-button') as HTMLElement;
  const gameWrapper = document.querySelector('.audio-game-wrapper') as HTMLElement;
  if (startButton) {
    startButton.addEventListener('click', async () => {
      await saveWordLocal();
      gameWrapper.innerHTML = htmlGamePageAudioCall;
      logicAudioGame();
      changeHashPage('game-audio/start');
      window.removeEventListener('keydown', eventStartGame);
    });
  }
  window.addEventListener('keydown', eventStartGame);
  playSound(gameWrapper, serverPath);
};

export default startAudioGame;
