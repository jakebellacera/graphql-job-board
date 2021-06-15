const db = require('./db');

const Query = {
  job: (root, args) => {
    const { id } = args;
    return db.jobs.get(id);
  },
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