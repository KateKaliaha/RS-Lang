import './styles/index.scss';
import './controllers/controller';
import getListenerBurgerButton from './controllers/burgerController';
import './controllers/authController';
import './controllers/renderViewGameController';
import './controllers/authUserController';
import app from './controllers/appController';
import './controllers/gameSprintController';

app();

getListenerBurgerButton();
