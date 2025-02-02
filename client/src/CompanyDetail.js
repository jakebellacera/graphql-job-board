import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from './useQuery';
import { JobList } from './JobList';

const query = `#graphql
  query CompanyDetail($id: ID!) {
    company(id: $id) {
      name
      description
      jobs {
        id
        title
      }
    }
  }
`;

export const CompanyDetail = () => {
  const { companyId } = useParams();
  const { loading, data } = useQuery(query, { id: companyId });

  if (loading) {
    return (
      <div className="box">Loading...</div>
    );
  }

  const { company } = data;

  if (!company) {
    return (
      <div className="box">Company with ID "{companyId}" not found.</div>
    )
  }

  return (
    <div>
      <h1 className="title">{company.name}</h1>
      <div className="box">{company.description}</div>
      <h2 className="title is-5">Jobs at {company.name}</h2>
      <JobList jobs={company.jobs} />
    </div>
  );
};
