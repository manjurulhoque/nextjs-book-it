import {useRouter} from "next/router";
import Image from 'next/image';
import Head from 'next/head';
import axios from "axios";
import {Carousel} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Layout from "../components/layout/Layout";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";

const BACKEND_URL = process.env.BACKEND_URL;

const Details = ({room}) => {

    const [checkInDate, setCheckInDate] = useState();
    const [checkOutDate, setCheckOutDate] = useState();
    const [daysOfStay, setDaysOfStay] = useState();

    const dispatch = useDispatch();
    const router = useRouter();
    const {id} = router.query;

    useEffect(() => {

    }, [dispatch, id]);

    return (
        <Layout>
            <Head>
                <title>Room details</title>
            </Head>

            <div className="container container-fluid">
                <h2 className='mt-5'>{room.name}</h2>
                <p>{room.address}</p>

                <div className="ratings mt-auto mb-3">
                    <div className="rating-outer">
                        <div className="rating-inner" style={{width: `${(room.ratings / 5) * 100}%`}}/>
                    </div>
                    <span id="no_of_reviews">({room.numOfReviews} Reviews)</span>
                </div>

                <Carousel hover='pause'>
                    {room.images && room.images.map(image => (
                        <Carousel.Item key={image.public_id}>
                            <div style={{width: '100%', height: '440px'}}>
                                <Image
                                    className='d-block m-auto'
                                    src={image.image}
                                    alt={room.name}
                                    layout='fill'
                                />
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>


                <div className="row my-5">
                    <div className="col-12 col-md-6 col-lg-8">
                        <h3>Description</h3>
                        <p>{room.description}</p>

                        <div className="features mt-5">
                            <h3 className='mb-4'>Features:</h3>
                            <div className='room-feature'>
                                <i className="fa fa-cog fa-fw fa-users" aria-hidden="true"/>
                                <p>{room.guest_capacity} Guests</p>
                            </div>

                            <div className='room-feature'>
                                <i className="fa fa-cog fa-fw fa-bed" aria-hidden="true"/>
                                <p>{room.beds} Beds</p>
                            </div>

                            <div className='room-feature'>
                                <i
                                    className={room.breakfast ? 'fa fa-check text-success' : 'fa fa-times text-danger'}
                                    aria-hidden="true"/>
                                <p>Breakfast</p>
                            </div>

                            <div className='room-feature'>
                                <i
                                    className={room.internet ? 'fa fa-check text-success' : 'fa fa-times text-danger'}
                                    aria-hidden="true"/>
                                <p>Internet</p>
                            </div>

                            <div className='room-feature'>
                                <i
                                    className={room.air_conditioned ? 'fa fa-check text-success' : 'fa fa-times text-danger'}
                                    aria-hidden="true"/>
                                <p>Air Conditioned</p>
                            </div>

                            <div className='room-feature'>
                                <i
                                    className={room.pets_allowed ? 'fa fa-check text-success' : 'fa fa-times text-danger'}
                                    aria-hidden="true"/>
                                <p>Pets Allowed</p>
                            </div>

                            <div className='room-feature'>
                                <i
                                    className={room.room_cleaning ? 'fa fa-check text-success' : 'fa fa-times text-danger'}
                                    aria-hidden="true"/>
                                <p>Room Cleaning</p>
                            </div>

                        </div>

                    </div>

                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="booking-card shadow-lg p-4">
                            <p className='price-per-night'><b>${room.price_per_night}</b> / night</p>

                            <hr/>

                            <p className="mt-5 mb-3">
                                Pick Check In & Check Out Date
                            </p>

                            <DatePicker
                                className='w-100'
                                selected={checkInDate}
                                startDate={checkInDate}
                                endDate={checkOutDate}
                                minDate={new Date()}
                                selectsRange
                                inline
                            />

                            <div className="alert alert-success my-3 font-weight-bold">Room is available. Book
                                now.
                            </div>

                            <div className="alert alert-danger my-3 font-weight-bold">Room not available. Try different
                                dates.
                            </div>

                            <div className="alert alert-danger my-3 font-weight-bold">Login to book room.</div>

                            <button className="btn btn-block py-3 booking-btn">
                                Pay - ${room.price_per_night}
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Details;

export async function getServerSideProps({params}) {
    let {id} = params;
    let url = `${BACKEND_URL}/rooms/${id}`;

    const {data} = await axios.get(url);

    return {
        props: {
            room: data
        }
    }
}