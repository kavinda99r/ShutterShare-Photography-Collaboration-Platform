import React from 'react';
import './Portfolio.css';
import p1 from '../../Assets/P1.jpeg';
import p2 from '../../Assets/p2.jpeg';
import p3 from '../../Assets/p3.jpeg';

const Portfolio = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={5 > i ? 'full-star' : 'empty-star'}>
          ★
        </span>
      );
    }
  return (
    <div>
        <div className='descr'>
            <h2>Description</h2>
            <div className='txt'>
        </div>
        </div>
        <div className='prtf'>
            <h2>Portfolio</h2>
            <div className='photo'>

            </div>
        </div>
        <div className='prtf-reviews'>
            <h2>Reviews</h2>
            <div className='profiles'>
            <div className="profile">
            <img src= { p1 } alt="Profile picture" className="profile-picture" />
            <div className="profile-details">
              <h3>Photographer Name</h3>
              <p>Photographer simple details or simple description</p>
            <div className="ratings">
              <span>Ratings</span>
              <div className="rating-stars">{stars}</div>
            </div>
              
            </div>
            
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
            
          </div>
          
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
            
          </div>
          
            </div>
            </div>
        </div>
   </div>
  );
};

export default Portfolio;