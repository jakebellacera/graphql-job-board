import React from 'react';
import { JobList } from './JobList';
import { useQuery } from './useQuery';

const query = `#graphql
  query JobBoard {
    jobs {
      id
      title
      company {
        id
        name
      }
    }
  }
`;

export const JobBoard = () => {
  const { loading, data } = useQuery(query);

  if (loading) {
    return (
      <div>
        <h1 className="title">Job Board</h1>
        <div className="box">
          Loading jobs...
        </div>
      </div>
    );
  }

  const { jobs } = data;

  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
};