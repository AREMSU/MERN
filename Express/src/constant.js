import "dotenv/config"

export const port = process.env.PORT || 8000
export const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/sunwayL2"
export const clientUrl = process.env.CLIENT_URL || "http://localhost:5173"
export const secretKey = process.env.JWT_SECRET || "dev-secret-change-me"

if (!process.env.JWT_SECRET) {
    console.warn("JWT_SECRET is not set in .env, using an insecure development secret.")
}
