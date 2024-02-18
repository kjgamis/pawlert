import { Hono } from 'hono'
import { cors } from 'hono/cors'
import health from './controllers/health'
import location from './controllers/location'

const app = new Hono()

app.use('/*', cors({
  origin: '*', // Allow requests from any origin
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow specified HTTP methods
  allowHeaders: ['Content-Type'], // Allow specified headers
}))

// routes
app.post('/api/health', health)
app.post('/api/location', location)
app.get('/', async (c) => {
  let res = {
    status: 200,
    message: "pawlert"
  }

  return c.json(res)
})

export default app
