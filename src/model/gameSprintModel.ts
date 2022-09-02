import { gameParameters, rightAnswers, wrongAnswers } from '../constants/constants';
import saveUserWord from '../controllers/saveUserWord';
import { IStatistic, IWord } from '../types/interface';
import { volume } from '../utils/icons';

export function timer(): void {
  const countDownElement = document.querySelector('.timer-game') as HTMLDivElement;
  const modalResultWindow = document.querySelector('.game-sprint-modal-window') as HTMLDivElement;
  const html = document.querySelector('html') as HTMLHtmlElement;

  let secondsForGame = 59;
  const SECOND_STOP_TIMER = 0;

  const interval = setInterval(() => {
    countDownElement.innerHTML = secondsForGame.toString();

    if (SECOND_STOP_TIMER === secondsForGame) {
      clearInterval(interval);
      modalResultWindow.classList.toggle('hidden');
      html.style.overflowY = 'hidden';
    }

    secondsForGame -= 1;
  }, 1000);
}

function addColorStyle(color: string): void {
  const score = document.querySelector('.score-game') as HTMLElement;
  const timerBox = document.querySelector('.timer-game') as HTMLElement;
  score.style.color = color;
  timerBox.style.color = color;
  timerBox.style.border = ` 2px solid ${color}`;
}

export function changeColorStylesByLevels(): void {
  const groupAndPage = JSON.parse(localStorage.getItem('sprintGroupAndPage') as string);

  switch ((groupAndPage[0].value).toString()) {
    case '1':
      addColorStyle('rgb(43, 255, 107)');
      break;

    case '2':
      addColorStyle('rgb(128, 255, 43)');
      break;

    case '3':
      addColorStyle('rgb(223, 255, 43)');
      break;

    case '4':
      addColorStyle('rgb(255, 234, 43)');
      break;

    case '5':
      addColorStyle('rgb(255, 163, 43)');
      break;

    case '6':
      addColorStyle('rgb(255, 128, 43)');
      break;

    default:
  }
}

export function getRandomNumber(maxNumber: number, minNumber: number): number {
  return Math.floor(Math.random() * ((maxNumber) - minNumber + 1)) + minNumber;
}

export function getGroupAndPAge(): Record< string, string > {
  const groupAndPage = JSON.parse(localStorage.getItem('sprintGroupAndPage') as string);
  const group: string = groupAndPage[0].value || '0';
  const page: string = groupAndPage[1].value !== 'null' ? groupAndPage[1].value : getRandomNumber(29, 0).toString();

  return { group, page };
}

export const arrForSelectedWords: Array<string> = [];
let countForSelect = 57;

export function getRandomWrongWordTranslate(arr: IWord[], el: string): string {
  const wrongTranslateWords = arr.filter((element) => element.wordTranslate !== el
  && !arrForSelectedWords.includes(element.wordTranslate));

  const number = getRandomNumber(countForSelect, 0);

  const wrongTranslateWord = wrongTranslateWords[number].wordTranslate;
  arrForSelectedWords.push(wrongTranslateWord);
  countForSelect -= 1;

  return wrongTranslateWord;
}

export function resetCount(): number {
  countForSelect = 57;

  return countForSelect;
}

export function playSoundAnswers(link: string, volumeSize: number): void {
  const player = new Audio();
  player.src = link;
  player.volume = volumeSize;
  player.play();
}

export function findPage(page: string): number[] {
  const pages = [];
  let nextPage;
  let prevPage;
  switch (page) {
    case '29': {
      nextPage = 0;
      prevPage = +page - 1;
      break;
    }
    case '0': {
      nextPage = +page + 1;
      prevPage = 29;
      break;
    }
    default: {
      nextPage = +page + 1;
      prevPage = +page - 1;
      break;
    }
  }
  pages.push(prevPage, nextPage);

  return pages;
}

function resetStylesDotted(): void {
  const firstDotted = document.querySelector('.dotted-1') as HTMLDivElement;
  const secondDotted = document.querySelector('.dotted-2') as HTMLDivElement;
  const thirdDotted = document.querySelector('.dotted-3') as HTMLDivElement;
  firstDotted.style.background = '#e9e9e9';
  secondDotted.style.background = '#e9e9e9';
  thirdDotted.style.background = '#e9e9e9';
}

function addVisibleAwards(className: string): void {
  const awardContent = document.querySelector(className) as HTMLDivElement;
  awardContent.style.opacity = '1';
  awardContent.style.visibility = 'visible';
}

