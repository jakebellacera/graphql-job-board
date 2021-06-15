import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { makeUseQuery } from './makeUseQuery';

const query = `#graphql
  query JobDetail($id: ID!) {
    job(id: $id) {
      id
      title
      description
      company {
        id
        name
      }
    }
  }
`;

const useJobDetail = makeUseQuery(query);

export const JobDetail = () => {
  const { jobId } = useParams();
  const { data, loading } = useJobDetail({ id: jobId });

  if (loading) {
    return (
      <div className="box">Loading...</div>
    );
  }

  const { job } = data;

  if (!job) {
    return (
      <div className="box">Job with ID "{jobId}" not found.</div>
    )
  }

  return (
    <div>
      <h1 className="title">{job.title}</h1>
      <h2 className="subtitle">
        <Link to={`/companies/${job.company.id}`}>{job.company.name}</Link>
      </h2>
      <div className="box">{job.description}</div>
    </div>
  );
};
