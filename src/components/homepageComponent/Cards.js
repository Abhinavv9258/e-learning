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

const CourseCard = ({ thumbnail, subCategory, title, category, loading }) => {

    const thumbnailData = JSON.parse(thumbnail);
    const base64Thumbnail = thumbnailData.base64;

    return (
        <>
            {loading ?
                (
                    <>
                        <LoadingComponent/>
                    </>
                ) : (
                    <>
                        <Card
                            sx={{ m: 2, p: 2, boxShadow: 3, height: 380 }}
                        >
                            <CardHeader
                                title={
                                    <CardMedia
                                        component="img"
                                        alt={title}
                                        image={base64Thumbnail}
                                        style={{
                                            objectFit: 'cover'
                                        }}
                                    />
                                }
                            />
                            <CardActions>

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
                            </CardActions>
                        </Card>


                    </>
                )}


        </>
    );
};

export default CourseCard;