function changeProgressGameBlock(color: string, score: number): void {
  const progressWrapper = document.querySelector('.progress-game') as HTMLDivElement;
  const scoreForWord = document.querySelector('.progress-game-text') as HTMLParagraphElement;
  progressWrapper.style.background = color;
  scoreForWord.innerHTML = `+${score} points for right answer`;
}

function resetStylesAwardsAndProgressBlock(): void {
  const secondAward = document.querySelector('.win-2') as HTMLDivElement;
  const thirdAward = document.querySelector('.win-3') as HTMLDivElement;
  const fourthAward = document.querySelector('.win-4') as HTMLDivElement;
  changeProgressGameBlock('antiquewhite', 10);

  secondAward.style.opacity = '0';
  secondAward.style.visibility = 'hidden';
  thirdAward.style.opacity = '0';
  thirdAward.style.visibility = 'hidden';
  fourthAward.style.opacity = '0';
  fourthAward.style.visibility = 'hidden';
}

export function changeStylesForRightAnswers(length: number): void {
  const firstDotted = document.querySelector('.dotted-1') as HTMLDivElement;
  const secondDotted = document.querySelector('.dotted-2') as HTMLDivElement;
  const thirdDotted = document.querySelector('.dotted-3') as HTMLDivElement;

  switch (length) {
    case 1:
    case 5:
    case 9:
    case 13:
      firstDotted.style.background = 'green';
      break;

    case 2:
    case 6:
    case 10:
    case 14:
      secondDotted.style.background = 'green';
      break;

    case 3:
    case 7:
    case 11:
    case 15:
      thirdDotted.style.background = 'green';
      break;

    case 4:
      changeProgressGameBlock('#f58442', 20);
      resetStylesDotted();
      addVisibleAwards('.win-2');
      break;

    case 8:
      changeProgressGameBlock('#f58142', 40);
      resetStylesDotted();
      addVisibleAwards('.win-3');
      break;

    case 12:
      changeProgressGameBlock('#f56642', 60);
      resetStylesDotted();
      addVisibleAwards('.win-4');
      break;

    case 0:
      resetStylesAwardsAndProgressBlock();
      resetStylesDotted();
      break;

    default:
  }
}

export function changeScore(length: number): number {
  let score = 10;

  if (length >= 4 && length <= 7) {
    score = 20;
  }

  if (length >= 8 && length <= 12) {
    score = 40;
  }

  if (length >= 13) {
    score = 60;
  }

  return score;
}

export async function checkRightOrWrongAnswer(
  answer: boolean,
  arr: [string, string, string, string, string] [],
) {
  const scoreContainer = document.querySelector('.score') as HTMLSpanElement;
  const modelContentWrong = document.querySelector('.modal-content-wrong') as HTMLElement;
  const modelContentCorrect = document.querySelector('.modal-content-correct') as HTMLElement;

  if (answer === true) {
    rightAnswers.push(arr[gameParameters.count - 1][0]);
    playSoundAnswers('./assets/sounds/right-volume.mp3', gameParameters.volume);
    gameParameters.trueAnswers += 1;
    gameParameters.sum += changeScore(gameParameters.trueAnswers);
    gameParameters.bestResult = gameParameters.bestResult > gameParameters.trueAnswers
      ? gameParameters.bestResult : gameParameters.trueAnswers;
    scoreContainer.innerHTML = gameParameters.sum.toString();
    modelContentCorrect.innerHTML += `<div class="result-answer-line-correct">
    <div class="result-answer-line-image" data-sound="${arr[gameParameters.count - 1][3]}">${volume}</div>
     <span>${arr[gameParameters.count - 1][0]}</span>
     <span>-</span>
     <span>${arr[gameParameters.count - 1][1]}</span>
    </div>`;
  } else {
    wrongAnswers.push(arr[gameParameters.count - 1][0]);
    playSoundAnswers('./assets/sounds/wrong-volume.mp3', gameParameters.volume);
    gameParameters.trueAnswers = 0;
    modelContentWrong.innerHTML += `<div class="result-answer-line-wrong">
    <div class="result-answer-line-image" data-sound="${arr[gameParameters.count - 1][3]}">${volume}</div>
     <span>${arr[gameParameters.count - 1][0]}</span>
     <span>-</span>
     <span>${arr[gameParameters.count - 1][1]}</span>
    </div>`;
  }
}

