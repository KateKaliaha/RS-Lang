import Chart from 'chart.js/auto';

const statMount = async (): Promise<void> => {
  const userStatString = localStorage.getItem('statistic');
  if (userStatString) {
    const arrayNewWords: number[] = [];
    const arrayLearnedWords: number[] = [];
    const daysMonth = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17',
      '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
    ];
    const userStat = await JSON.parse(userStatString);
    daysMonth.forEach((el) => {
      if (userStat.optional[+el]) {
        const newWord = userStat.optional[+el].audioGame.newWord
        + userStat.optional[+el].sprintGame.newWord;
        const learnedWord = userStat.optional[+el].learnedWordsDay.learned;
        arrayNewWords.push(newWord);
        arrayLearnedWords.push(learnedWord);
      } else {
        arrayNewWords.push(0);
        arrayLearnedWords.push(0);
      }
    });
    const c = document.getElementById('myChart') as HTMLCanvasElement;
    const cLearn = document.getElementById('myChartLearn') as HTMLCanvasElement;
    const ctx = c.getContext('2d');
    const ctxLearn = cLearn.getContext('2d');
    if (ctx) {
    // eslint-disable-next-line no-new
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: daysMonth,
          datasets: [{
            label: 'New words per day',
            data: arrayNewWords,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          }],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
    if (ctxLearn) {
    // eslint-disable-next-line no-new
      new Chart(ctxLearn, {
        type: 'bar',
        data: {
          labels: daysMonth,
          datasets: [{
            label: 'Learned words per day',
            data: arrayLearnedWords,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          }],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }
};

export default statMount;
