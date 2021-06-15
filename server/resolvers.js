const db = require('./db');

const Query = {
  jobs: () => db.jobs.list(),
};

const Job = {
  company: job => {
    const { companyId } = job;
    return db.companies.get(companyId);
  }
};

const resolvers = {
  Job,
  Query,
};

module.exports = { resolvers };