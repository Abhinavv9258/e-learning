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
import duke from './css/duke.png'
import google from './css/google.png'
import ibm from './css/IBM.png'
import illinois from './css/illinois.png'
import imperial from './css/imperial.png'
import michigan from './css/michigan.jpeg'
import penn from './css/penn.png'
import stanford from './css/stanford.png'
import './css/section1.css'

const Section2 = () => {

  return (
    <div className="section2-content"
    //   bg="#f5f5f5"
    >
      <Typography
      >
        <p  className='section2-companies-head'>We collaborate with 
        {" "}
        <a href="#" className='section2-companies' >
          300+ leading universities and companies
        </a>
        </p>
      </Typography>
      <div className="section2-grid" >
        <div className="d-flex" >
          <CardMedia
            image={duke}
            sx={{ maxHeight: 32, maxWidth: 93, minHeight: 21.5, minWidth: 62.66 }}
            component="img"
            alt="Chakra Logo"
          />
        </div>
        <div className="d-flex">
          <CardMedia
            image={google}
            sx={{ maxHeight: 37, maxWidth: 108, minHeight: 21.46, minWidth: 62.68 }}
            component="img"
            alt="Chakra Logo"
          />
        </div>
        <div className="d-flex">
          <CardMedia
            image={ibm}
            sx={{ maxHeight: 32, maxWidth: 80, minHeight: 25.06, minWidth: 62.66 }}
            component="img"
            alt="Chakra Logo"
          />
        </div>
        <div className="d-flex">
          <CardMedia
            image={illinois}
            sx={{ maxHeight: 32, maxWidth: 93, minHeight: 12.76, minWidth: 62.66 }}
            component="img"
            alt="Chakra Logo"
          />
        </div>
        <div className="d-flex">
          <CardMedia
            image={imperial}
            sx={{ maxHeight: 31.81, maxWidth: 121.8, minHeight: 16.36, minWidth: 62.68 }}
            component="img"
            alt="Chakra Logo"
          />
        </div>
        <div className="d-flex">
          <CardMedia
            image={michigan}
            sx={{ maxHeight: 55, maxWidth: 52, minHeight: 55, minWidth: 52 }}
            component="img"
            alt="Chakra Logo"
          />
        </div>
        <div className="d-flex">
          <CardMedia
            image={penn}
            sx={{ maxHeight: 37, maxWidth: 112, minHeight: 20.7, minWidth: 62.66 }}
            component="img"
            alt="Chakra Logo"
          />
        </div>
        <div className="d-flex">
          <CardMedia
            image={stanford}
            sx={{ maxHeight: 26.1, maxWidth: 121.8, minHeight: 13.43, minWidth: 62.66 }}
            component="img"
          alt="Chakra Logo"
          />
        </div>
      </div>
    </div>
  );
};

export default Section2;