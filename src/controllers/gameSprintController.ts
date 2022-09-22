import { gameParameters, rightAnswers, wrongAnswers } from '../constants/constants';
import serverRequests, { auth } from '../model/appModel';
import {
  timer, arrForSelectedWords, changeColorStylesByLevels, findPage,
  gameSprintKeyboard, gameSprintMouse, getGroupAndPAge,
  resetCount,
  getRandomNumber,
  getWordsForGame,
} from '../model/gameSprintModel';
import changeHashPage from '../model/hashPage';
import { IAuth, IStatistic } from '../types/interface';
import { volumeOff, volumeOn } from '../utils/icons';
import drawSprintGame, { renderGame } from '../views/renderSprintGame';
import fullScreen, { closeGameWindow } from './fullscreen';

document.addEventListener('change', (event: Event): void => {
  if ((event.target as HTMLSelectElement).classList.contains('sprint-game-select')) {
    const groupAndPage = [{ key: 'group', value: (+(event.target as HTMLSelectElement).value - 1) }, { key: 'page', value: 'null' }];
    localStorage.setItem('sprintGroupAndPage', JSON.stringify(groupAndPage));
  }
});

document.addEventListener('click', async (event: MouseEvent): Promise<void> => {
  if ((event.target as HTMLButtonElement).classList.contains('sprint-game-start-button')) {
    const { group, page } = getGroupAndPAge('sprintGroupAndPage');
    const pages = findPage(page);
    const prevWords = await serverRequests.getWords([{ key: 'group', value: `${group}` }, { key: 'page', value: `${pages[0].toString()}` }]);
    const nextWords = await serverRequests.getWords([{ key: 'group', value: `${group}` }, { key: 'page', value: `${pages[1].toString()}` }]);
    const words = await serverRequests.getWords([{ key: 'group', value: `${group}` }, { key: 'page', value: `${page}` }]);
    const allWords = [...words, ...nextWords, ...prevWords];
    localStorage.setItem('allWords', JSON.stringify(allWords));
    await getWordsForGame();
    renderGame();
    changeColorStylesByLevels('sprintGroupAndPage');
    const btnGameOut = document.querySelector('.game-out') as HTMLButtonElement;

    resetCount(allWords.length - 1);
    fullScreen(document.querySelector('.sprint-game-wrapper') as HTMLElement);

    const wordsForGame = await JSON.parse(localStorage.getItem('wordsForGame') as string);

    const wordContainer = document.querySelector('.word-game') as HTMLDivElement;
    const translateWord = document.querySelector('.word-translate') as HTMLDivElement;

    wordContainer.innerHTML = wordsForGame[gameParameters.count][0] as string;
    translateWord.innerHTML = wordsForGame[gameParameters.count][getRandomNumber(4, 3)];
    localStorage.setItem('answer', JSON.stringify({ right: `${words[gameParameters.count].wordTranslate}`, answer: `${translateWord.innerHTML}` }));

    btnGameOut.style.visibility = 'visible';
    btnGameOut.style.opacity = '1';

    gameParameters.interval = timer();
  }

  const buttonGameOut = (event.target as HTMLElement).closest('.game-out');

  if (buttonGameOut) {
    drawSprintGame();
    closeGameWindow(document.querySelector('.sprint-game-close_span') as HTMLButtonElement);

    localStorage.setItem('sprintGroupAndPage', JSON.stringify([{ key: 'group', value: '0' }, { key: 'page', value: 'null' }]));
    gameParameters.count = 0;
    gameParameters.sum = 0;
    gameParameters.trueAnswers = 0;
    rightAnswers.length = 0;
    wrongAnswers.length = 0;
    arrForSelectedWords.length = 0;
    gameParameters.interval = 0;

    fullScreen(document.querySelector('.sprint-game-wrapper') as HTMLElement);
    const userStat = localStorage.getItem('statistic') as string;

    if (userStat) {
      const statistic: IStatistic = JSON.parse(userStat);

      if (statistic.id) {
        delete statistic.id;
      }

      const user: IAuth = JSON.parse(localStorage.getItem('user') as string);
      serverRequests.updateUserStatistic(user.userId, user.token, statistic);
    }
  }

  if ((event.target as HTMLButtonElement).classList.contains('music-img')
  || (event.target as HTMLButtonElement).closest('.music-img')) {
    const musicBtn = document.querySelector('.music-img') as HTMLButtonElement;

    if ((event.target as HTMLButtonElement).closest('.music-on')) {
      musicBtn.innerHTML = `${volumeOff}`;
      auth.addAndRemoveClassEl(musicBtn, 'music-on', 'music-off');
      gameParameters.volume = 0;
    }

    if ((event.target as HTMLButtonElement).closest('.music-off')) {
      musicBtn.innerHTML = `${volumeOn}`;
      auth.addAndRemoveClassEl(musicBtn, 'music-off', 'music-on');
      gameParameters.volume = 1;
    }
  }

  const modalResultWindow = document.querySelector('.game-sprint-modal-window') as HTMLDivElement;

  if ((event.target as HTMLButtonElement).classList.contains('modal-close')) {
    const html = document.querySelector('html') as HTMLHtmlElement;
    const userString: string = localStorage.getItem('user') as string;

    html.style.overflowY = '';
    modalResultWindow.classList.toggle('hidden');
    changeHashPage('game-sprint');
    drawSprintGame();
    closeGameWindow(document.querySelector('.sprint-game-close_span') as HTMLButtonElement);
    localStorage.setItem('sprintGroupAndPage', JSON.stringify([{ key: 'group', value: '0' }, { key: 'page', value: 'null' }]));

    if (userString) {
      const statistic: IStatistic = await JSON.parse(localStorage.getItem('statistic') as string);
      if (statistic.id) {
        delete statistic.id;
      }
      const date = new Date();
      const day = date.getDate();

      if (statistic.optional[day].sprintGame.winLength < gameParameters.bestResult) {
        statistic.optional[day].sprintGame.winLength = gameParameters.bestResult;
      }

      localStorage.setItem('statistic', JSON.stringify(statistic));

      const user: IAuth = JSON.parse(userString);
      serverRequests.updateUserStatistic(
        user.userId,
        user.token,
        statistic,
      );
    }

    gameParameters.count = 0;
    gameParameters.sum = 0;
    gameParameters.trueAnswers = 0;
    rightAnswers.length = 0;
    wrongAnswers.length = 0;
    arrForSelectedWords.length = 0;
    gameParameters.bestResult = 0;
    gameParameters.interval = 0;
  }

  if ((event.target as HTMLButtonElement).closest('[data-sound]')) {
    const soundElement = (event.target as HTMLButtonElement).closest('[data-sound]') as HTMLElement;
    const serverPath = serverRequests.baseUrl;
    const url = soundElement.dataset.sound;
    new Audio(`${serverPath}/${url}`).play();
  }
});

