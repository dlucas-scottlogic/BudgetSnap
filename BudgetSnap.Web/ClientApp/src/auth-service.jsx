import { makeUserManager } from 'react-oidc'
import { AuthSettings } from './login-config';

class AuthService {

    constructor() {
        var authSettings = AuthSettings;
        this.userManager = makeUserManager(authSettings);
    }

    login(callback) {
        this.userManager.signinRedirect();
    }

    logout(callback) {
        this.userManager.signoutRedirect();
        callback();
    }

    async isAuthenticated() {
        var user = await this.userManager.getUser();
        if (user) {
            return true;
        }
        else {
            return false;
        }        
    }

    async getUser() {
        return this.userManager.getUser();
    }

}

export default new AuthService();