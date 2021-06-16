const db = require('./db');

const Query = {
  company: (root, args) => {
    const { id } = args;
    return db.companies.get(id);
  },
  companies: () => db.companies.list(),
  job: (root, args) => {
    const { id } = args;
    return db.jobs.get(id);
  },
  jobs: () => db.jobs.list(),
};

const Mutation = {
  createJob: (root, args) => {
    const { title, companyId, description } = args;
    return db.jobs.create({
      title,
      companyId,
      description,
    });
  },
}

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
  Query,
  Mutation,
  Company,
  Job,
};

module.exports = { resolvers };