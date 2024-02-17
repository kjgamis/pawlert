import { Hono } from "hono"
import health from './controllers/health'
import location from './controllers/location'

const app = new Hono()
// routes
app.get('/api/health', health)
app.get('/api/location', location)

export default app
