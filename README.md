# Minimal Express + Redis Counter (Load Test Experiment)

## What this service does
A minimal backend service with two endpoints:
- POST /hit — increments a global counter
- GET /stats — returns current counter value

## Why Redis
Redis `INCR` provides atomic increments and safe concurrency without in-memory state.

## Rate limiting
Implemented per-IP rate limiting using Redis counters with TTL.
- Window: 60 seconds
- Limit: 100 requests

## Load testing
Tested using curl loops and autocannon.
Observed correct behavior under sequential load.

## Observations
- Atomic increments held under load
- Rate limit enforced correctly
- Server remained stable under abuse

## Failure behavior
If Redis is unavailable:
- Requests fail gracefully with 503
- Server process does not crash

## What I would improve next
- Proper sliding window rate limiting
- Background batching to DB
- Metrics and dashboards
- Horizontal scaling
