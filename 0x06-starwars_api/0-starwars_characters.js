#!/usr/bin/node

const request = require('request');

if (process.argv.length !== 3) {
  console.log('Usage: node script.js <Movie ID>');
  process.exit(1);
}

const movieId = process.argv[2];
const baseUrl = 'https://swapi.dev/api/films/';

request(`${baseUrl}${movieId}/`, (error, response, body) => {
  if (error) {
    console.error(`Error fetching data: ${error}`);
    process.exit(1);
  }

  if (response.statusCode !== 200) {
    console.error(`Failed to fetch data: ${response.statusCode}`);
    process.exit(1);
  }

  const movieData = JSON.parse(body);

  if (!movieData.title || !movieData.characters) {
    console.log('Invalid Movie ID or data format error.');
    process.exit(1);
  }

  console.log(`Characters in '${movieData.title}':`);

  const characterRequests = movieData.characters.map((url) => {
    return new Promise((resolve, reject) => {
      request(url, (error, response, body) => {
        if (error) {
          reject(`Error fetching character data: ${error}`);
        } else if (response.statusCode !== 200) {
          reject(`Failed to fetch character data: ${response.statusCode}`);
        } else {
          resolve(JSON.parse(body).name);
        }
      });
    });
  });

  Promise.all(characterRequests)
    .then((characterNames) => {
      characterNames.forEach((name) => console.log(name));
    })
    .catch((err) => {
      console.error(err);
    });
});
