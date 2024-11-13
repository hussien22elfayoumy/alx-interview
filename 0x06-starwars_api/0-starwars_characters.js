#!/usr/bin/node

const request = require('request');
// prettier-ignore
request('https://swapi-api.hbtn.io/api/films/' + process.argv[2], function (err, body) {
  if (err) throw err;
  const actors = JSON.parse(body).characters;
  exactOrder(actors, 0);
});
// prettier-ignore
const exactOrder = (actors, x) => {
  if (x === actors.length) return;
  request(actors[x], function (err, body) {
    if (err) throw err;
    console.log(JSON.parse(body).name);
    exactOrder(actors, x + 1);
  });
};
