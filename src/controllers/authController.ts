import { auth } from '../model/appModel';

document.addEventListener('click', (event:Event): void => {
  const popupHeaderSign = document.querySelector('.popup-header-in') as HTMLButtonElement;
  const popupHeaderRegister = document.querySelector('.popup-header-register') as HTMLButtonElement;
  const inputName = document.getElementById('name') as HTMLInputElement;
  const buttonEnter = document.querySelector('.button-in') as HTMLButtonElement;
  const authBody = document.querySelector('.auth-popup-body') as HTMLDivElement;
  const html = document.querySelector('html') as HTMLHtmlElement;

  if ((event.target as HTMLButtonElement).classList.contains('popup-header-in')) {
    auth.addAndRemoveClassEl(authBody, 'header-register', 'header-in');
    auth.toggleClass(popupHeaderSign, popupHeaderRegister, 'header-active');
    inputName.style.display = 'none';
    buttonEnter.innerHTML = 'Sign in';
  } else if ((event.target as HTMLButtonElement).classList.contains('popup-header-register')) {
    auth.addAndRemoveClassEl(authBody, 'header-in', 'header-register');
    auth.toggleClass(popupHeaderRegister, popupHeaderSign, 'header-active');
    inputName.style.display = 'block';
    buttonEnter.innerHTML = 'Register';
  }

  if ((event.target as HTMLInputElement).classList.contains('password-checkbox')) {
    if ((event.target as HTMLInputElement).checked) {
      (document.querySelector('.password') as HTMLInputElement).type = 'text';
    } else {
      (document.querySelector('.password') as HTMLInputElement).type = 'password';
    }
  }

  if ((event.target as HTMLButtonElement).classList.contains('button-out')) {
    auth.changeStylesAuthWindow('0', 'hidden');
    html.style.overflowY = '';
  }

  if ((event.target as HTMLButtonElement).classList.contains('authorization')) {
    auth.changeStylesAuthWindow('1', 'visible');
    html.style.overflowY = 'hidden';
  }

  auth.changeDisableEnterButton(auth.validateEmailAddress());
});

document.addEventListener('input', (event:Event): void => {
  const passwordInput = document.getElementById('password') as HTMLInputElement;
  const emailInput = document.getElementById('email') as HTMLInputElement;

  if ((event.target as HTMLInputElement).classList.contains('email')) {
    auth.validateEmailAddress();
    if (!auth.validateEmailAddress()) {
      emailInput.classList.add('error');
    } else {
      emailInput.classList.remove('error');
    }
  }

  if ((event.target as HTMLInputElement).classList.contains('password')) {
    if (passwordInput.value.length >= 8) {
      passwordInput.classList.remove('error');
    } else {
      passwordInput.classList.add('error');
    }
  }

  auth.changeDisableEnterButton(auth.validateEmailAddress());
});
