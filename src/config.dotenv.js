import dotenv from 'dotenv';
import program from "./config.commander.js";

const mode = program.opts().mode


dotenv.config(
    {
        path:
            mode === 'testing'
                ? '.env.testing'
                : mode === 'development'
                    ? '.env'
                    : '.env.stage'
    }
);

export default {
    mongo_uri: process.env.MONGO_URI,
    port: process.env.PORT,
    jwt_secret_key: process.env.JWT_SECRET_KEY,
    client_id_github: process.env.CLIENT_ID_GITHUB,
    client_secret_github: process.env.CLIENT_SECRET_GITHUB,
    callback_url_github: process.env.CALLBACK_URL_GITHUB,
    gmail_user: process.env.GMAIL_USER,
    gmail_password: process.env.GMAIL_PASSWORD
}