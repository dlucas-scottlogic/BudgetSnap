let loginProviderUrl;

const hostname = window && window.location && window.location.hostname;
const port = window.location.port;
const url = hostname + ':' + port;

if (url === 'localhost:2908') { // local iis
    loginProviderUrl = 'http://localhost:32782/Account/Login';
} else if (url === 'localhost:32781') { // docker container
    loginProviderUrl = 'http://localhost:32782/Account/Login';
}

export const LOGIN_URL = `${loginProviderUrl}`;