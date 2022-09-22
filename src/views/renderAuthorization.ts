export default function renderAuthWindow(): void {
  const authWrapper = document.createElement('div');
  authWrapper.className = 'auth-popup';
  const authModalWindow = `<div class="auth-popup-body header-in">
                            <div class="auth-popup-headers ">
                              <h3 class="popup-header-in header-active">Sing in</h3>
                              <h3 class="popup-header-register">Registration</h3>
                            </div>
                            <input class="popup-input name" type="text" id="name" placeholder="Enter your name">
                            <input class="popup-input email" type="email" id="email" placeholder="Enter your email">
                            <input class="popup-input password" type="password" id="password" placeholder="Enter your password" name="password">
                            <label>
                              <input type="checkbox" class="password-checkbox">
                              <span class="pseudo-checkbox">Show password</span>
                            </label>
                            <div class="message"></div>
                            <div class="popup-buttons">
                              <button class="popup-button button-in" disabled>Sing in</button>
                              <button class="popup-button button-out">Cancel</button>
                            </div>
                          </div>`;
  authWrapper.innerHTML = authModalWindow;
  (document.querySelector('body') as HTMLBodyElement).appendChild(authWrapper);
}
