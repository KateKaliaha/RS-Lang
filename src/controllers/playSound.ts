const playSound = (elementWrapper: HTMLElement, serverPath: string): void => {
  elementWrapper.addEventListener('click', (event: Event) => {
    const element = event.target as HTMLElement;
    const soundElement = element.closest('[data-sound]') as HTMLElement;
    if (soundElement) {
      const url = soundElement.dataset.sound;
      new Audio(`${serverPath}/${url}`).play();
    }
  }, true);
};
export default playSound;
