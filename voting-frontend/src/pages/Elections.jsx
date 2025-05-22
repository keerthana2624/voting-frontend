// src/pages/Elections.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import './Elections.css';

const Elections = () => {
  const [elections, setElections] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const res = await API.get('/elections');
        setElections(res.data);                // should be an array
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchElections();
  }, []);

  if (loading) return <p className="loading">Loading elections…</p>;
  if (error)   return <p className="error">Error: {error}</p>;

  return (
    <div className="elections-container">
      <h2>Available Elections</h2>
      {elections.length === 0 ? (
        <p>No elections found.</p>
      ) : (
        <ul className="election-list">
          {elections.map((e) => (
            <li key={e._id} className="election-item">
              <h3>{e.title}</h3>
              {e.description && <p>{e.description}</p>}
              <button onClick={() => navigate(`/vote/${e._id}`)}>
                Vote Now
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Elections;
