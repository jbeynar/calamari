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
                        'description': 'Invalid task definition'
                    }
                },
                payloadType: 'form'
            }
        },
        validate: {
            payload: {
                download: Joi.object().required().description('URL').default(JSON.stringify({ url: 'http://www.tarnowiak.pl/' })),
                map: Joi.object().required().description('Extraction spec.').default(JSON.stringify({ heading: '#header_counters strong:first-child' }))
            }
        },
        tags: ['api'],
        handler: async (request, h) => {
            const task = request.payload;
            return TaskManager.execute(task).catch(err => {
                throw Boom.preconditionFailed('Can not execute task. ' + err.toString());
            });
        }
    }
}];
