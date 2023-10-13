import { FaGraduationCap } from "react-icons/fa";
import { Link } from "react-router-dom";
import Typed from "react-typed";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import {
    Button,
} from '@material-ui/core';


const CourseCard = ({ course, title, category, description, _id }) => {
  const image = [
    "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/ddp/branding/mba-macquarie/thumbnail.jpg?auto=format%2Ccompress%2C%20enhance&dpr=1&w=265&h=204&fit=crop&q=50",
    "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/ddp/branding/bachelor-of-science-computer-science-bits/2c1c9800-93b0-48df-b278-a5246da9e086.jpg?auto=format%2Ccompress%2C%20enhance&dpr=1&w=265&h=204&q=50&fit=crop",
    "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/ddp/branding/mads-umich/thumbnail.jpg?auto=format%2Ccompress%2C%20enhance&dpr=1&w=265&h=204&q=50&fit=crop",
    "https://cdn.dribbble.com/users/1141617/screenshots/20111093/media/f5852b7b0c7d5831f0081fce75bd1641.jpg?compress=1&resize=1000x750&vertical=center",
  ];
  const length = image.length;
  const miniimg =
    "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/60SA8pGxPXMmJf4n7umK1H/ccec31bbe2358210bf8391dcba6cd2f1/umich.png?auto=format%2Ccompress&dpr=1&w=&h=55";
  return (
    // <Link to={`/course/${_id}`} target="_blank">
      <div className="d-dlex"
        direction={"column"}
        gap={"5px"}
        borderWidth="1px"
        borderRadius="md"
        borderColor="#c9c9c9"
        boxShadow="xl"
        p={4}
        m={2}
        h={{
          sm: "420px",
          md: "400px",
          lg: "400px",
        }}
        _hover={{ boxShadow: "2xl", cursor: "pointer" }}
      >
        <CardMedia
          image={image[Math.floor(Math.random() * length)]}
        component="img"
          alt={title}
          objectFit="cover"
        />
        <div className="d-flex" alignItems="center" mb={2}>
          <CardMedia image={miniimg}  component="img" alt="Logo" boxSize={4} mr={2} />
          <Typography
            fontSize="sm"
            fontWeight="bold"
            color="#a7a7a7"
            textTransform={"capitalize"}
          >
            {category}
          </Typography>
        </div>
        <Typography
          fontSize="lg"
          fontWeight="bold"
          mb={2}
          textTransform={"capitalize"}
        >
          {title}
        </Typography>
        <Typography fontSize="sm" mb={2} textTransform={"capitalize"}>
          {description}
        </Typography>
        <div className="d-flex" color="#0056d2" fontFamily={"poppins"} gap={2}>
          <div className="d-flex" alignItems={"center"}>
            <FaGraduationCap />
          </div>
          <p>Earn a degree</p>
        </div>
        <Typography fontSize="sm">{course}</Typography>
      </div>
    // </Link>
  );
};

export default CourseCard;