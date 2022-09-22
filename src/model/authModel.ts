export default class Auth {
  validateEmailAddress(): boolean {
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const address = emailInput.value;
    const reg = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    if (reg.test(address) === false) {
      return false;
    }

    return true;
  }

  changeDisableEnterButton(value: boolean): void {
    const buttonEnter = document.querySelector('.button-in') as HTMLButtonElement;
    const authBody = document.querySelector('.auth-popup-body') as HTMLDivElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const nameInput = document.getElementById('name') as HTMLInputElement;
    const MIN_LENGTH_PASSWORD = 8;

    if (authBody.classList.contains('header-in')) {
      if (value && passwordInput.value.length >= MIN_LENGTH_PASSWORD) {
        buttonEnter.disabled = false;
      } else {
        buttonEnter.disabled = true;
      }
    } else if (authBody.classList.contains('header-register')) {
      if (value && passwordInput.value.length >= MIN_LENGTH_PASSWORD
         && nameInput.value.length !== 0) {
        buttonEnter.disabled = false;
      } else {
        buttonEnter.disabled = true;
      }
    }
  }

  addAndRemoveClassEl(el: HTMLElement, classNameDel: string, classNameAdd: string): void {
    el.classList.remove(classNameDel);
    el.classList.add(classNameAdd);
  }

  toggleClass(elAddClass: HTMLElement, elDelClass: HTMLElement, name:string): void {
    elAddClass.classList.add(name);
    elDelClass.classList.remove(name);
  }

  changeStylesAuthWindow(valueOpacity:string, valueVisibility: string): void {
    const authWrapper = document.querySelector('.auth-popup') as HTMLDivElement;
    authWrapper.style.opacity = valueOpacity;
    authWrapper.style.visibility = valueVisibility;
  }

  getImageAuth(): string {
    if (localStorage.getItem('auth') === 'true') {
      const src = './assets/img/authorization-out.svg';

      return src;
    }

    const src = './assets/img/authorization-in.svg';

    return src;
  }

  async changeImageAuth() {
    const imgAuth = document.querySelector('.authorization') as HTMLImageElement;

    if (localStorage.getItem('auth')) {
      imgAuth.src = this.getImageAuth();
    }

    imgAuth.src = this.getImageAuth();
  }

  getAuthNameUser(): string {
    if (localStorage.getItem('user')) {
      const user = JSON.parse((localStorage.getItem('user') as string));
      return user.name;
    }

    return '';
  }
}
