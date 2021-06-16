import { useState } from 'react';
import { queryApi } from './queryApi';

export const useMutation = query => {
  const [loading, setLoading] = useState(false);

  const mutate = async variables => {
    setLoading(true);
    try {
      const res = await queryApi(query, variables);

      setLoading(false);
      return res.data;
    } catch (err) {
      throw new Error(err.errors);
    }
  };

  return {
    loading,
    mutate,
  };
};