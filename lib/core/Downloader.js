'use strict';

const http = require('http');

function download(task) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: task.hostname,
            port: 80,
            path: task.path,
            agent: false // new http.Agent({keepAlive: true})
        };

        function onResponseCallback(response) {
            const log = [response.statusCode, response.req.path];
            const chunks = [];

            response.on('data', (chunk) => {
                chunks.push(chunk);
            });

            response.on('end', () => {
                const body = chunks.join();
                log.push(body.length + 'b');
                const logMsg = log.join(' ');
                console.log(logMsg);
                return resolve(body);
            });
        }

        const req = http.request(options, onResponseCallback);
        req.on('error', (err) => {
            console.error(`problem with request: ${err.message}`);
            reject();
        });
        req.end();
    });
}

module.exports = {
    download
};
