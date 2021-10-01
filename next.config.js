module.exports = {
    reactStrictMode: true,
    env: {
        BACKEND_URL: "http://127.0.0.1:8000/api",

        SMTP_HOST: "",
        SMTP_PORT: "",
        SMTP_USER: "",
        SMTP_PASSWORD: "",
        SMTP_FROM_EMAIL: "",
        SMTP_FROM_NAME: "",

        NEXTAUTH_URL: 'http://localhost:3000',
    },
    images: {
        domains: ['res.cloudinary.com'],
    },
}
