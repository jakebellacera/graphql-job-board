const db = require('./db');

const Query = {
  company: (root, args) => {
    const { id } = args;
    return db.companies.get(id);
  },
  job: (root, args) => {
    const { id } = args;
    return db.jobs.get(id);
  },
  jobs: () => db.jobs.list(),
};

const Company = {
  jobs: company => {
    const { id } = company;
    return db.jobs.list().filter(({ companyId }) => companyId === id);
  },
};

const Job = {
  company: job => {
    const { companyId } = job;
    return db.companies.get(companyId);
  }
};

const resolvers = {
  Company,
  Job,
  Query,
};

module.exports = { resolvers };