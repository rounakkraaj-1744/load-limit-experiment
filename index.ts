import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
import { redis } from "./redis/client.ts"
import counterRouter from "./routes/index.ts"

const app = express()
const port = process.env.PORT || 8080;

app.use(cors())
app.use (express.json())
app.use ("/", counterRouter)

app.get("/", (_req, res) => {
    res.send("Backend is running ...")
})

app.get("/redis-test", async (_req, res) => {
    try {
        const val = await redis.incr("redis:test")
        res.json({ value: val })
    } catch (error) {
        res.status(500).json({
            error: "Redis Failed"
        })
    }
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})
