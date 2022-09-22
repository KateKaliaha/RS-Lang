import { volume } from '../../utils/icons';

const htmlGamePageAudioCall = `
<div class="audio-game-header">
 <a href="#game-audio" class="audio-game-close" id="audio-game-return">
    <span class="audio-game-close_span"><</span>
 </a>
</div>

<div class="audio-game-content">
    <div class="game-dot">
        <span class="dot-0"></span>
        <span class="dot-1"></span>
        <span class="dot-2"></span>
        <span class="dot-3"></span>
        <span class="dot-4"></span>
        <span class="dot-5"></span>
        <span class="dot-6"></span>
        <span class="dot-7"></span>
        <span class="dot-8"></span>
        <span class="dot-9"></span>
        <span class="dot-10"></span>
        <span class="dot-11"></span>
        <span class="dot-12"></span>
        <span class="dot-13"></span>
        <span class="dot-14"></span>
        <span class="dot-15"></span>
        <span class="dot-16"></span>
        <span class="dot-17"></span>
        <span class="dot-18"></span>
        <span class="dot-19"></span>
    </div>
</div>
<div class="audio-game-sound">
    <div class="audio-game-sound__image" data-sound="files/16_0904.mp3">${volume}</div>
</div>
<div class="audio-game-card hidden">
        <div class="audio-game-card__image"></div>
        <div class="audio-game-card-info">
        <div class="audio-game-card-line-top">
            <div class="audio-game-card-line-top-image" data-sound="files/07_0724_example.mp3">${volume}</div>
            <p class="audio-game-card-line-top-text">pull [pull]</p>
        </div>
        <div class="audio-game-card-line-mid">
        <div class="audio-game-card-line-mid-image" data-sound="files/07_0732_meaning.mp3">${volume}</div>
        <p class="audio-game-card-line-mid-text">The children pull the rote</p>
        </div>
        <div class="audio-game-card-translate">Перевод</div>
    </div>
</div>
<div class="audio-game-button-words">
  <button id="game-button" data-answer="correct" class="audio-game-button-1">word_1</button>
  <button id="game-button" data-answer="wrong" class="audio-game-button-2">word_2</button>
  <button id="game-button" data-answer="wrong" class="audio-game-button-3">word_3</button>
  <button id="game-button" data-answer="wrong" class="audio-game-button-4">word_4</button>
  <button id="game-button" data-answer="wrong" class="audio-game-button-5">word_5</button>
</div>
<div class="audio-game-button-control">
  <button class="audio-game-button-know">НЕ ЗНАЮ</button>
  <button class="audio-game-button-next hidden">ДАЛЕЕ</button>
</div>
<div id="modal-window-audio-game" class="game-audio-modal-window hidden">
 <div class="game-audio-modal-content">
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
    <div class="modal-content-notknow">
    <h3>Don't know:</h3>
    </div>
   </div>
   <div class="modal-content-bottom">
   <button id="modal-close">Close</button>
  </div>
 </div>
</div>
`;

export default htmlGamePageAudioCall;
