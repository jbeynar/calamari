'use strict';

const Code = require('code');
const Lab = require('lab');
const Http = require('http-as-promised');
const Server = require('../server');

const { describe, it, before, after } = exports.lab = Lab.script();
const { expect } = Code;

describe('HTTP API', () => {

    let server;
    let addr;

    before(async () => {
        server = await Server.deployment(true);
        addr = server.info.uri;
    });

    it('/ responds with 404', async () => {
        await Http.get({ url: addr + '/', error: false }).spread((response) => {
            expect(response.statusCode).to.be.equal(404);
        });
    });

    after(async () => {
        await server.stop();
    });
});
