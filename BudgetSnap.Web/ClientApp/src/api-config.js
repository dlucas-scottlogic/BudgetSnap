let backendHost;

const hostname = window && window.location && window.location.hostname;
const port = window.location.port;
const url = hostname + ':' + port;

if (url === 'localhost:2908') { // local iis
    backendHost = 'http://localhost:32780';
} else if (url === 'localhost:32781') { // docker container
    backendHost = 'http://localhost:32780';
} else {
    backendHost = hostname;
}

export const API_ROOT = `${backendHost}`;