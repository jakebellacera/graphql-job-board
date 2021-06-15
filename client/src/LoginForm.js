import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from './auth';
import { useInput } from './useInput';

export const LoginForm = props => {
  const { onLogin } = props;
  const [hasError, setHasError] = useState(false);
  const emailInput = useInput('');
  const passwordInput = useInput('');
  const history = useHistory();

  const handleLogin = () => {
    onLogin();
    history.push('/');
  };

  const handleSubmit = e => {
    e.preventDefault();

    login(emailInput.value, passwordInput.value).then(success => {
      if (success) {
        handleLogin();
      } else {
        setHasError(true);
      }
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">Email</label>
        <div className="control">
          <input className="input" type="text" name="email" {...emailInput} />
        </div>
      </div>
      <div className="field">
        <label className="label">Password</label>
        <div className="control">
          <input className="input" type="password" name="password" {...passwordInput} />
        </div>
      </div>
      <div className="field">
        <p className="help is-danger">{hasError && 'Invalid credentials'}</p>
        <div className="control">
          <button className="button is-link" type="submit">Login</button>
        </div>
      </div>
    </form>
  );
}
