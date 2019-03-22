# Calamari

## Setup
1. Get node 10.x (via nvm recommended)
2. npm install
3. npm run
4. Enjoy Extractor API

## Execute HTTP ETL task
POST localhost:3000 with the following payload (task definition):
```
{
  "hostname": "example.com",
  "path": "/",
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
   { datastamp: '2b6fc1614e3893667d26497a329e7667',
     data: { heading: [25839] } } }
```
where `result.data` is a structure extracted from HTML.

## Motivation

Open source lightware API inspired by larger private project: dc-server.
