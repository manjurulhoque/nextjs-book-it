import cookie from 'cookie';
import {ExtractMessages} from "../../../components/errors/ErrorHandler";

const BACKEND_URL = process.env.BACKEND_URL;


export default async (req, res) => {
    if (req.method === 'POST') {
        const {username, email, password} = req.body;

        const body = JSON.stringify({
            username,
            email,
            password
        });

        try {
            const apiRes = await fetch(`${BACKEND_URL}/register/`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: body
            });

            const data = await apiRes.json();
            console.log(data)

            if (apiRes.status === 200) {

                return res.status(200).json({
                    message: 'Register successfully done',
                    status: 200
                });
            } else {
                let error = ExtractMessages({errors: data});
                return res.status(apiRes.status).json({
                    message: error[0],
                    status: apiRes.status
                });
            }
        } catch (err) {
            return res.status(500).json({
                message: 'Something went wrong when authenticating',
                status: 500
            });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({error: `Method ${req.method} now allowed`});
    }
};