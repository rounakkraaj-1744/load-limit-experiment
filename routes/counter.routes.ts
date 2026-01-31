import { Router } from "express";
import {redis} from "../redis/client.ts"
import { rateLimit } from "../middlewares/rate-limit.ts";

const router = Router ()
const COUNTER_KEY = "hits:total";

router.post ("/hit", rateLimit, async (_req, res)=>{
    try{
        const count = await redis.incr(COUNTER_KEY)
        res.json({count})
    }
    catch{
        res.status(503).json ({error: "redis unavailable"})
    }
})

router.get("/stats", async (_req, res) => {
  try {
    const count = await redis.get(COUNTER_KEY);
    res.json({ count: Number(count || 0) });
  } catch {
    res.status(503).json({ error: "Redis unavailable" });
  }
});

export default router;