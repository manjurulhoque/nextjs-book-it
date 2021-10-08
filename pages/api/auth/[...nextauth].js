import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import axios from "axios";
import cookie from "react-cookies";

const BACKEND_URL = process.env.BACKEND_URL;

export default NextAuth({
    session: {
        jwt: true
    },
    providers: [
        Providers.Credentials({
            async authorize(credentials) {

                const {username, password} = credentials;

                // Check if username and password is entered
                if (!username || !password) {
                    throw new Error('Please enter username and password');
                }

                const data = {
                    username,
                    password
                }

                console.log(data)

                try {
                    const res = await axios.post(`${BACKEND_URL}/login`, data, {
                        'headers': {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        }
                    })
                    console.log(res.data);
                } catch (e) {
                    console.log(e)
                    throw new Error('Invalid Email or Password')
                }

                return Promise.resolve({username, name: 'rumi'});
            }
        })
    ],
    callbacks: {
        jwt: async (token, user) => {
            user && (token.user = user)
            return Promise.resolve(token)
        },
        session: async (session, user) => {
            session.user = user.user
            return Promise.resolve(session)
        }
    }
})