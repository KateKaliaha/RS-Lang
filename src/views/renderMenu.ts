import renderAuthWindow from './renderAuthorization';

function renderHeader(namePage: string, pathImageAuth: string, userName: string): string {
  const header = `<div class="name-page">${namePage}</div>
                  <div>
                    <span class="name-user">${userName}</span>
                    <img class="authorization" src=${pathImageAuth} alt="Image for authorization">
                  </div>`;

  return header;
}

function renderBurgerMenu(): string {
  const burger = `<menu class="menu">
                    <div class="menu-burger">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <nav class="nav">
                      <ul>
                        <li>
                          <img class="nav-home menu-home" src="./assets/img/home.svg" alt="Home image">
                        </li>
                        <li>
                          <img class="nav-book menu-book" src="./assets/img/book.svg" alt="Textbook image">
                        </li>
                        <li>
                          <img class="nav-games menu-games" src="./assets/img/games.svg" alt="Game image">
                        </li>
                        <li>
                          <img class="nav-statistics menu-statistics" src="./assets/img/statistic.svg" alt="Graphic image">
                        </li>
                      </ul>
                    <nav>
                  </menu>
                  <div class="hidden-menu">
                    <div class="logo">RS Lang</div>
                    <ul>
                      <li class="menu-item menu-home">Main</li>
                      <li class="menu-item menu-book">Textbook</li>
                      <li class="menu-item menu-games">Minigames</li>
                      <li class="menu-item menu-statistics">Statistics</li>
                    </ul>
                  </div>`;

  return burger;
}

export function renderMainContent(): string {
  const main = `<section class="section-about">
                  <div class="about-text">
                    <h1>RS Lang</h1>
                    <p>Great free word learning app for people with any language level.</p>
                    <p>RS Lang makes learning easy, fast and fun.</p>
                  </div>
                  <div class="img">
                    <img class="about-img" src="./assets/img/main-picture.png">
                  </div>
                </section>

                <section class="section-advantages">
                  <h2>Our advantages</h2>
                  <div class="wrapper-advantages">
                    <div class="advantage">
                      <img class="advantage-img" id="advantage-img" src="./assets/img/book-advantage.jpeg">
                      <div>
                        <h3>Textbook</h3>
                        <p class="advantage-text"> Over 3,500 words to learn, divided into 
                        subgroups based on difficulty</p>
                      </div>
                    </div>
                    <div class="advantage">
                      <img class="advantage-img" src="./assets/img/words-advantage.jpeg">
                      <div>
                        <h3>Vocabulary</h3>
                        <p class="advantage-text">Mark difficult words
                        and learn them separately</p>
                      </div>
                    </div>
                    <div class="advantage">
                      <img class="advantage-img" src="./assets/img/game-advantage.webp">
                      <div>
                        <h3>Games</h3>
                        <p class="advantage-text">2 exciting word learning games</p>
                      </div>
                    </div>
                    <div class="advantage">
                      <img class="advantage-img" src="./assets/img/statistic-advantage.jpeg">
                      <div>
                        <h3>Statistic</h3>
                        <p class="advantage-text">Track your progress in statistics,
                        set new goals and achieve them</p>
                      </div>
                    </div>
                  </div>
                </section>

                <section class="section-about-team">
                  <h2>Our team</h2>
                  <div class="about-team-wrapper">
                    <div class="team-member">
                      <img src="./assets/img/avatar-vi.jpeg">
                      <h3>Victor</h3>
                      <div class="about-member-text">
                        <h4>Curator</h4>
                        <p>Contribution: knows the answers to all questions, 
                        carefully reads all the code,</br> gives very valuable advice, 
                        changes our code for the better!
                        </p>
                      </div>
                    </div>
                    <div class="team-member">
                      <img src="./assets/img/avatar-m.jpeg">
                      <h3>Maksim</h3>
                      <div class="about-member-text">
                        <h4>Team lead, front-end developer </h4>
                        <p>Contribution: Designed the application architecture and
                        led the team. </br>Developed an electronic textbook and word cards.
                        </p>
                      </div>
                    </div>
                    <div class="team-member">
                      <img src="./assets/img/avatar-k.jpeg">
                      <h3>Katherina</h3>
                      <div class="about-member-text">
                        <h4>Front-end developer </h4>
                        <p>Сontribution: designed the application view, 
                        set up authentication, </br>developed the sprint game, 
                        saving new words and statistics.
                        </p>
                      </div>
                    </div>
                    <div class="team-member">
                      <img src="./assets/img/avatar-v.jpeg">
                      <h3>Vitaly</h3>
                      <div class="about-member-text">
                        <h4>Front-end developer </h4>
                        <p>Contribution: wrote all requests to the server, 
                        developed the audio game, <br>saving new words and statistics.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>`;

  return main;
}

function renderFooter(): string {
  const footer = `<div class="footer-container">
                    <p class="footer-year">2022</p>
                    <p class="footer-link">
                      <a class="github-link" href="https://github.com/zhybuliou" target="_blank">Vitali Zhybuliou</a>
                    </p>
                    <p class="footer-link">
                      <a class="github-link" href="https://github.com/katekaliaha" target="_blank">Katherina Kaliaha</a>
                    </p>
                    <p class="footer-link">
                      <a class="github-link" href="https://github.com/maksimizer" target="_blank">Maksim Orlov</a>
                    </p>
                    <p class = "footer-logo">
                      <a class="rss-logo" href="https://rs.school/js/" target="_blank">
                        <img src="./assets/img/rss.svg" class="footer-img img-rss" alt="Logo RS School">
                      </a>
                    </p>
                  </div>`;

  return footer;
}

export default function renderApp(namePage: string, pathImageAuth: string, userName: string): void {
  document.location.hash = 'main';
  (document.querySelector('body') as HTMLBodyElement).innerHTML = `${renderBurgerMenu()}
                                                                  <div class="wrapper">
                                                                    <header class="header">${renderHeader(namePage, pathImageAuth, userName)}
                                                                    </header>
                                                                    <main class="main"> ${renderMainContent()}
                                                                    </main>
                                                                    <footer class="footer">${renderFooter()}
                                                                    </footer>
                                                                  </div>`;

  renderAuthWindow();
}
