import { IAggregatedWord } from '../types/interface';
import serverRequests from '../model/appModel';
import ServerRequests from '../model/requestServer';

export class WordCardView {
  serverRequests: ServerRequests;

  constructor() {
    this.serverRequests = serverRequests;
  }

  render = (word:IAggregatedWord) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data-word-id', `${word.id || word._id}`);
    card.innerHTML = `
      <img class="card-word-image" src="${this.serverRequests.baseUrl}/${word.image}" alt="${word.word.toLowerCase()}">
      <div class="card-content">
          <div class="card-word-wrapper">
              <div class="card-word">
                  <div class="word-wrapper">
                    <div class="card-word-heading">
                        <span class="word">${word.word}</span>
                        <span class="word-transcription">${word.transcription}</span>
                    </div>
                    <div class="card-word-translate-wrapper">
                        <span class="word-translate">${word.wordTranslate}</span>
                    </div>
                  </div>
                  <div class="audio-btn">
                    <audio class="word-audio" src="${this.serverRequests.baseUrl}/${word.audio}">
                    </audio>
                    <audio class="word-meaning-audio" src="${this.serverRequests.baseUrl}/${word.audioMeaning}">
                    </audio>
                    <audio class="word-example-audio" src="${this.serverRequests.baseUrl}/${word.audioExample}">
                    </audio>
                  </div>
              </div>
          </div>
          <div class="card-meaning-wrapper">
              <div class="word-meaning-text">
                  <div class="word-meaning">${word.textMeaning}</div>
                  <div class="word-meaning-translate">${word.textMeaningTranslate}</div>
              </div>
          </div>
          <div class="card-example-wrapper">
              <div class="word-example-text">
                  <div class="word-example">${word.textExample}</div>
                  <div class="word-example-translate">${word.textExampleTranslate}</div>
              </div>
          </div>
          <div class="progress hidden">
          <span>Correct:<span class="progress-correct">${word.userWord?.optional.correct}</span></span>
          <span>Wrong:<span class="progress-wrong">${word.userWord?.optional.wrong}</span></span>
          <span>Attempts:<span class="progress-attempts">${word.userWord?.optional.count}</span></span>
          </div>
          <div class="auth-users-btns auth-needed">
            <button class="difficult-btn" data-word-id=${word.id || word._id}>difficult</button>
            <button class="learned-btn" data-word-id=${word.id || word._id}>learned</button>
          </div>
      </div>
    `;

    const currentGroupBtn = document.querySelector(`.group-btn-${word.group + 1}`) as HTMLElement;
    const groupColor = window.getComputedStyle(currentGroupBtn).backgroundColor;

    card.style.borderRight = `5px solid ${groupColor}`;
    card.style.borderBottom = `5px solid ${groupColor}`;

    if (word.userWord && word.userWord.difficulty === 'hard') {
      card.style.borderTop = '5px solid rgb(255, 68, 43)';
      card.style.borderLeft = '5px solid rgb(255, 68, 43)';
    }

    if (word.userWord && word.userWord.difficulty === 'easy') {
      card.style.borderTop = '5px solid rgb(0, 204, 255)';
      card.style.borderLeft = '5px solid rgb(0, 204, 255)';
    }

    return card;
  };
}

export const wordCardView = new WordCardView();