export async function gameSprintKeyboard(event: KeyboardEvent) {
  if (event.code === 'ArrowRight' || event.code === 'ArrowLeft') {
    event.preventDefault();
    const answer = JSON.parse(localStorage.getItem('answer') as string);
    const wordContainer = document.querySelector('.word-game') as HTMLDivElement;
    const translateWord = document.querySelector('.word-translate') as HTMLDivElement;
    const words:[string, string, string, string, string] [] = JSON.parse(localStorage.getItem('wordsForGame') as string);
    const allWords: IWord[] = await JSON.parse(localStorage.getItem('allWords') as string);
    const user = localStorage.getItem('user') as string;

    gameParameters.count += 1;

    if (gameParameters.count === 38) {
      gameParameters.count = 1;
    }

    wordContainer.innerHTML = words[gameParameters.count][0] as string;
    translateWord.innerHTML = words[gameParameters.count][getRandomNumber(2, 1)];

    localStorage.setItem('answer', JSON.stringify(
      { right: `${words[gameParameters.count][1]}`, answer: `${translateWord.innerHTML}` },
    ));

    if (answer.right === answer.answer && event.code === 'ArrowRight') {
      await checkRightOrWrongAnswer(true, words);
      saveUserWord(user, allWords[gameParameters.count], false, 'sprint');
    } else if (answer.right !== answer.answer && event.code === 'ArrowRight') {
      await checkRightOrWrongAnswer(false, words);
      saveUserWord(user, allWords[gameParameters.count], true, 'sprint');
    }

    if (answer.right !== answer.answer && event.code === 'ArrowLeft') {
      await checkRightOrWrongAnswer(true, words);
      saveUserWord(user, allWords[gameParameters.count], false, 'sprint');
    } else if (answer.right === answer.answer && event.code === 'ArrowLeft') {
      await checkRightOrWrongAnswer(false, words);
      saveUserWord(user, allWords[gameParameters.count], true, 'sprint');
    }
    changeStylesForRightAnswers(gameParameters.trueAnswers);
  }
}

export async function gameSprintMouse(event: MouseEvent) {
  if ((event.target as HTMLButtonElement).classList.contains('answer')) {
    const answer = JSON.parse(localStorage.getItem('answer') as string);
    const wordContainer = document.querySelector('.word-game') as HTMLDivElement;
    const translateWord = document.querySelector('.word-translate') as HTMLDivElement;
    const words:[string, string, string, string, string] [] = JSON.parse(localStorage.getItem('wordsForGame') as string);
    const allWords: IWord[] = await JSON.parse(localStorage.getItem('allWords') as string);
    const user = localStorage.getItem('user') as string;
    const userStatistics: IStatistic = JSON.parse(localStorage.getItem('statistic') as string);
    // const date = new Date();
    // const day = date.getDate();
    gameParameters.count += 1;

    if (gameParameters.count === 38) {
      gameParameters.count = 1;
    }

    wordContainer.innerHTML = words[gameParameters.count][0] as string;
    translateWord.innerHTML = words[gameParameters.count][getRandomNumber(2, 1)];

    localStorage.setItem('answer', JSON.stringify({ right: `${words[gameParameters.count][1]}`, answer: `${translateWord.innerHTML}` }));

    if (answer.right === answer.answer && (event.target as HTMLButtonElement).classList.contains('right-answer')) {
      await checkRightOrWrongAnswer(true, words);
      saveUserWord(user, allWords[gameParameters.count], false, 'sprint');
      // userStatistics.optional[day].sprintGame.correct += 1;
    } else if (answer.right !== answer.answer && (event.target as HTMLButtonElement).classList.contains('right-answer')) {
      await checkRightOrWrongAnswer(false, words);
      saveUserWord(user, allWords[gameParameters.count], true, 'sprint');
      // userStatistics.optional[day].sprintGame.wrong += 1;
    }

    if (answer.right !== answer.answer && (event.target as HTMLButtonElement).classList.contains('wrong-answer')) {
      await checkRightOrWrongAnswer(true, words);
      saveUserWord(user, allWords[gameParameters.count], false, 'sprint');
      // userStatistics.optional[day].sprintGame.correct += 1;
    } else if (answer.right === answer.answer && (event.target as HTMLButtonElement).classList.contains('wrong-answer')) {
      await checkRightOrWrongAnswer(false, words);
      saveUserWord(user, allWords[gameParameters.count], true, 'sprint');
      // userStatistics.optional[day].sprintGame.wrong += 1;
    }

    localStorage.setItem('statistic', JSON.stringify(userStatistics));
    changeStylesForRightAnswers(gameParameters.trueAnswers);
  }
}
