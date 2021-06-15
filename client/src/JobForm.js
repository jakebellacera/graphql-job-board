import React from 'react';
import { useInput } from './useInput';

export const JobForm = () => {
  const titleInput = useInput('');
  const descriptionInput = useInput('');

  const handleSubmit = e => {
    e.preventDefault();

    console.log('should post a new job:', {
      title: titleInput.value,
      description: descriptionInput.value
    });
  };

  return (
    <div>
      <h1 className="title">New Job</h1>
      <div className="box">
        <form onSubmit={handleSubmit}>
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
              <button className="button is-link" type="submit">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
