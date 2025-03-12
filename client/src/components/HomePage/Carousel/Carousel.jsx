import React from 'react';
import './Carousel.css';
import one from '../../../assets/image/1.jpg'
import two from '../../../assets/image/2.jpg';
import three from '../../../assets/image/3.jpg';
import four from '../../../assets/image/4.jpg';
import five from '../../../assets/image/5.jpg';
import six from '../../../assets/image/6.jpg';
import seven from '../../../assets/image/7.jpg';

const images = [one, two, three, four, five, six, seven];

const Carousel = () => {
  return (
    <div className='carouselContainer'>
      <section className="carousel">
        <ol className="viewport" tabIndex="1">
          {images.map((image, index) => (
            <li className="slide" key={index}>
              <div className="snapper" style={{ backgroundImage: `url(${image})` }}></div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
};

export default Carousel;