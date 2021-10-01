import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Layout from "./components/layout/Layout";
import axios from "axios";
import RoomItem from "../components/room/RoomItem";
import {useRouter} from "next/router";

const BACKEND_URL = process.env.BACKEND_URL;

export default function Index({rooms}) {

    const router = useRouter();
    let {location, page = 1} = router.query;

    return (
        <Layout>
            <section id="rooms" className="container mt-5">

                <h2 className='mb-3 ml-2 stays-heading'>{location ? `Rooms in ${location}` : 'All Rooms'}</h2>

                <Link href='/search'>
                    <a className='ml-2 back-to-search'>
                        <i className='fa fa-arrow-left'/> Back to Search
                    </a>
                </Link>

                <div className="row">
                    {rooms && rooms.length === 0 ?
                        <div className="alert alert-danger mt-5 w-100"><b>No Rooms.</b></div>
                        :
                        rooms && rooms.map(room => (
                            <RoomItem key={room.id} room={room}/>
                        ))
                    }
                </div>
            </section>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    let url = `${BACKEND_URL}/rooms`;

    const {data} = await axios.get(url);

    return {
        props: {
            rooms: data
        }
    }
}