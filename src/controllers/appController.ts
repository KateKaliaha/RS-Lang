import { auth } from '../model/appModel';
import getNamePage from '../model/pageModal';
import renderApp from '../views/renderMenu';
import hashPageRoute from './hashPageRoute';

export default function app() {
  renderApp(getNamePage(), auth.getImageAuth(), auth.getAuthNameUser());
  hashPageRoute();
}
