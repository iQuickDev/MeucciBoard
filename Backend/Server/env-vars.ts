import dotenv from "dotenv";
import { resolve } from "path";

dotenv.config({ path: resolve(__dirname, "../.env") });

interface EnvVars {
    serverPort: number
    googleClientId: string
    googleClientSecret: string
}

const envVars: EnvVars = {
    serverPort: Number(process.env.SERVER_PORT) | 3000,
    googleClientId: process.env.GOOGLE_CLIENT_ID!,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET!
};

export default envVars;