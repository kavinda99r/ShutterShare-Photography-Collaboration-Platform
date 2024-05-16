import React from 'react'
import './Searchphotographer.css'
import Photo from '../../Assets/OIP.jpeg'


const SearchPG = () => {
  return (
    <div className='container'>
      <div className='search-components'>
        <div className='head'>
          <h1>Search Photographer</h1>
        </div>
        <div className='line-search'></div>
        <div className='search-section'>
        <input className='btnS' type="text" placeholder="Search.." />
        <button type="submit" className="btnL"><img src={Photo} className='Sicon' alt="Search"/></button>
        </div>
      </div>
      
      </div>
      )
      }
      export default SearchPG