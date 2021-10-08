import Layout from "./components/layout/Layout";
import {useState} from "react";
import Link from 'next/link';
import ButtonLoader from "./components/ButtonLoader";
import Head from "next/head";
import {signIn} from 'next-auth/client';
import {toast} from 'react-toastify';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();

        setLoading(true);

        const body = JSON.stringify({
            username,
            password
        });

        const res = await fetch('/api/account/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body
        });

        const result = await res.json();

        setLoading(false);
        if (result.status === 200) {
            window.location.href = '/'
        } else {
            toast.error(result.message);
        }

        // const result = await signIn('credentials', {
        //     redirect: false,
        //     username,
        //     password
        // })
        //
        // setLoading(false)
        //
        // if (result.error) {
        //     toast.error(result.error);
        // } else {
        //     window.location.href = '/'
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