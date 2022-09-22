import ServerRequests from './requestServer';
import Auth from './authModel';

const serverRequests = new ServerRequests();
export const auth = new Auth();

export default serverRequests;
