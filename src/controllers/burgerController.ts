export default function getListenerBurgerButton() {
  const burgerBtn = document.querySelector('.menu-burger') as HTMLButtonElement;
  const menu = document.querySelector('.hidden-menu') as HTMLDivElement;
  const wrapper = document.querySelector('.wrapper') as HTMLDivElement;

  burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.toggle('active');
    menu.classList.toggle('active');
    wrapper.classList.toggle('active');
  });
}
