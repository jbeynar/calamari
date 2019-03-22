'use strict';

const Extractor = require('./Extractor');
const Downloader = require('./Downloader');

function execute(task) {
    return Downloader.download(task).then((body) => {
        return Extractor.extract(body, task);
    });
}

module.exports = {
    execute
};
