'use strict';

const TaskManager = require('../core/TaskManager.js');
const Joi = require('joi');
const Boom = require('boom');


module.exports = [{
    method: 'POST',
    path: '/extractor',
    options: {
        plugins: {
            'hapi-swagger': {
                responses: {
                    '412': {
                        'description': 'Invalid input'
                    }
                },
                payloadType: 'form'
            }
        },
        validate: {
            payload: {
                hostname: Joi.string().required().description('URL hostname').default('tarnowiak.pl'),
                path: Joi.string().required().description('URL path').default('/'),
                map: Joi.object().default(JSON.stringify({ heading: '#header_counters strong:first-child' })),
                process: Joi.string()
            }
        },
        tags: ['api'],
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
            }).catch((err) => {
                throw Boom.preconditionFailed(err);
            });
        }
    }
}];
