const db = require('./db');

const Query = {
  jobs: () => db.jobs.list(),
};

const resolvers = {
  Query,
};

module.exports = { resolvers };