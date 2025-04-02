import React from 'react';
import './Header.css';
import { usePoints } from '../../contexts/PointsContext'; 
import { useNavigate } from 'react-router-dom';

const Header = ({ email, logout }) => {
  const { points, loadingPoints } = usePoints();
  const navigate = useNavigate()

  if (loadingPoints) return <p>Loading...</p>;

  return (
    <div className='header-div'>
      <h2>Points: {points}</h2>

      <h1 className="anglophoria-logo" onClick={() => navigate('/')}>Anglophoria</h1>

      <button onClick={logout}>Sign out of {email}</button>
    </div>
  );
};

export default Header;
