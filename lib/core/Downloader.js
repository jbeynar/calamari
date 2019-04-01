'use strict';

const _ = require('lodash');
const Http = require('http-as-promised');
const UrlInfo = require('url');

const defaults = {
    method: 'GET',
    timeout: 10000
};

function download(task) {
    const config = _.get(task, 'download');
    const requestConfig = {
        uri: config.url,
        method: _.get(config, 'method', defaults.method),
        timeout: _.get(config, 'timeout', defaults.timeout)
    };
    if (!_.isEmpty(config.payload)) {
        requestConfig.formData = config.payload;
    }
    if (!_.isEmpty(config.headers)) {
        requestConfig.headers = task.options.headers;
    }
    return Http(requestConfig).spread((response, body) => {
        const info = UrlInfo.parse(config.url);
        const document = {
            type: response['content-type'],
            url: config.url,
            host: info.hostname,
            path: info.pathname,
            query: info.query,
            code: response.statusCode,
            headers: JSON.stringify(response.headers),
            body,
            length: body.length
        };
        return document;
    });
}

module.exports = {
    download
};
