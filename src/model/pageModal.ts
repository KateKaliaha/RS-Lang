import { auth } from './appModel';

export default function getNamePage(): string {
  const { hash } = document.location;
  const namePageApp = hash.trim().split('#').splice(1).join('');

  return namePageApp.slice(0, 1).toUpperCase() + namePageApp.slice(1, namePageApp.length);
}

export function checkTimeUser() {
  const date = new Date();
  const time = date.getHours();
  const hours = localStorage.getItem('hours');
  if (hours) {
    if (+hours < time) {
      localStorage.removeItem('auth');
      localStorage.remove('hours');
      const userAuthName = document.querySelector('.name-user') as HTMLSpanElement;
      userAuthName.innerHTML = '';
      auth.changeImageAuth();
      localStorage.removeItem('user');
      auth.changeStylesAuthWindow('0', 'hidden');
      window.location.reload();
    }
  }
}
