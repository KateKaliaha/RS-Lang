import serverRequests from '../model/appModel';
import { volume } from '../utils/icons';
import saveUserWord from './saveUserWord';
import shuffleWordsGame from './shuffleWordsAudioGame';

async function wrongOrCorrectAnswer(
  event: KeyboardEvent,
  buttonOne: HTMLElement,
  volumeSVG: string[],
): Promise<void> {
  const wordsString = await localStorage.getItem('audio-game-words');
  const count = Number(localStorage.getItem('count-word-audio-game'));
  const btnKnow = document.querySelector('.audio-game-button-know') as HTMLElement;
  const btnNext = document.querySelector('.audio-game-button-next') as HTMLElement;
  const gameCard = document.querySelector('.audio-game-card') as HTMLElement;
  const audioBlock = document.querySelector('.audio-game-sound') as HTMLElement;
  const answerSectionButton = document.querySelectorAll('#game-button') as NodeListOf<Element>;
  const modelContentWrong = document.querySelector('.modal-content-wrong') as HTMLElement;
  const modelContentCorrect = document.querySelector('.modal-content-correct') as HTMLElement;
  const correctButton = document.querySelector("[data-answer='correct']") as HTMLButtonElement;
  const userString = localStorage.getItem('user');
  if (wordsString) {
    const words = await JSON.parse(wordsString);
    const word = words[count];
    if (buttonOne.dataset.answer === 'wrong') {
      const date = await new Date();
      const day = await date.getDate();
      const correct = localStorage.getItem('lengthCorrectAnswer');
      const stat = localStorage.getItem('statistic');
      if (correct && stat) {
        const statUser = JSON.parse(stat);
        const cor: number = +(correct);
        if (statUser.optional[day].audioGame.winLength < cor) {
          statUser.optional[day].audioGame.winLength = cor;
          localStorage.setItem('statistic', JSON.stringify(statUser));
        }
        localStorage.setItem('lengthCorrectAnswer', '0');
      }
      if (userString) {
        saveUserWord(userString, word, true, 'audio');
      }
      document.querySelector(`.dot-${count}`)?.setAttribute('style', 'background: red');
      btnKnow?.classList.toggle('hidden');
      btnNext?.classList.toggle('hidden');
      gameCard?.classList.toggle('hidden');
      audioBlock?.classList.toggle('hidden');
      correctButton?.setAttribute('style', 'background: green');
      buttonOne?.setAttribute('style', 'background: red');
      answerSectionButton?.forEach((btn) => btn.setAttribute('disabled', ''));
      modelContentWrong.innerHTML += `<div class="result-answer-line-wrong">
  <div class="result-answer-line-image" data-sound="${word.audio}">${volumeSVG}</div>
   <span>${word.word}</span>
   <span>-</span>
   <span>${word.wordTranslate}</span>
  </div>`;
    }
    if (buttonOne.dataset.answer === 'correct') {
      const obj = localStorage.getItem('lengthCorrectAnswer');
      if (obj) {
        const cor: number = +(obj);
        localStorage.setItem('lengthCorrectAnswer', `${+cor + 1}`);
      }
      if (userString) {
        saveUserWord(userString, word, false, 'audio');
      }
      document.querySelector(`.dot-${count}`)?.setAttribute('style', 'background: green');
      btnKnow?.classList.toggle('hidden');
      btnNext?.classList.toggle('hidden');
      gameCard?.classList.toggle('hidden');
      audioBlock?.classList.toggle('hidden');
      buttonOne?.setAttribute('style', 'background: green');
      answerSectionButton?.forEach((btn) => btn.setAttribute('disabled', ''));
      modelContentCorrect.innerHTML += `<div class="result-answer-line-correct">
    <div class="result-answer-line-image" data-sound="${word.audio}">${volumeSVG}</div>
     <span>${word.word}</span>
     <span>-</span>
     <span>${word.wordTranslate}</span>
    </div>`;
    }
  }
}

function removeKeyEvent(func: (event: KeyboardEvent) => void) { window.removeEventListener('keydown', func); }

export const eventKeyboard = (event: KeyboardEvent) => {
  const answerSection = document.querySelector('.audio-game-button-words') as HTMLElement;
  const keyCode = event.key;
  switch (keyCode) {
    case '1':
      {
        const buttonOne = answerSection.children[0] as HTMLElement;
        wrongOrCorrectAnswer(event, buttonOne, volume);
        removeKeyEvent(eventKeyboard);
      }
      break;
    case '2':
      {
        const buttonOne = answerSection.children[1] as HTMLElement;
        wrongOrCorrectAnswer(event, buttonOne, volume);
        removeKeyEvent(eventKeyboard);
      }
      break;
    case '3':
      {
        const buttonOne = answerSection.children[2] as HTMLElement;
        wrongOrCorrectAnswer(event, buttonOne, volume);
        removeKeyEvent(eventKeyboard);
      }
      break;
    case '4':
      {
        const buttonOne = answerSection.children[3] as HTMLElement;
        wrongOrCorrectAnswer(event, buttonOne, volume);
        removeKeyEvent(eventKeyboard);
      }
      break;
    case '5':
      {
        const buttonOne = answerSection.children[4] as HTMLElement;
        wrongOrCorrectAnswer(event, buttonOne, volume);
        removeKeyEvent(eventKeyboard);
      }
      break;
    case ' ':
      {
        const audioButton = document.querySelector('.audio-game-sound__image') as HTMLElement;
        const audioLink = audioButton.dataset.sound;
        new Audio(`${serverRequests.baseUrl}/${audioLink}`).play();
      }
      break;
    default:
      break;
  }
};

