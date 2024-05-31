import React from "react";

import {
    CardActions,
    CardHeader,
    Button,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Box,
    Divider,
    Tooltip
} from '@mui/material';

import '../loadingComponent/LoadingComponent.css';

import '../../assets/css/HomepageSection.css'

import LoadingComponent from '../loadingComponent/LoadingComponent';
import ViewCourse from '../modals/ViewCourse';

import { URL } from '../../App';

import { useApp } from '../../context/AuthContext'

// importing toast
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { TbDiscountCheckFilled } from "react-icons/tb";



const CourseCard = ({ course, thumbnail, subCategory, title, category, loading, price }) => {
    const [modal, setModal] = React.useState(false);
    const thumbnailData = JSON.parse(thumbnail);
    const base64Thumbnail = thumbnailData.base64;
    const [courseDetails, setCourseDetails] = React.useState();

    const toggleCourse = () => {
        setCourseDetails(course);
        setModal(!modal);
    }

    const { user } = useApp();

    const addCourseToUser = async () => {
        const courseId = course._id;
        const token = localStorage.getItem('access_token');
        try {
            const url = `${URL}/api/users/add-course/${user._id}`;
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                credentials: 'include',
                body: JSON.stringify({ courseId }),
            };

            const response = await fetch(url, requestOptions);

            if (response.ok) {
                const data = await response.json();
                toast.success(`${data.message}`, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
            } else if (response.status === 400) {
                const data = await response.json();
                toast.warning(`${data.message}`, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
            } else {
                toast.error(`Failed to add course!`, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                });
                console.error('Failed to add course:', response.statusText);
            }
        } catch (error) {
            toast.error(`Error adding course!`, {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
            });
            console.error('Error adding course:', error);
        }
    };

    const [isCourseAdded, setIsCourseAdded] = React.useState(false);

    const checkCourse = async () => {
        console.log(course.title);
        try {
            const token = localStorage.getItem('access_token');
            const url = `${URL}/api/users/check-course/${user._id}`;
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                credentials: 'include',
                body: JSON.stringify({ courseId: course._id }),
            };

            const response = await fetch(url, requestOptions);

            if (response.ok) {
                setIsCourseAdded(true);
            } else {
                setIsCourseAdded(false);
            }
        } catch (error) {
            console.error('Error checking course:', error);
        }
    }
    React.useEffect(() => {
        if (user) {
            checkCourse();
        }
        // eslint-disable-next-line
    }, []);


    return (
        <>
            {loading ?
                (
                    <>
                        <LoadingComponent />
                    </>
                ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Card className="course-card">
                            <Tooltip title={title}>
                                <div>
                                    <CardHeader sx={{ height: '160px', p: 0 }}
                                        title={
                                            <CardMedia
                                                component="img"
                                                alt={title}
                                                image={base64Thumbnail}
                                                style={{
                                                    objectFit: 'cover',
                                                    borderRadius: '5px',
                                                    border: '1px solid '
                                                }}
                                            />
                                        }
                                    />
                                </div>
                            </Tooltip>


                            <CardContent
                                sx={{ padding: 0, width: '250px', height: '120px' }}
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
                            <Divider sx={{ border: 1 }} />

                            <CardActions sx={{ justifyContent: 'space-between' }}>
                                {user && isCourseAdded ?
                                    (
                                        <Button size="small" sx={{ color: '#970C10' }} onClick={toggleCourse}>
                                            View Course
                                        </Button>
                                    ) : user ? (
                                        <>
                                            <Button size="small" sx={{ color: '#970C10' }} onClick={toggleCourse}>
                                                Add Course
                                            </Button>
                                            {price === 0 ? (
                                                <>
                                                    <Button variant="contained" color="success">
                                                        <Box><TbDiscountCheckFilled size={20} /> FREE</Box>
                                                    </Button>

                                                </>
                                            ) : (
                                                <>
                                                    <Button variant="contained" color="primary">
                                                        <Box><TbDiscountCheckFilled size={20} />{price}</Box>
                                                    </Button>
                                                </>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            <Button size="small" sx={{ color: '#970C10' }} onClick={toggleCourse}>
                                                View Details
                                            </Button>
                                            {price === 0 ? (
                                                <>
                                                    <Button variant="contained" color="success">
                                                        <Box><TbDiscountCheckFilled size={20} /> FREE</Box>
                                                    </Button>

                                                </>
                                            ) : (
                                                <>
                                                    <Button variant="contained" color="primary">
                                                        <Box><TbDiscountCheckFilled size={20} />{price}</Box>
                                                    </Button>
                                                </>
                                            )}
                                        </>
                                    )
                                }

                            </CardActions>
                        </Card>
                        <ViewCourse
                            modal={modal}
                            courseDetails={courseDetails}
                            toggleCourse={toggleCourse}
                        />
                    </Box>
                )}
        </>
    );
};

export default CourseCard;