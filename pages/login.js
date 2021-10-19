import Layout from "./components/layout/Layout";
import {useEffect, useState} from "react";
import Link from 'next/link';
import ButtonLoader from "./components/ButtonLoader";
import Head from "next/head";
import {toast} from 'react-toastify';
import {loginUser} from "../store/actions/userActions";
import {useDispatch, useSelector} from "react-redux";
import {clearErrors} from "../store/actions/bookingActions";
import {useRouter} from "next/router";
import {AlertMessage} from "../components/errors/AlertMessage";

const Login = () => {

    const dispatch = useDispatch();
    const router = useRouter();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const [loading, setLoading] = useState(false);

    const { success, error, loading } = useSelector(state => state.auth);

    useEffect(() => {

        if (success) {
            router.push('/');
        }

        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

    }, [dispatch, success, error])

    const submitHandler = async (e) => {
        e.preventDefault();

        // setLoading(true);

        const body = JSON.stringify({
            username,
            password
        });

        dispatch(loginUser(body));

        // setLoading(false);
        // if (result.status === 200) {
        //     window.location.href = '/'
        // } else {
        //     toast.error(result.message);
        // }
    }

    return (
        <Layout>
            <Head>
                <title>Login</title>
            </Head>
            <div className="container container-fluid">
                <div className="row wrapper">
                    <div className="col-10 col-lg-5">
                        {error && <AlertMessage type="warning" message={error}/>}
                        {success && <AlertMessage type="success" message={success}/>}
                        <form className="shadow-lg" onSubmit={submitHandler}>
                            <h1 className="mb-3">Login</h1>
                            <div className="form-group">
                                <label htmlFor="username_field">Username</label>
                                <input
                                    type="text"
                                    id="username_field"
                                    className="form-control"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password_field">Password</label>
                                <input
                                    type="password"
                                    id="password_field"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <Link href="/password/forgot" className="float-right mb-4">Forgot Password?</Link>

                            <button
                                id="login_button"
                                type="submit"
                                className="btn btn-block py-3"
                                disabled={loading}
                            >
                                {loading ? <ButtonLoader/> : 'LOGIN'}
                            </button>

                            <Link href="/register" className="float-right mt-3">New User?</Link>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Login;