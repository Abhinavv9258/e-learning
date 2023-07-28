import React from 'react';
import { useNavigate } from "react-router-dom";
import Typed from "react-typed";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import {
    Button,
} from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.css';
import adminLogin from './css/559-removebg.png'
import './css/section1.css'

const Section2 = () => {

  return (
    <div className="section2-content"
    //   bg="#f5f5f5"
    >
      <Typography
      >
        We collaborate with
        {/* {" "} */}
        {/* <Link color="#0056d2" href="#" fontWeight="bold"> */}
          300+ leading universities and companies
        {/* </Link> */}
      </Typography>
      <div className="section2-grid" >
        <div className="d-flex p-4" >
          <CardMedia
            image={adminLogin}
            component="img"
            height="90px"
            alt="Chakra Logo"
          />
        </div>
        <div className="d-flex p-4">
          <CardMedia
            image={adminLogin}
            component="img"
                        height="90px"

            alt="Chakra Logo"
          />
        </div>
        <div className="d-flex p-4">
          <CardMedia
            image={adminLogin}
            component="img"
                        height="90px"

            alt="Chakra Logo"
          />
        </div>
        <div className="d-flex p-4">
          <CardMedia
            image={adminLogin}
            component="img"
                        height="90px"

            alt="Chakra Logo"
          />
        </div>
        <div className="d-flex p-4">
          <CardMedia
            image={adminLogin}
            component="img"
                        height="90px"

            alt="Chakra Logo"
          />
        </div>
        <div className="d-flex p-4">
          <CardMedia
            image={adminLogin}
            component="img"
                        height="90px"

            alt="Chakra Logo"
          />
        </div>
      </div>
    </div>
  );
};

export default Section2;