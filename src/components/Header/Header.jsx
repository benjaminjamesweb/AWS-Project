import React from 'react';
import './Header.css';
import { usePoints } from '../../contexts/PointsContext'; // 👈 import usePoints

const Header = ({ email, logout }) => {
  const { points, setPoints, loadingPoints } = usePoints();

  if (loadingPoints) return <p>Loading points...</p>;

  return (
    <div className='header-div'>
      <h2>Your points: {points}</h2>

      <button
        onClick={() => {
          setPoints(points + 1); // this will update state + DB via context
        }}
      >
        Click to add points
      </button>

      <button
        onClick={() => {
          setPoints(points - 1);
        }}
      >
        Click to subtract points
      </button>

      <h1>Anglophoria</h1>

      <button onClick={logout}>Sign out of {email}</button>
    </div>
  );
};

export default Header;
