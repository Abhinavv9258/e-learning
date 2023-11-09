import React from "react";
import { FaGraduationCap } from "react-icons/fa";
import { Link } from "react-router-dom";
import Typed from "react-typed";

import {
    CardActionArea,
    CardActions,
    CardHeader,
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Typography
} from '@mui/material';

import '../loadingComponent/LoadingComponent.css';

import LoadingComponent from '../loadingComponent/LoadingComponent';
import ViewCourse from '../modals/ViewCourse';



const CourseCard = ({ course, thumbnail, subCategory, title, category, loading }) => {
    const [modal, setModal] = React.useState(false);
    const thumbnailData = JSON.parse(thumbnail);
    const base64Thumbnail = thumbnailData.base64;
    const[courseDetails, setCourseDetails] = React.useState();

    const toggleCourse = () => {
        setCourseDetails(course);
        setModal(!modal);
    }

    return (
        <>
            {loading ?
                (
                    <>
                        <LoadingComponent />
                    </>
                ) : (
                    <>
                        <Card className="course-card"
                            sx={{ m: 2, p: 2, boxShadow: 3, height: 380, maxWidth: 300 }}
                        >
                            <CardHeader sx={{height:'160px', p:0}}
                                title={
                                    <CardMedia
                                        component="img"
                                        alt={title}
                                        image={base64Thumbnail}
                                        style={{
                                            objectFit: 'cover',
                                            borderRadius: '5px',
                                            border:'1px solid '
                                        }}
                                    />
                                }
                            />

                            <CardContent
                                style={{ padding: 0, width: '250px' }}
                            >
                                <Typography
                                    fontSize="sm"
                                    fontWeight="bold"
                                    color="#a7a7a7"
                                    textTransform={"capitalize"}
                                >
                                    {category}
                                </Typography>
                                <Typography
                                    fontSize="sm"
                                >
                                    {subCategory}
                                </Typography>
                                <Typography
                                    fontSize="lg"
                                    fontWeight="bold"
                                    mb={2}
                                    textTransform={"capitalize"}
                                >
                                    {title}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary" onClick={toggleCourse}>
                                    Share
                                </Button>
                            </CardActions>
                        </Card>

                        <ViewCourse modal={modal} courseDetails={courseDetails} toggleCourse={toggleCourse} />
                    </>
                )}


        </>
    );
};

export default CourseCard;