function gamesView() {
  const viewGamesPage = `<section class="game-wrapper">
                          <div class="wrapper-games">
                            <div class="game-card sprint">
                              <img class="game-img" src="./assets/img/sprint.jpeg" alt="Image sprint game">
                              <h2>Sprint</h2>
                              <div class="wrapper-img">
                                <img class="icon-timer" src="./assets/img/timer.svg"></img>
                              </div>
                            </div>
                            <div class="game-card audio" id="game-audio">
                              <img class="game-img" src="./assets/img/audio.jpeg" alt="Image audio game">
                              <h2>Audio game</h2>
                              <div class="wrapper-img">
                                <img class="icon-audio" src="./assets/img/sound.svg"></img>
                              </div>
                            </div>
                          </div>
                        </section>`;

  return viewGamesPage;
}

export default function renderPageGames() {
  const mainContainer = document.querySelector('.main') as HTMLDivElement;
  mainContainer.innerHTML = gamesView();
}
