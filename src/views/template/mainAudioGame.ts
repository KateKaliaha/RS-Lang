import { expand } from '../../utils/icons';

const htmlAudioGameMainPage = `<section class="audio-game-wrapper">
<div class="audio-game-header">
 <a href="#games" class="audio-game-close"><span class="audio-game-close_span">X</span></a>
 <div class="audio-game-header-right">
 <select name="audio-game-select" class="audio-game-select">
  <option value="0" selected>Level 1</option>
  <option value="1">Level 2</option>
  <option value="2">Level 3</option>
  <option value="3">Level 4</option>
  <option value="4">Level 5</option>
  <option value="5">Level 6</option>
 </select>
 <button class="fullscreen">${expand}</button>
 </div>
</div>
<div class="audio-game-content">
  <div class="audio-game-start-window">
   <h2>Game Audio Call</h2>
   <p>
   Choose from the suggested answers the correct translation of the word you hear
   </p>
   <p>
   To play with the keyboard,<br> 
   use the keys 1, 2, 3, 4, 5 - to answer,<br>
   space - to play sound,<br>
   enter - to skip the question,
   </p>
   <button class="audio-game-start-button">Start</button>
  </div>
</div>
</section>`;

export default htmlAudioGameMainPage;
