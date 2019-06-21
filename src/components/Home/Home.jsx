import React from 'react';
import './style.css';
import photo from '../image/photo.gif';

const Home = () => {
  return (
      <div className='home-s'>
          <div className='home-div'>
              <h1>Домашняя страница блога</h1>
              <img src={photo} alt=""/>
              <h4>Блог создан с целью обучения</h4>
              <i>21.06.2019г.</i>
          </div>
      </div>
    );
};
export default Home;