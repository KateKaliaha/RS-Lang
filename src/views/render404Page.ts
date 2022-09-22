const page404 = `<section class="page-404">
                            <div class="page-404-content">
                                <h2>404</h2>
                                <h5>Sorry we don't found this page!!!</h5>
                            </div>
                          </section>`;

export default function renderPage404() {
  const mainContainer = document.querySelector('.main') as HTMLDivElement;
  const namePage = document.querySelector('.name-page') as HTMLDivElement;
  namePage.innerHTML = 'page-404';
  mainContainer.innerHTML = page404;
}
