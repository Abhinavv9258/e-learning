import React, { useState, useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { loadStripe } from '@stripe/stripe-js';
import { CardNumberElement, CardExpiryElement, Elements, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';

import {
    Card,
    CardContent,
    CardMedia,
    CardActions,
    CardHeader,
    Box,
    Button,
    Typography,
} from '@mui/material'

import '../assets/css/CheckoutForm.css'
import Navbar from '../components/Navbar'

import { URL } from '../App'

// const stripePromise = loadStripe(`${process.env.STRIPE_PUBLIC_KEY}`);
const stripePromise = loadStripe("pk_test_51NdC7RSGjf6Wd71UXh5D0dfZNpTG2tOnfzvQm8cTX1jeL8mzfVQ0zPCzPYMLvCXj8Znj1zgCwnhz0QnHCi5cZ9AS00NewKhpJh");

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            color: "#32325d",
            // fontFamily: 'Arial, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
                color: "#a0aec0"
            }
        },
        invalid: {
            color: "#fa755a",
            iconColor: "#fa755a"
        }
    }
};

const CheckoutForm = ({ clientSecret, courseDetails }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [cardholderName, setCardholderName] = useState('');
    const thumbnailData = JSON.parse(courseDetails.thumbnail);
    const base64Thumbnail = thumbnailData.base64;
    const navigate = useNavigate();

    React.useEffect(() => {
        // Scroll to the top of the page
        window.scrollTo(0, 0);
    }, []); 

    useEffect(() => {
        if (stripe) {
            const pr = stripe.paymentRequest({
                country: 'US',
                currency: 'usd',
                total: {
                    label: 'Total',
                    amount: 1000,
                },
                requestPayerName: true,
                requestPayerEmail: true,
            });

            // pr.canMakePayment().then((result) => {
            //     if (result) {
            //         setPaymentRequest(pr);
            //     }
            // });

            pr.on('token', async (event) => {
                const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: {
                        card: elements.getElement(CardNumberElement),
                        billing_details: {
                            name: cardholderName,
                        },
                    },
                });

                if (error) {
                    event.complete('fail');
                    setError(error.message);
                } else {
                    event.complete('success');
                    if (paymentIntent.status === 'succeeded') {
                        window.location.href = `http://localhost:3000/success`;
                    } else {
                        window.location.href = `http://localhost:3000/cancel`;
                    }
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stripe, elements, clientSecret]);

    // useEffect(() => {
    //     if (clientSecret && stripe && elements) {
    //         handleSubmit();
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [clientSecret, stripe, elements]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        if (!stripe || !elements) {
            return;
        }

        const cardNumberElement = elements.getElement(CardNumberElement);
        // const cardExpiryElement = elements.getElement(CardExpiryElement);
        // const cardCvcElement = elements.getElement(CardCvcElement);

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardNumberElement,
                billing_details: {
                    name: cardholderName,
                },
            },
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            setLoading(false);
            if (paymentIntent.status === 'succeeded') {
                // window.location.href = `http://localhost:3000/success`;
                navigate('/success')
            } else {
                // window.location.href = `http://localhost:3000/cancel`;
                navigate('/cancel');
            }
        }
    };

    return (
        // <form onSubmit={handleSubmit} className="checkout-form">
        //     <div className="form-group">
        //         <label htmlFor="cardholder-name">Name on Card</label>
        //         <input
        //             id="cardholder-name"
        //             type="text"
        //             placeholder="Name on Card"
        //             value={cardholderName}
        //             onChange={(e) => setCardholderName(e.target.value)}
        //             required
        //         />
        //     </div>
        //     <div className="form-group">
        //         <label htmlFor="card-element">Card Details</label>
        //         <CardElement options={CARD_ELEMENT_OPTIONS} id="card-element" />
        //     </div>
        //     <button type="submit" disabled={!stripe || loading} className="submit-button">
        //         {loading ? 'Processing...' : 'Pay'}
        //     </button>
        //     {error && <div className="card-error">{error}</div>}
        // </form>
        <form onSubmit={handleSubmit} className='checkout-form'>
            <div className='card-details'>
                <Typography>Payment Method</Typography>
                <div className="payment-details">
                    <div className="form-group">
                        <label htmlFor="cardholder-name">Name on Card</label>
                        <input
                            id="cardholder-name"
                            type="text"
                            placeholder="Name on Card"
                            value={cardholderName}
                            onChange={(e) => setCardholderName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="card-number">Card Number</label>
                        <CardNumberElement options={CARD_ELEMENT_OPTIONS} id="card-number" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="card-expiry">Expiry Date</label>
                        <CardExpiryElement options={CARD_ELEMENT_OPTIONS} id="card-expiry" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="card-cvc">CVC</label>
                        <CardCvcElement options={CARD_ELEMENT_OPTIONS} id="card-cvc" />
                    </div>
                </div>
            </div>
            
            <div className='course-details'>
                <Typography>Order Details</Typography>
                <Card sx={{display:'flex'}}>
                    <CardHeader sx={{ height: '160px', p: 0 }}
                        title={
                            <CardMedia
                                component="img"
                                alt={courseDetails.title}
                                image={base64Thumbnail}
                                style={{
                                    objectFit: 'cover',
                                    borderRadius: '5px',
                                    border: '1px solid '
                                }}
                            />
                        }
                    />
                    <CardContent>
                        <Typography
                            fontSize="sm"
                            fontWeight="bold"
                            color="#a7a7a7"
                            textTransform={"capitalize"}
                        >
                            {courseDetails.category}
                        </Typography>
                        <Typography
                            fontSize="sm"
                        >
                            {courseDetails.subCategory}
                        </Typography>
                        <Typography
                            fontSize="lg"
                            fontWeight="bold"
                            mb={2}
                            textTransform={"capitalize"}
                        >
                            {courseDetails.title}
                        </Typography>
                    </CardContent>
                </Card>
                <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                    {courseDetails.title}
                </Typography>
                <Typography>
                    {courseDetails.category}
                </Typography>
                <Typography sx={{ fontWeight: 'bold' }}>
                    ₹{courseDetails.price}
                </Typography>
                <Button className='navbar-btn' id='payment-btn' type="submit" disabled={!stripe || loading}>
                    {loading ? 'Processing...' : 'Checkout Now'}
                </Button>
                {error && <div className="card-error">{error}</div>}
            </div>
        </form>
    );
};

