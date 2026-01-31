import express, {type Request, type Response} from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()

const app = express()
const port = process.env.PORT || 8080;

app.use (cors)

app.get ("/", (req: Request, res: Response)=>{
    res.send("Backend is running ...")
})

app.listen (port, ()=>{
    console.log (`Server is running at http://localhost:${port}`)
})
