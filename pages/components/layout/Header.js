import React, {useEffect} from 'react'
import Link from 'next/link'
import {useDispatch, useSelector} from "react-redux";
import {loadUser, logoutUser} from "../../../store/actions/userActions";
import {useRouter} from "next/router";


const Header = () => {

    const router = useRouter();
    const dispatch = useDispatch();
    const {user, loading, isAuthenticated} = useSelector(state => state.loadedUser);
    const { success, error } = useSelector(state => state.auth);

    useEffect(() => {
        if (!user) {
            dispatch(loadUser());
        }
    }, [dispatch, user]);

    // useEffect(() => {
    //     if (success) router.push('/login');
    // }, [success]);

    const logoutHandler = () => {
        if (dispatch) {
            dispatch(logoutUser());
            setTimeout(() => {
                if (success && typeof window !== 'undefined') window.location.href = "/login";
            }, 1000);
        }

    };

    return (
        <nav className="navbar row justify-content-center sticky-top">
            <div className="container">
                <div className="col-3 p-0">
                    <div className="navbar-brand">
                        <Link href='/'>
                            <img style={{cursor: 'pointer'}} src="/images/bookit_logo.png" alt="BookIT"/>
                        </Link>
                    </div>
                </div>

                <div className="col-3 mt-3 mt-md-0 text-center">
                    {user ?
                        (
                            <div className="ml-4 dropdown d-line">
                                <a
                                    className="btn dropdown-toggle mr-4"
                                    id='dropDownMenuButton'
                                    data-toggle='dropdown'
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    <span>Welcome, {user && user.username}</span>
                                </a>

                                <div className="dropdown-menu" aria-labelledby='dropDownMenuButton'>

                                    {user.role === 'admin' && (
                                        <>

                                            <Link href='/admin/rooms'>
                                                <a className="dropdown-item">Rooms</a>
                                            </Link>

                                            <Link href='/admin/bookings'>
                                                <a className="dropdown-item">Bookings</a>
                                            </Link>

                                            <Link href='/admin/users'>
                                                <a className="dropdown-item">Users</a>
                                            </Link>

                                            <Link href='/admin/reviews'>
                                                <a className="dropdown-item">Reviews</a>
                                            </Link>

                                            <hr/>

                                        </>
                                    )}

                                    <Link href='/bookings/me'>
                                        <a className="dropdown-item">My Bookings</a>
                                    </Link>

                                    <a className="dropdown-item text-danger"
                                       href='#!'
                                       onClick={logoutHandler}>
                                        Logout
                                    </a>

                                </div>

                            </div>
                        ) :
                        !loading && <Link href='/login'>
                            <a className="btn btn-danger px-4 text-white login-header-btn float-right">Login</a>
                        </Link>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Header