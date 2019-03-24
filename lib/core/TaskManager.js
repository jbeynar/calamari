'use strict';

const Extractor = require('./Extractor');
const Downloader = require('./Downloader');
const md5 = require('md5');

function execute(task) {
    return Downloader.download(task).then((document) => {
        return Extractor.extract(document.body, task).then((extracted) => {
            return {
                timestamp: (new Date()).getTime(),
                input: {
                    datastamp: md5(JSON.stringify(document.body)),
                    size: document.length,
                    code: document.code,
                    path: document.path
                },
                extraction: {
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
