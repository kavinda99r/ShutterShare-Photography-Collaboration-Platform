import React from 'react';
import './Book.css';
import p1 from '../../Assets/P1.jpeg';

const Book = ({ rating }) => {
    const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <span key={i} className={5 > i ? 'full-star' : 'empty-star'}>
        ★
      </span>
    )
  }
  return (
    <div className="photographer-profile">
      
      <div className="info">
        <div>
          <img
            className="picture"
            src= { p1 }
            alt="Profile picture"
          />
        </div>
        <div className='leftside-details'>
          <h2>Photographer Name</h2>
          <p>Photographer simple details or simple Event description</p>
          <span>Ratings</span>
          <div className="rating-stars-main">{stars}</div>
          <p>Packages Starting From $500</p>
          <button className="book-now">Book Now</button>
          
        </div>
        
      </div>
      <div className='right-side'>
        <h4>Type</h4>
        <p>Event</p>
        <h4>Location</h4>
        <p>Colombo</p>
        <button className="book-now">Contact</button>
      </div>
    </div>
  );
}

export default Book;
