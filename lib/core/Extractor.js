'use strict';

const _ = require('lodash');
const cheerio = require('cheerio');
const md5 = require('md5');

function extract(body, extractionTask) {
    const metadata = {};
    return new Promise((resolve, reject) => {
        let $;

        if (_.isEmpty(body)) {
            console.log('Empty extraction source body');
            return resolve();
        }

        function extractOnce($scope, def, key) {

            const selector = _.isString(def) ? def : def.selector;
            const elements = $scope.find(selector);

            const res = _.map(elements, (element) => {
                element = $(element);
                let value;
                if (_.isString(def.type) && def.type === 'html') {
                    value = (element.html() || '').replace(/\s/g, '');
                }
                else {
                    // TODO needs to refactor else case - should be map from type
                    value = def.attribute ? element.attr(def.attribute) : element.text();
                }

                if (_.isFunction(def.process)) {
                    try {
                        value = def.process(value, element);
                    } catch (err) {
                        console.error('Process function fails at `' + key + '` cause:', err);
                    }
                }
                else if (_.isString(def.process) && _.isString(value)) {
                    try {
                        value = _.head(value.match(new RegExp(def.process)));
                    } catch (err) {
                        console.error('Process regular expression string fails at `' + key, '` cause:', err);
                    }
                }
                else if (_.isRegExp(def.process) && _.isString(value)) {
                    try {
                        value = _.head(value.match(def.process));
                    } catch (err) {
                        console.error('Process regular expression fails at `' + key, '` cause:', err);
                    }
                }

                return value;
            });

            return def.singular ? _.first(res) : res;
        }

        function extractAll($scope, map) {
            const extracted = _.chain(map).keys().zipObject().value() || {};
            _.forEach(map, (def, key) => {
                const extractedValue = extractOnce($scope, def, key);
                extracted[key] = extractedValue !== null ? extractedValue : def.default;
            });

            return extracted;
        }

        if (_.isEmpty(extractionTask.map)) {
            try {
                resolve(JSON.parse(body));
            } catch (err) {
                console.error('Extractor was trying to save raw json cause map was not specified');
                console.error(err);
                reject(err);
            }
        }
        else {
            $ = cheerio.load(body);
            metadata.title = $('title').text();
            metadata.author = $('meta[name=\'author\']').attr('content');
            if (extractionTask.scope) {
                resolve(_.map($(extractionTask.scope), (scope) => extractAll($(scope), extractionTask.map)));
            }
            else {
                resolve(extractAll($('html'), extractionTask.map));
            }
        }
    }).then((extracted) => {
        if (_.isFunction(extractionTask.process)) {
            return extractionTask.process(extracted, body, metadata);
        }

        return extracted;
    });
}

module.exports = {
    extract
};