document.addEventListener('click', gameSprintMouse);
document.addEventListener('keydown', gameSprintKeyboard);

document.addEventListener('click', async (event: MouseEvent) => {
  if ((event.target as HTMLButtonElement).closest('#textbook-game-sprint')) {
    changeHashPage('game-sprint/start');
    const authUser = localStorage.getItem('auth');
    const userString = localStorage.getItem('user');
    const namePage = document.querySelector('.name-page') as HTMLDivElement;
    namePage.innerHTML = 'Game-sprint';

    drawSprintGame();
    renderGame();
    changeColorStylesByLevels('groupAndPage');

    const groupAndPage = JSON.parse(localStorage.getItem('groupAndPage') as string);
    const group: string = groupAndPage[0].value;
    const page: string = groupAndPage[1].value;
    const pages = findPage(page.toString());
    const btnGameOut = document.querySelector('.game-out') as HTMLButtonElement;

    if (authUser && userString) {
      const user = JSON.parse(userString);
      if (+group !== 6) {
        const nextPageInGroup = [{ key: 'group', value: `${group}` }, { key: 'page', value: `${pages[0].toString()}` }];
        const prevPageInGroup = [{ key: 'group', value: `${group}` }, { key: 'page', value: `${pages[1].toString()}` }];
        const newWords = await serverRequests.getUsersAggregatedWords(
          user.userId,
          user.token,
          groupAndPage,
        );
        const nextWords = await serverRequests.getUsersAggregatedWords(
          user.userId,
          user.token,
          nextPageInGroup,
        );
        const prevWords = await serverRequests.getUsersAggregatedWords(
          user.userId,
          user.token,
          prevPageInGroup,
        );
        const wordsForGame = [...newWords, ...nextWords, ...prevWords].filter((word) => word.userWord?.difficulty !== 'easy');
        localStorage.setItem('allWords', JSON.stringify(wordsForGame));
        await getWordsForGame();
        resetCount(wordsForGame.length - 1);
        fullScreen(document.querySelector('.sprint-game-wrapper') as HTMLElement);

        const words = await JSON.parse(localStorage.getItem('wordsForGame') as string);

        const wordContainer = document.querySelector('.word-game') as HTMLDivElement;
        const translateWord = document.querySelector('.word-translate') as HTMLDivElement;

        wordContainer.innerHTML = words[gameParameters.count][0] as string;
        translateWord.innerHTML = words[gameParameters.count][getRandomNumber(4, 3)];
        localStorage.setItem('answer', JSON.stringify({ right: `${wordsForGame[gameParameters.count].wordTranslate}`, answer: `${translateWord.innerHTML}` }));
      } else {
        const difficultWords = await serverRequests.getUsersAggregatedWordsByDifficulty(
          user.userId,
          user.token,
          'hard',
        );

        localStorage.setItem('allWords', JSON.stringify(difficultWords));
        await getWordsForGame();
        fullScreen(document.querySelector('.sprint-game-wrapper') as HTMLElement);

        const words = await JSON.parse(localStorage.getItem('wordsForGame') as string);
        const wordContainer = document.querySelector('.word-game') as HTMLDivElement;
        const translateWord = document.querySelector('.word-translate') as HTMLDivElement;

        wordContainer.innerHTML = words[gameParameters.count][0] as string;
        translateWord.innerHTML = words[gameParameters.count][getRandomNumber(4, 3)];
        localStorage.setItem('answer', JSON.stringify({ right: `${difficultWords[gameParameters.count].wordTranslate}`, answer: `${translateWord.innerHTML}` }));
      }
    } else {
      const prevWords = await serverRequests.getWords([{ key: 'group', value: `${group}` }, { key: 'page', value: `${pages[0].toString()}` }]);
      const nextWords = await serverRequests.getWords([{ key: 'group', value: `${group}` }, { key: 'page', value: `${pages[1].toString()}` }]);
      const words = await serverRequests.getWords([{ key: 'group', value: `${group}` }, { key: 'page', value: `${page}` }]);
      const allWords = [...words, ...nextWords, ...prevWords];

      localStorage.setItem('allWords', JSON.stringify(allWords));
      await getWordsForGame();
      resetCount(allWords.length - 1);
      fullScreen(document.querySelector('.sprint-game-wrapper') as HTMLElement);

      const wordContainer = document.querySelector('.word-game') as HTMLDivElement;
      const translateWord = document.querySelector('.word-translate') as HTMLDivElement;
      const wordsForGame = await JSON.parse(localStorage.getItem('wordsForGame') as string);
      wordContainer.innerHTML = wordsForGame[gameParameters.count][0] as string;
      translateWord.innerHTML = wordsForGame[gameParameters.count][getRandomNumber(4, 3)];
      localStorage.setItem('answer', JSON.stringify({ right: `${words[gameParameters.count].wordTranslate}`, answer: `${translateWord.innerHTML}` }));
    }

    btnGameOut.style.visibility = 'visible';
    btnGameOut.style.opacity = '1';
    gameParameters.interval = timer();
  }
});
