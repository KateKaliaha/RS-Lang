import serverRequests from '../model/appModel';
import changeHashPage from '../model/hashPage';
import { volume } from '../utils/icons';
import { eventKeyboard, eventEnterKeyboard } from './keyboardAudioGame';
import saveUserWord from './saveUserWord';
import shuffleWordsGame from './shuffleWordsAudioGame';

const logicAudioGame = async (): Promise<void> => {
  const audio = document.querySelector('.audio-game-sound__image') as HTMLElement;
  const audioLineTop = document.querySelector('.audio-game-card-line-top-image') as HTMLElement;
  const audioLineMid = document.querySelector('.audio-game-card-line-mid-image') as HTMLElement;
  const gameCard = document.querySelector('.audio-game-card') as HTMLElement;
  const audioBlock = document.querySelector('.audio-game-sound') as HTMLElement;
  const btnNext = document.querySelector('.audio-game-button-next') as HTMLElement;
  const btnKnow = document.querySelector('.audio-game-button-know') as HTMLElement;
  const image = document.querySelector('.audio-game-card__image') as HTMLElement;
  const audioLineTopText = document.querySelector('.audio-game-card-line-top-text') as HTMLElement;
  const audioLineMidText = document.querySelector('.audio-game-card-line-mid-text') as HTMLElement;
  const audioTranslate = document.querySelector('.audio-game-card-translate') as HTMLElement;
  const correctButton = document.querySelector("[data-answer='correct']") as HTMLButtonElement;
  const answerSection = document.querySelector('.audio-game-button-words') as HTMLElement;
  const answerSectionButton = document.querySelectorAll('#game-button') as NodeListOf<Element>;
  const modalResultWindow = document.querySelector('.game-audio-modal-window') as HTMLElement;
  const modelContentNotKnow = document.querySelector('.modal-content-notknow') as HTMLElement;
  const modelContentWrong = document.querySelector('.modal-content-wrong') as HTMLElement;
  const modelContentCorrect = document.querySelector('.modal-content-correct') as HTMLElement;
  const userString = localStorage.getItem('user');
  const wordsString = localStorage.getItem('audio-game-words');

  if (wordsString) {
    let count = 0;
    localStorage.setItem('count-word-audio-game', `${count}`);
    const words = await JSON.parse(wordsString);
    const startWord = words[count];
    new Audio(`${serverRequests.baseUrl}/${startWord.audio}`).play();
    audio.dataset.sound = `${startWord.audio}`;
    audioLineTop.dataset.sound = `${startWord.audio}`;
    audioLineMid.dataset.sound = `${startWord.audioMeaning}`;
    audioLineTopText.innerText = `${startWord.word} ${startWord.transcription}`;
    audioLineMidText.innerHTML = `${startWord.textMeaning}`;
    audioTranslate.innerText = `${startWord.textMeaningTranslate}`;
    image.setAttribute(
      'style',
      `background-image: url(${serverRequests.baseUrl}/${startWord.image});background-repeat: no-repeat;background-size: cover`,
    );

    shuffleWordsGame(startWord.wordTranslate);

    btnNext?.addEventListener('click', async () => {
      count = Number(localStorage.getItem('count-word-audio-game'));
      count += 1;
      localStorage.setItem('count-word-audio-game', `${count}`);
      const countWord = 20;
      if (count === countWord) {
        modalResultWindow.classList.toggle('hidden');
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
        btnKnow.classList.toggle('hidden');
        btnNext.classList.toggle('hidden');
        gameCard.classList.toggle('hidden');
        audioBlock.classList.toggle('hidden');
        correctButton.setAttribute('style', 'background: #e9e9e9');
        const wrongButton = document.querySelectorAll("[data-answer='wrong']");
        wrongButton.forEach((button) => button.setAttribute('style', 'background: #e9e9e9'));
        shuffleWordsGame(word.wordTranslate);
        answerSectionButton.forEach((btn) => btn.removeAttribute('disabled'));
      }
      window.addEventListener('keydown', eventKeyboard);
    }, true);

    btnKnow?.addEventListener('click', async () => {
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
      count = Number(localStorage.getItem('count-word-audio-game'));
      const word = words[count];
      if (userString) {
        saveUserWord(userString, word, true, 'audio');
      }
      document.querySelector(`.dot-${count}`)?.setAttribute('style', 'background: yellow');
      btnKnow.classList.toggle('hidden');
      btnNext.classList.toggle('hidden');
      gameCard.classList.toggle('hidden');
      audioBlock.classList.toggle('hidden');
      correctButton.setAttribute('style', 'background: green');
      answerSectionButton.forEach((btn) => btn.setAttribute('disabled', ''));
      modelContentNotKnow.innerHTML += `<div class="result-answer-line">
      <div class="result-answer-line-image" data-sound="${word.audio}">${volume}</div>
       <span>${word.word}</span>
       <span>-</span>
       <span>${word.wordTranslate}</span>
      </div>`;
      window.removeEventListener('keydown', eventKeyboard);
    }, true);

    answerSection.addEventListener('click', async (event: Event) => {
      const button = event.target as HTMLElement;
      count = Number(localStorage.getItem('count-word-audio-game'));
      const word = words[count];
      if (button.dataset.answer === 'wrong') {
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
        btnKnow.classList.toggle('hidden');
        btnNext.classList.toggle('hidden');
        gameCard.classList.toggle('hidden');
        audioBlock.classList.toggle('hidden');
        correctButton.setAttribute('style', 'background: green');
        button.setAttribute('style', 'background: red');
        answerSectionButton.forEach((btn) => btn.setAttribute('disabled', ''));
        modelContentWrong.innerHTML += `<div class="result-answer-line-wrong">
      <div class="result-answer-line-image" data-sound="${word.audio}">${volume}</div>
       <span>${word.word}</span>
       <span>-</span>
       <span>${word.wordTranslate}</span>
      </div>`;
        window.removeEventListener('keydown', eventKeyboard);
      }
      if (button.dataset.answer === 'correct') {
        const obj = localStorage.getItem('lengthCorrectAnswer');
        if (obj) {
          const cor: number = +(obj);
          localStorage.setItem('lengthCorrectAnswer', `${+cor + 1}`);
        }
        if (userString) {
          saveUserWord(userString, word, false, 'audio');
        }
        document.querySelector(`.dot-${count}`)?.setAttribute('style', 'background: green');
        btnKnow.classList.toggle('hidden');
        btnNext.classList.toggle('hidden');
        gameCard.classList.toggle('hidden');
        audioBlock.classList.toggle('hidden');
        correctButton.setAttribute('style', 'background: green');
        answerSectionButton.forEach((btn) => btn.setAttribute('disabled', ''));
        modelContentCorrect.innerHTML += `<div class="result-answer-line-correct">
        <div class="result-answer-line-image" data-sound="${word.audio}">${volume}</div>
         <span>${word.word}</span>
         <span>-</span>
         <span>${word.wordTranslate}</span>
        </div>`;
        window.removeEventListener('keydown', eventKeyboard);
      }
    });

    modalResultWindow.addEventListener('click', (event: Event) => {
      const element = event.target as HTMLElement;
      if (element.id === 'modal-close') {
        modalResultWindow.classList.toggle('hidden');
        window.removeEventListener('keydown', eventKeyboard);
        changeHashPage('game-audio');
        window.removeEventListener('keydown', eventEnterKeyboard);
      } else if (element.id === 'modal-window-audio-game') {
        modalResultWindow.classList.toggle('hidden');
        window.removeEventListener('keydown', eventKeyboard);
        changeHashPage('game-audio');
        window.removeEventListener('keydown', eventEnterKeyboard);
      }
    }, true);
    window.addEventListener('keydown', eventKeyboard);
    window.addEventListener('keydown', eventEnterKeyboard);
  }
};

export default logicAudioGame;
