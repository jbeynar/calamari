'use strict';

const Extractor = require('./Extractor');
const Downloader = require('./Downloader');
const md5 = require('md5');

function execute(task) {
    return Downloader.download(task).then((body) => {
        return Extractor.extract(body.contents, task).then((extracted) => {
            return {
                timestamp: (new Date()).getTime(),
                input: {
                    datastamp: md5(JSON.stringify(body.contents)),
                    size: body.length,
                    code: body.code,
                    path: body.path
                },
                result: {
                    datastamp: md5(JSON.stringify(extracted)),
                    data: extracted
                }
            };
        });
    });
}

module.exports = {
    execute
};
