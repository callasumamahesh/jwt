// ContentContext.js
'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';

const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('/api/verifytoken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.user) {
            setData(data);
          } else {
            setError('User not found');
          }
        })
        .catch(err => {
          console.error('Error verifying token:', err);
          setError('Error verifying token');
        })
        .finally(() => setLoading(false));
    } else {
      setError('No token found');
      setLoading(false);
    }
  }, []);

  return (
    <ContentContext.Provider value={{ data, loading, error }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  return useContext(ContentContext);
};
