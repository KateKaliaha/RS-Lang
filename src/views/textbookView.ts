export class TextbookView {
  render() {
    const main = document.querySelector('.main');
    if (main) main.innerHTML = '';

    const textBook = document.createElement('div');
    textBook.classList.add('textbook-container');
    textBook.innerHTML = `
      <div class="textbook-games">
        <div class="textbook-game-container" id="textbook-game-sprint">
            <img src="./assets/img/sprint.jpeg" alt="sprint-game-icon">
            <p>Sprint</p>
        </div>
        <div class="textbook-game-container" id="textbook-game-audio">
            <img src="./assets/img/audio.jpeg" alt="audio-game-icon">
            <p>Audio game</p>
        </div>
      </div>
        <div class="groups-container">
          <div class="groups-btns">
            <div class="group-btn group-btn-1" data-group="1">Level 1</div>
            <div class="group-btn group-btn-2" data-group="2">Level 2</div>
            <div class="group-btn group-btn-3" data-group="3">Level 3</div>
            <div class="group-btn group-btn-4" data-group="4">Level 4</div>
            <div class="group-btn group-btn-5" data-group="5">Level 5</div>
            <div class="group-btn group-btn-6" data-group="6">Level 6</div>
            <div class="group-btn difficult-group-btn auth-needed" data-group="7">Difficult</div>
          </div>
      </div>
      <div class="pagination-container">
            <div class="pagination-btns">
              <div class="pagination-btn pagination-btn-first"><<</div>
              <div class="pagination-btn pagination-btn-prev"><</div>
              <div class="current-page"></div>
              <div class="pagination-btn pagination-btn-next">></div>
              <div class="pagination-btn pagination-btn-last">>></div>
            </div>
      </div>
      <div class="cards-container"></div>
      <div class="pagination-container">
            <div class="pagination-btns">
              <div class="pagination-btn pagination-btn-first"><<</div>
              <div class="pagination-btn pagination-btn-prev"><</div>
              <div class="current-page"></div>
              <div class="pagination-btn pagination-btn-next">></div>
              <div class="pagination-btn pagination-btn-last">>></div>
            </div>
      </div>
    `;

    if (main) main.appendChild(textBook);
  }
}

export const textbookView = new TextbookView();
