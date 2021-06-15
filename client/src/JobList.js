import React from 'react';
import { Link } from 'react-router-dom';
import { makeUseQuery } from './makeUseQuery';

const query = `#graphql
  query JobList {
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

const useJobList = makeUseQuery(query, []);

export const JobList = () => {
  const { loading, data } = useJobList();

  if (loading) {
    return (
      <ul className="box">
        <li className="media">Loading jobs...</li>
      </ul>
    );
  }

  const { jobs } = data;

  return (
    <ul className="box">
      {jobs.map(job => {
        const title = job.company ? `${job.title} at ${job.company.name}` : job.title;

        return (
          <li className="media" key={job.id}>
            <div className="media-content">
              <Link to={`/jobs/${job.id}`}>{title}</Link>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