const Payment = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { clientSecret, courseDetails } = location.state || {};

    // const checkout = async (price) => {
    //     setLoading(true);
    //     setError(null);
    //     try {
    //         const sessionOptions = {
    //             customer_email: "customer@example.com",
    //             metadata: {
    //                 courseId: "course123",
    //                 userId: "user123",
    //             },
    //         };

    //         const response = await fetch(`${URL}/api/v1/create-checkout-course`, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({ price, sessionOptions }),
    //         });

    //         if (!response.ok) {
    //             const errorData = await response.json();
    //             throw new Error(errorData.error || 'Failed to create payment intent');
    //         }

    //         const { clientSecret } = await response.json();
    //         setClientSecret(clientSecret);
    //     } catch (e) {
    //         console.error("Error during checkout:", e);
    //         setError(e.message || 'An error occurred during checkout. Please try again.');
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    return (
        <>
            <div className='app-container'>
                <Navbar />
                <div>
                    <h1>Purchase Course</h1>
                    {/* <Button className='navbar-btn' onClick={() => checkout(1000)} disabled={loading}>
                        {loading ? 'Processing...' : 'Checkout'}
                    </Button>
                    {error && <p style={{ color: 'red' }}>{error}</p>} */}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {clientSecret && (
                        <Elements stripe={stripePromise}>
                            <CheckoutForm clientSecret={clientSecret} courseDetails={courseDetails} />
                        </Elements>
                    )}
                </div>
            </div>
        </>
    );
};

export default Payment;
