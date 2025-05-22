import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/axios';
import './VotePage.css';

const VotePage = () => {
  const { id: electionId } = useParams();
  const [election, setElection] = useState(null);
  const [voted, setVoted]       = useState(false);
  const [results, setResults]   = useState(null);
  const [error, setError]       = useState('');

  // 1. Fetch the election details
  useEffect(() => {
    const fetchElection = async () => {
      try {
        const res = await API.get(`/elections/${electionId}`);
        setElection(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load election');
      }
    };
    fetchElection();
  }, [electionId]);

  // 2. Cast a vote
  const handleVote = async (candidate) => {
    if (voted) return;

    try {
      const res = await API.post('/votes', { electionId, candidate });
      setVoted(true);
      // After voting, fetch results
      fetchResults();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Vote failed');
    }
  };

  // 3. Fetch results
  const fetchResults = async () => {
    try {
      const res = await API.get(`/votes/results/${electionId}`);
      setResults(res.data.results);
    } catch (err) {
      console.error(err);
    }
  };

  if (error) return <p className="error">{error}</p>;
  if (!election) return <p>Loading election…</p>;

  return (
    <div className="vote-container">
      <h2>{election.title}</h2>
      {election.description && <p className="description">{election.description}</p>}

      <h3>Candidates</h3>
      <ul className="candidate-list">
        {election.candidates.map((c, i) => (
          <li key={i} className="candidate-item">
            <div>
              <strong>{c.name}</strong>
              {c.info && <span className="info"> — {c.info}</span>}
            </div>
            <button
              onClick={() => handleVote(c.name)}
              disabled={voted}
            >
              {voted ? 'Voted' : 'Vote'}
            </button>
          </li>
        ))}
      </ul>

      {voted && results && (
        <div className="results">
          <h3>Current Results</h3>
          <ul>
            {Object.entries(results).map(([name, count]) => (
              <li key={name}>
                {name}: {count} vote{count !== 1 && 's'}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default VotePage;
