import Carousel from 'react-bootstrap/Carousel';
// import i561 from '../assets/images/561.jpg';
// import i559 from '../assets/images/559.jpg';
// import i560 from '../assets/images/560.jpg';
// import i1 from '../assets/images/1.jpg';
import i2 from '../assets/images/12.png';
import i3 from '../assets/images/13.png';
import i4 from '../assets/images/14.png';
import CardMedia from '@mui/material/CardMedia';

function DarkVariantExample() {
  return (
    <div className='d-flex justify-content-center align-items-center' >
<div className='d-flex justify-content-center align-items-center' style={{height:"50%",width:"70%","padding-top":"10px","padding-bottom":"20px"}}>
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <CardMedia 
            component="img"
          className="d-block"
          image={i4}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <CardMedia
            component="img"
          className="d-block"
          image={i2}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <CardMedia
          className="d-block"
            component="img"
          image={i3}

          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
    </div>
    </div>
  );
}

export default DarkVariantExample;