async function checkNextButton() {
  const btnNext = document.querySelector('.audio-game-button-next') as HTMLElement;
  const wordsString = localStorage.getItem('audio-game-words');
  let count = Number(localStorage.getItem('count-word-audio-game'));
  const btnKnow = document.querySelector('.audio-game-button-know') as HTMLElement;
  const gameCard = document.querySelector('.audio-game-card') as HTMLElement;
  const audioBlock = document.querySelector('.audio-game-sound') as HTMLElement;
  const answerSectionButton = document.querySelectorAll('#game-button') as NodeListOf<Element>;
  const modelContentNotKnow = document.querySelector('.modal-content-notknow') as HTMLElement;
  const correctButton = document.querySelector("[data-answer='correct']") as HTMLButtonElement;
  const modalResultWindow = document.querySelector('.game-audio-modal-window') as HTMLElement;
  const audio = document.querySelector('.audio-game-sound__image') as HTMLElement;
  const audioLineTop = document.querySelector('.audio-game-card-line-top-image') as HTMLElement;
  const audioLineMid = document.querySelector('.audio-game-card-line-mid-image') as HTMLElement;
  const image = document.querySelector('.audio-game-card__image') as HTMLElement;
  const audioLineTopText = document.querySelector('.audio-game-card-line-top-text') as HTMLElement;
  const audioLineMidText = document.querySelector('.audio-game-card-line-mid-text') as HTMLElement;
  const audioTranslate = document.querySelector('.audio-game-card-translate') as HTMLElement;
  const userString = localStorage.getItem('user');
  if (wordsString) {
    const words = JSON.parse(wordsString);
    if (btnKnow?.classList.contains('hidden')) {
      count += 1;
      localStorage.setItem('count-word-audio-game', `${count}`);
      const countWord = 20;
      if (count === countWord) {
        modalResultWindow?.classList.toggle('hidden');
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        window.removeEventListener('keydown', eventEnterKeyboard);
      } else {
        const word = words[count];
        new Audio(`${serverRequests.baseUrl}/${word.audio}`).play();
        audio.dataset.sound = `${word.audio}`;
        audioLineTop.dataset.sound = `${word.audio}`;
        audioLineMid.dataset.sound = `${word.audioMeaning}`;
        audioLineTopText.innerText = `${word.word} ${word.transcription}`;
        audioLineMidText.innerHTML = `${word.textMeaning}`;
        audioTranslate.innerText = `${word.textMeaningTranslate}`;
        image.setAttribute(
          'style',
          `background-image: url(${serverRequests.baseUrl}/${word.image});background-repeat: no-repeat;background-size: cover`,
        );
        btnKnow?.classList.toggle('hidden');
        btnNext?.classList.toggle('hidden');
        gameCard?.classList.toggle('hidden');
        audioBlock?.classList.toggle('hidden');
        correctButton?.setAttribute('style', 'background: #e9e9e9');
        const wrongButton = document.querySelectorAll("[data-answer='wrong']");
        wrongButton?.forEach((button) => button.setAttribute('style', 'background: #e9e9e9'));
        shuffleWordsGame(word.wordTranslate);
        answerSectionButton?.forEach((btn) => btn.removeAttribute('disabled'));
        window.addEventListener('keydown', eventKeyboard);
      }
    } else {
      count = Number(localStorage.getItem('count-word-audio-game'));
      const word = words[count];
      const date = await new Date();
      const day = await date.getDate();
      const correct = localStorage.getItem('lengthCorrectAnswer');
      const stat = localStorage.getItem('statistic');
      if (correct && stat) {
        const statUser = JSON.parse(stat);
        const cor: number = +(correct);
        if (statUser.optional[day].audioGame.winLength < cor) {
          statUser.optional[day].audioGame.winLength = cor;
          localStorage.setItem('statistic', JSON.stringify(statUser));
        }
        localStorage.setItem('lengthCorrectAnswer', '0');
      }
      if (userString) {
        saveUserWord(userString, word, true, 'audio');
      }
      document.querySelector(`.dot-${count}`)?.setAttribute('style', 'background: yellow');
      btnKnow?.classList.toggle('hidden');
      btnNext?.classList.toggle('hidden');
      gameCard?.classList.toggle('hidden');
      audioBlock?.classList.toggle('hidden');
      correctButton?.setAttribute('style', 'background: green');
      answerSectionButton?.forEach((btn) => btn.setAttribute('disabled', ''));
      if (modelContentNotKnow) {
        modelContentNotKnow.innerHTML += `<div class="result-answer-line">
        <div class="result-answer-line-image" data-sound="${word.audio}">${volume}</div>
         <span>${word.word}</span>
         <span>-</span>
         <span>${word.wordTranslate}</span>
        </div>`;
      }
      window.removeEventListener('keydown', eventKeyboard);
    }
  }
}

export function eventEnterKeyboard(event: KeyboardEvent) {
  const keyCode = event.key;
  switch (keyCode) {
    case 'Enter':
      checkNextButton();
      break;
    default:
      break;
  }
}
