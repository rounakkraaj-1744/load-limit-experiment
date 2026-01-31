import { type Request, type Response, type NextFunction } from "express";
import { redis } from "../redis/client.ts";

const WINDOW_SECONDS = 60;
const MAX_REQUESTS = 100;

export async function rateLimit( req: Request, res: Response, next: NextFunction ) {
  const ip = req.ip;
  const key = `rate:${ip}`;

  try {
    const count = await redis.incr(key);

    if (count === 1)
      await redis.expire(key, WINDOW_SECONDS);

    if (count > MAX_REQUESTS) 
      return res.status(429).json({ error: "Too many requests" });

    next();
  }
  catch {
    // fail-open by design
    next();
  }
}
