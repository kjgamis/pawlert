const { askAi } = require('../helpers')

const health = async (c) => {
  let { weather } = await c.req.json()

  let locationRecs
  let res = {
    status: 500,
    data: {
      weather,
      locations: {}
    }
  }
  if (weather.weatherSafelyLevel) {
    locationRecs = await askAi(c, `Give me a list of parks close to ${weather.address} in ${weather.city}. Format your response in this minified JSON format: { "parks": [{ "name": "", "address": "" }] }. Just give me the JSON for your response and don't say 'Sure! Here are some parks near ${weather.address} in ${weather.city}:'`)
  }
  if (locationRecs) {
    res.status = 200
    res.data.locations = JSON.parse(locationRecs.response).parks
  }
  return c.json(res)
}

module.exports = health
