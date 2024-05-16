import React from 'react';
import './Photographerdetails.css';
import p1 from '../../Assets/P1.jpeg';
import p2 from '../../Assets/p2.jpeg';
import p3 from '../../Assets/p3.jpeg';
import p4 from '../../Assets/p4.jpeg';
import p5 from '../../Assets/p5.jpeg';
import p6 from '../../Assets/p6.jpeg';

function PGdetails({ rating }) {
    const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <span key={i} className={5 > i ? 'full-star' : 'empty-star'}>
        ★
      </span>
    );
  }
  return (
    <div className="container">
      <div className='Allprofile'>
          <div className="profile">
          <img src= { p1 } alt="Profile picture" className="profile-picture" />
          <div className="profile-details">
            <h3>Photographer Name</h3>
            <p>Photographer simple details or simple description</p>
            <div className="ratings">
            <span>Ratings</span>
            <div className="rating-stars">{stars}</div>
          </div>
            <p>Packages starting from $500</p>
          </div>
          <button className="button">Contact</button>
        </div>
        <div className="profile">
        <img src= { p2 } alt="Profile picture" className="profile-picture" />
        <div className="profile-details">
          <h3>Photographer Name</h3>
          <p>Photographer simple details or simple description</p>
          <div className="ratings">
            <span>Ratings</span>
            <div className="rating-stars">{stars}</div>
          </div>
          <p>Packages starting from $500</p>
        </div>
        <button className="button">Contact</button>
      </div>
      <div className="profile">
        <img src= { p3 } alt="Profile picture" className="profile-picture" />
        <div className="profile-details">
          <h3>Photographer Name</h3>
          <p>Photographer simple details or simple description</p>
          <div className="ratings">
            <span>Ratings</span>
            <div className="rating-stars">{stars}</div>
          </div>
          <p>Packages starting from $500</p>
        </div>
        <button className="button">Contact</button>
      </div>
      <div className="profile">
        <img src= { p4 } alt="Profile picture" className="profile-picture" />
        <div className="profile-details">
          <h3>Photographer Name</h3>
          <p>Photographer simple details or simple description</p>
          <div className="ratings">
            <span>Ratings</span>
            <div className="rating-stars">{stars}</div>
          </div>
          <p>Packages starting from $500</p>
        </div>
        <button className="button">Contact</button>
      </div>
      <div className="profile">
        <img src= { p5 } alt="Profile picture" className="profile-picture" />
        <div className="profile-details">
          <h3>Photographer Name</h3>
          <p>Photographer simple details or simple description</p>
          <div className="ratings">
            <span>Ratings</span>
            <div className="rating-stars">{stars}</div>
          </div>
          <p>Packages starting from $500</p>
        </div>
        <button className="button">Contact</button>
      </div>
      <div className="profile">
        <img src= { p6 } alt="Profile picture" className="profile-picture" />
        <div className="profile-details">
          <h3>Photographer Name</h3>
          <p>Photographer simple details or simple description</p>
          <div className="ratings">
            <span>Ratings</span>
            <div className="rating-stars">{stars}</div>
          </div>
          <p>Packages starting from $500</p>
        </div>
        <button className="button">Contact</button>
      </div>
      </div>
  </div>
  );
}

export default PGdetails;
