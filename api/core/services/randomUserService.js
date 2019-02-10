const axios = require('axios');
const config = require('../../../config');

class RandomUserService {
  static async generateRandomUser({
    totalUsers = 100,
    country = 'en',
  }) {
    const query = `?results=${totalUsers}&nat=${country.toLowerCase()}`;

    const response = await axios.get(`${config.externals.randomUser}/${query}`);

    return response.data.results;
  }
}

module.exports = RandomUserService;
