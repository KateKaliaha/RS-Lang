import { IGameStat, IStatistic } from '../types/interface';
import { check } from '../utils/icons';
import getPercent from '../model/statistics';

function pageStatisticsView() {
  const statistics = `<h1 class="header-statistics">Statistics for today</h1>
                      <div class="total-statistics-wrapper">
                        <div class="total-results-wrapper">
                        <div class="total-leranedWords">
                        <h2>0</h2>
                        <p>learned words</p>
                        </div>
                          <div class="total-words">
                            <h2>0</h2>
                            <p>new words</p>
                          </div>
                          <div class="total-percent">
                            <h2>0%</h2>
                            <p>correct answers</p>
                          </div>
                        </div>
                        <div class="statistic-game-wrapper">
                          <div class="statistic-game sprint">
                            <h3>Sprint</h3>
                            <div>${check} learned 0 word</div>
                            <div>${check} correct answers: 0</div>
                            <div> ${check} longest series of correct</div>
                            <div class="series"> answers: 0</div>
                          </div>
                          <div class="statistic-game audio">
                            <h3>Audio game</h3>
                            <div> ${check} learned 0 word</div>
                            <div> ${check} correct answers: 0</div>
                            <div> ${check} longest series of correct</div>
                            <div class="series"> answers: 0</div>
                          </div>
                      </div>`;

  return statistics;
}

export function renderPageStatistics(): void {
  const content = document.querySelector('.main') as HTMLElement;
  content.innerHTML = pageStatisticsView();
}

export function getStatisticsForRender():
[
  number, number, number, IGameStat, IGameStat, number, number,
] {
  const date = new Date();
  const day = date.getDate();
  const statistics: IStatistic = JSON.parse(localStorage.getItem('statistic') as string);

  const sumWrongAnswers = (statistics.optional[day].sprintGame.wrong as number)
  + (statistics.optional?.[day].audioGame.wrong as number);

  const sumCorrectAnswers = (statistics.optional[day].sprintGame.correct as number)
  + (statistics.optional[day].audioGame.correct as number);
  const newWordsPerDay = (statistics.optional[day].audioGame.newWord as number)
  + (statistics.optional[day].sprintGame.newWord as number);

  const commonPercent = getPercent(sumWrongAnswers, sumCorrectAnswers) === 0
  || getPercent(sumWrongAnswers, sumCorrectAnswers) === 100
    ? getPercent(sumWrongAnswers, sumCorrectAnswers)
    : Math.round(100 - ((sumWrongAnswers / sumCorrectAnswers) * 100));

  const audioPercent = getPercent(
    (statistics.optional?.[day].audioGame.wrong as number),
    (statistics.optional[day].audioGame.correct as number),
  ) === 0
    || getPercent(
      (statistics.optional?.[day].audioGame.wrong as number),
      (statistics.optional[day].audioGame.correct as number),
    ) === 100
    ? getPercent(
      (statistics.optional?.[day].audioGame.wrong as number),
      (statistics.optional[day].audioGame.correct as number),
    )
    : Math.round((
      (statistics.optional[day].audioGame.correct as number)
      / ((statistics.optional[day].audioGame.correct as number)
      + (statistics.optional?.[day].audioGame.wrong as number))) * 100);

  const sprintPercent = getPercent(
    (statistics.optional?.[day].sprintGame.wrong as number),
    (statistics.optional[day].sprintGame.correct as number),
  ) === 0
        || getPercent(
          (statistics.optional?.[day].sprintGame.wrong as number),
          (statistics.optional[day].sprintGame.correct as number),
        ) === 100
    ? getPercent(
      (statistics.optional?.[day].sprintGame.wrong as number),
      (statistics.optional[day].sprintGame.correct as number),
    )
    : Math.round((
      (statistics.optional[day].sprintGame.correct as number)
      / ((statistics.optional[day].sprintGame.correct as number)
      + (statistics.optional?.[day].sprintGame.wrong as number))) * 100);

  const dataStatistics: [number, number, number, IGameStat, IGameStat, number, number] = [
    +statistics.optional[day].learnedWordsDay.learned, newWordsPerDay, commonPercent,
    statistics.optional[day].sprintGame as IGameStat,
    statistics.optional[day].audioGame as IGameStat,
    sprintPercent, audioPercent,
  ];

  return dataStatistics;
}

export function userPageStatisticsView(
  arr: [number, number, number, IGameStat, IGameStat, number, number],
): string {
  const dayStatisticsView = `<h1 class="header-statistics">Statistics for today</h1>
                            <div class="total-statistics-wrapper">
                              <div class="total-results-wrapper">
                              <div class="total-leranedWords">
                              <h2>${arr[0]}</h2>
                              <p>learned words</p>
                              </div>
                                <div class="total-words">
                                  <h2>${arr[1]}</h2>
                                  <p>new words</p>
                                </div>
                                <div class="total-percent">
                                  <h2>${arr[2]}%</h2>
                                  <p>correct answers</p>
                                </div>
                              </div>
                              <div class="statistic-game-wrapper">
                                <div class="statistic-game sprint">
                                  <h3>Sprint</h3>
                                  <div>${check} new words: ${arr[3].newWord}</div>
                                  <div>${check} correct answers: ${arr[5]}%</div>
                                  <div> ${check} longest series of correct</div>
                                  <div class="series"> answers: ${arr[3].winLength}</div>
                                </div>
                                <div class="statistic-game audio">
                                  <h3>Audio game</h3>
                                  <div> ${check} new words: ${arr[4].newWord}</div>
                                  <div> ${check} correct answers: ${arr[6]}%</div>
                                  <div> ${check} longest series of correct</div>
                                  <div class="series"> answers: ${arr[4].winLength}</div>
                                </div>
                            </div>
                            <h1 class="header-statistics">Statistics for month</h1>
                            <div class="myChart">
                            <canvas id="myChart" style="width:100%;max-width:600px"></canvas>
                            </div>
                            <div class="myChartLearn">
                            <canvas id="myChartLearn" style="width:100%;max-width:600px"></canvas>
                            </div>
                            `;

  return dayStatisticsView;
}

export function renderUserPageStatistics(contentPage: string): void {
  const content = document.querySelector('.main') as HTMLElement;
  content.innerHTML = contentPage;
}
