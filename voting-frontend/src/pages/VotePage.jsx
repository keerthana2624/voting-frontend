// src/pages/VotePage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const VotePage = () => {
  const { id } = useParams();
  const [election, setElection] = useState(null);
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    const fetchElection = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/elections/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await res.json();
        setElection(data);
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };

    fetchElection();
  }, [id]);

  const handleVote = async (candidateName) => {
    if (voted) return alert("You've already voted!");

    try {
      const res = await fetch(`http://localhost:5000/api/votes/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ candidate: candidateName }),
      });

      const result = await res.json();
      if (res.ok) {
        alert('Vote cast successfully!');
        setVoted(true);
      } else {
        alert(result.error || 'Failed to vote');
      }
    } catch (err) {
      console.error('Vote error:', err);
    }
  };

  if (!election) return <p>Loading...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>{election.title}</h2>
      <p>{election.description}</p>
      <h3>Candidates</h3>
      {election.candidates.map((c, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <strong>{c.name}</strong> - {c.info}
          <br />
          <button onClick={() => handleVote(c.name)} disabled={voted}>
            Vote
          </button>
        </div>
      ))}
    </div>
  );
};

export default VotePage;
