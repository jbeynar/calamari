'use strict';

const TaskManager = require('../core/TaskManager.js');

module.exports = [{
    method: 'POST',
    path: '/extractor',
    options: {
        handler: async (request, h) => {
            const task = {
                hostname: 'tarnowiak.pl',
                path: '/',
                map: {
                    heading: '#header_counters strong:first-child'
                },
                process: function (data) {
                    return data;
                }
            };
            return TaskManager.execute(task).then(res => {
                console.log(res);
                return res;
            });
        }
    }
}];
