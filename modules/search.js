const fetch = require('node-fetch');

const format = (result) => {
  return result.map((item) => {
    const number = parseInt(item.url.match(/\/([a-z0-9_-])*([\/])$/)[1], 10);

    return {
      number: number,
      name: item.name,
      sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`,
    }
  });
};

function search(app) {
  app.get('/search', async function (req, res) {
    const page = req.query.page;
    const perPage = req.query.per_page;

    let queryString = '';
    const baseUrl = 'https://pokeapi.co/api/v2/pokemon';

    if (page && perPage) {
      queryString = `?limit=${perPage}&offset=${perPage * (page - 1)}`;
    }

    const url = `${baseUrl}${queryString}`;

    let responseData = [];

    await fetch(url)
      .then(response => response.json())
      .then(response => response.results)
      .then(format)
      .then((result) => {
        responseData = result;
      });

    res.send(responseData);
  });
}

module.exports = search;
