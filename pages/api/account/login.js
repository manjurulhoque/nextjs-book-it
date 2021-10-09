import cookie from 'cookie';

const BACKEND_URL = process.env.BACKEND_URL;


export default async (req, res) => {
    if (req.method === 'POST') {
        const {username, password} = req.body;

        const body = JSON.stringify({
            username,
            password
        });

        try {
            const apiRes = await fetch(`${BACKEND_URL}/login/`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: body
            });

            const data = await apiRes.json();

            if (apiRes.status === 200) {
                res.setHeader('Set-Cookie', [
                    cookie.serialize(
                        'access', data.access, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV !== 'development',
                            maxAge: 60 * 30,
                            sameSite: 'strict',
                            path: '/api/'
                        }
                    ),
                    cookie.serialize(
                        'refresh', data.refresh, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV !== 'development',
                            maxAge: 60 * 60 * 24,
                            sameSite: 'strict',
                            path: '/api/'
                        }
                    )
                ]);

                return res.status(200).json({
                    message: 'Logged in successfully',
                    status: 200
                });
            } else {
                return res.status(apiRes.status).json({
                    message: 'Authentication failed',
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