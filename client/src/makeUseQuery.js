import { useState, useEffect } from 'react';

const queryApi = async (query, variables = {}) => {
  const response = await fetch('http://localhost:9000/graphql', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const payload = await response.json();

  if (payload.error) {
    throw new Error(payload.error);
  }

  return payload;
}

export const makeUseQuery = (query, initialValue = undefined) => {
  const useQuery = (variables = {}) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(initialValue);
    const [errors, setErrors] = useState([]);
    const serializedVariables = JSON.stringify(variables);

    useEffect(() => {
      const variables = JSON.parse(serializedVariables);

      const fetchData = async () => {
        setLoading(true);
        setData(initialValue);
        setErrors([]);

        try {
          const res = await queryApi(query, variables);

          setData(res.data);
          setLoading(false);
        } catch (err) {
          setErrors(err.errors)
        }
      };

      fetchData();
    }, [serializedVariables]);

    return {
      data,
      errors,
      loading,
    };
  };

  return useQuery;
};