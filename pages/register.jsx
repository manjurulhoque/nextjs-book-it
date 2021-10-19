import Layout from "./components/layout/Layout";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {useState} from "react";
import {registerUser} from "../store/actions/userActions";
import ButtonLoader from "./components/ButtonLoader";

const Register = () => {

    const dispatch = useDispatch()
    const router = useRouter();

    const [user, setUser] = useState({
        username: '',
        email: '',
        password: ''
    });

    const {username, email, password} = user;

    const { success, error, loading } = useSelector(state => state.auth);

    const submitHandler = (e) => {
        e.preventDefault();

        const userData = {
            username, email, password
        }

        dispatch(registerUser(userData))

    }

    const onChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    return (
        <Layout>
            <div className="container container-fluid">
                <div className="row wrapper">
                    <div className="col-10 col-lg-5">
                        <form className="shadow-lg" onSubmit={submitHandler}>
                            <h1 className="mb-3">Register</h1>

                            <div className="form-group">
                                <label htmlFor="username_field">Username</label>
                                <input
                                    type="text"
                                    id="username_field"
                                    className="form-control"
                                    name='username'
                                    value={username}
                                    onChange={onChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email_field">Email</label>
                                <input
                                    type="email"
                                    id="email_field"
                                    className="form-control"
                                    name='email'
                                    value={email}
                                    onChange={onChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password_field">Password</label>
                                <input
                                    type="password"
                                    id="password_field"
                                    className="form-control"
                                    name='password'
                                    value={password}
                                    onChange={onChange}
                                />
                            </div>

                            <button
                                id="login_button"
                                type="submit"
                                className="btn btn-block py-3"
                                disabled={!!loading}
                            >
                                {loading ? <ButtonLoader/> : 'REGISTER'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
};

export default Register;