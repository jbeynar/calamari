'use strict';

const Code = require('code');
const Lab = require('lab');
const Http = require('http-as-promised');
const Server = require('../../server');

const { describe, it, before, after } = exports.lab = Lab.script();
const { expect } = Code;

describe('HTTP API', () => {

    let server;
    let addr;

    before(async () => {
        server = await Server.deployment(true);
        addr = server.info.uri;
    });

    it('responds with 200 on POST /extractor', async () => {
        const task = {
            download: {
                url: 'http://www.tarnowiak.pl/'
            },
            map: {
                heading: '#header_counters strong:first-child'
            }
        };
        const query = { url: addr + '/extractor', body: JSON.stringify(task), error: false };
        await Http.post(query).spread((response) => {
            expect(response.statusCode).to.be.equal(200);
        });
    });

    after(async () => {
        await server.stop();
    });
});
