import htmlAudioGameMainPage from './template/mainAudioGame';

const drawAudioGame = () => {
  const content = document.querySelector('.main') as HTMLElement;
  const namePage = document.querySelector('.name-page') as HTMLElement;
  namePage.textContent = 'Audio Game';
  content.innerHTML = htmlAudioGameMainPage;
};

export default drawAudioGame;
