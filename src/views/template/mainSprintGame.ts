import { expand } from '../../utils/icons';

const htmlSprintGameMainPage = `<section class="sprint-game-wrapper">
                                  <div class="sprint-game-header">
                                    <a href="#games" class="sprint-game-close">
                                      <span class="sprint-game-close_span">X</span>
                                    </a>
                                    <div class="sprint-game-header-right">
                                      <select name="sprint-game-select" class="sprint-game-select">
                                        <option value="1" selected>Level 1</option>
                                        <option value="2">Level 2</option>
                                        <option value="3">Level 3</option>
                                        <option value="4">Level 4</option>
                                        <option value="5">Level 5</option>
                                        <option value="6">Level 6</option>
                                      </select>
                                      <button class="fullscreen">${expand}</button>
                                    </div>
                                  </div>
                                  <div class="sprint-game-content">
                                    <div class="sprint-game-start-window">
                                      <h2>Game Sprint Call</h2>
                                        <p> Trains the skill of quick translation from English into Russian.
                                            You need to choose whether the translation matches the suggested word.
                                        </p>
                                        <button class="sprint-game-start-button">Start</button>
                                    </div>
                                  </div>
                                </section>`;

export default htmlSprintGameMainPage;
