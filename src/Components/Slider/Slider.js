import React, { useEffect, useState } from 'react';
import './StyleSlider.css';
import image1 from '../../img/Slider/1.jpg'
import image2 from '../../img/Slider/2.jpg'
import image3 from '../../img/Slider/3.jpg'
function Slider() {
  const [currentIndex, setcurrentIndex] = useState(0);

  useEffect(() => {
    const slide = setInterval(() => {
      setcurrentIndex((prev) => (prev + 1) % 3);
    }, 4000);

    return () => {
      clearInterval(slide);
    };
  }, []);

  const backgroundImage = [image1, image2, image3]

  return (
    <div className='background-slide'>
      {backgroundImage.map((imageUrl, index) => (
        <div
          key={index}
          className={`background-image ${index === currentIndex ? 'visible' : ''}`}
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      ))}
    </div>
  );

}

export default Slider;
