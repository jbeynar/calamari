<p align="center">
  <a href="https://hapipal.com"><img src="https://raw.githubusercontent.com/jbeynar/calamari/master/icon.png" alt="hapi pal" width="200" /></a>
</p>
<h3 align="center">
  Pointer API
</h3>
<p align="center">A friendly, lightware web scrapper delivered as an HTTP API</p>
<p align="center">
  <img src="https://travis-ci.org/jbeynar/pointer.svg?branch=master">&nbsp;
  <img src='https://coveralls.io/repos/github/jbeynar/pointer/badge.svg?branch=master' alt='Coverage Status' />
</p>

## Setup

1. Get node 10.x (via nvm recommended)
2. npm install
3. npm run
4. Enjoy Extractor API

## Documentation
Swagger is avaliable:
http://localhost:3000/documentation

## Execute HTTP ETL task
POST `localhost:3000/extractor` with the following payload (task definition):
```
{
  "download":{
    "url": "http://example.com/"
  },
  "map": {
    "heading": "#header_counters strong:first-child"
  }
}
```

expect to returns:
```
{ timestamp: 1553293395534,
  input:
   { datastamp: 'f812d50186b3b892abc3a852f2fe1c5d',
     size: undefined,
     code: 200,
     path: '/' },
  result:
   {
     datastamp: '2b6fc1614e3893667d26497a329e7667',
     data: { heading: [25839] } 
   }
}
```
where `result.data` is the data extracted from HTTP response.

## Motivation

Open source lightware API inspired by larger project dc-server.

### WIP

./node_modules/.bin/lab -a code -l -L -r lcov | ./node_modules/.bin/coveralls
