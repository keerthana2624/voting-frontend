// client/src/pages/Elections.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Elections.css';

const Elections = () => {
  const [elections, setElections] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/elections'); // ✅ update if deployed
        const data = await res.json();
        setElections(data);
      } catch (err) {
        console.error('Error fetching elections:', err);
      }
    };

    fetchElections();
  }, []);

  return (
    <div className="elections-container">
      <h2>Available Elections</h2>
      {elections.length === 0 ? (
        <p>No elections found.</p>
      ) : (
        <ul className="election-list">
          {elections.map((election) => (
            <li key={election._id} className="election-item">
              <h3>{election.title}</h3>
              <p>{election.description}</p>
              <button onClick={() => navigate(`/vote/${election._id}`)}>
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
