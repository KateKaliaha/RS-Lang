import { IWord } from '../types/interface';

const shuffleWordsGame = (correctWord: string): void => {
  let wordArray: string[] = [];
  const wordsString = localStorage.getItem('audio-game-words');
  if (wordsString) {
    const words = JSON.parse(wordsString);
    words.forEach((card: IWord) => {
      if (card.wordTranslate !== correctWord) {
        wordArray.push(card.wordTranslate);
      }
    });
  }
  const wrongButton = document.querySelectorAll("[data-answer='wrong']");
  const correctButton = document.querySelector("[data-answer='correct']") as HTMLElement;
  correctButton.innerText = correctWord;

  wrongButton.forEach((button) => {
    const newButton = button;
    newButton.textContent = wordArray[Math.floor(Math.random() * wordArray.length)];
    wordArray = wordArray.filter((word) => word !== newButton.textContent);
    return newButton;
  });
  const diver = document.querySelector('.audio-game-button-words') as Node;
  const allButton = document.querySelectorAll('#game-button');
  for (let i = allButton.length; i >= 0; i -= 1) {
    // eslint-disable-next-line no-bitwise
    diver.appendChild(allButton[Math.random() * i | 0]);
  }
};

export default shuffleWordsGame;
