import { Hono } from "hono"
import health from './controllers/health'

const app = new Hono()
// routes
app.get('/api/health', health)

export default app
