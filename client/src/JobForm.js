import React from 'react';
import { useInput } from './useInput';
import { useQuery } from './useQuery';
import { useMutation } from './useMutation';
import { useHistory } from 'react-router-dom';

const query = `#graphql
  query JobForm {
    companies {
      id
      name
    }
  }
`;

const mutation = `#graphql
  mutation JobForm($title: String!, $companyId: ID!, $description: String) {
    createJob(title: $title, companyId: $companyId, description: $description)
  }
`;

export const JobForm = () => {
  const history = useHistory();
  const titleInput = useInput('');
  const companyIdInput = useInput('');
  const descriptionInput = useInput('');
  const { data, loading } = useQuery(query)
  const { mutate: submit, loading: isSubmitting } = useMutation(mutation);

  const submitData = async () => {
    const data = await submit({
      title: titleInput.value,
      companyId: companyIdInput.value,
      description: descriptionInput.value,
    });

    const jobId = data.createJob;

    if (jobId) {
      history.push(`/jobs/${jobId}`);
    } else {
      alert('Could not create the job. :(');
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    submitData();
  };

  return (
    <div>
      <h1 className="title">New Job</h1>
      <div className="box">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Company</label>
            <div className="control">
              <div className={`select${loading ? ' is-loading': ''}`}>
                <select {...companyIdInput} disabled={loading}>
                  <option disabled value="">Select an option</option>
                  {data.companies && data.companies.length && data.companies.map(company => {
                    return (
                      <option key={company.id} value={company.id}>{company.name}</option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input className="input" type="text" name="title" {...titleInput} />
            </div>
          </div>
          <div className="field">
            <label className="label">Description</label>
            <div className="control">
              <textarea className="input" style={{height: '10em'}} name="description" {...descriptionInput} />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button className={`button is-link${isSubmitting ? ' is-loading' : ''}`} type="submit">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
