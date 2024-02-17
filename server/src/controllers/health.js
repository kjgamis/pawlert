const { askAi } = require('../helpers')

const health = async (c) => {
  let { location, pet } = await c.req.json()
  const token = location.API_KEY
  let weatherApi = "https://api.waqi.info/feed/geo:" + `${location.latitude};${location.longitude}/?token=${token}`

  const init = {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    }
  }

  const response = await fetch(weatherApi, init)
  const content = await response.json()

  let city = content.data.city.name
  let temperature = content.data.iaqi.t?.v
  let humidity = content.data.iaqi.h?.v
  let time = content.data.time.s

  let weatherSafelyLevel
  let bodyTempLevel
  let heartRateLevel
  let res = {
    status: 500,
    data: {
      weather: {},
      pet: {}
    }
  }

  if (temperature && city) {

    weatherSafelyLevel = await askAi(c, `The real time weather temperature in ${city} at ${time} is ${temperature}degC with ${humidity}%humidity. Is it safe to walk my dog? Give me 3 states: 'safe', 'caution' or 'dangerous'. Return a one word response only.`)

    heartRateLevel = await askAi(c, `My ${pet.weight}lb ${pet.age} years old ${pet.breed} dog's heart rate is ${pet.heartRate}bpm and his body temperature is ${pet.bodyTemperature}degC, and the temperature outside is ${temperature}degC. He does not have health concerns. Is my dog's heart rate normal, hazardous or fatal. Return a one word response only`)

    bodyTempLevel = await askAi(c, `My ${pet.weight}lb ${pet.age} years old ${pet.breed} dog's heart rate is ${pet.heartRate}bpm and his body temperature is ${pet.bodyTemperature}degC, and the temperature outside is ${temperature}degC. He does not have health concerns. Is my dog's body temperature normal, hazardous or fatal. Return a one word response only`)
  }
  if (city && time && temperature) {
    res.status = 200
    res.data.weather.city = city
    res.data.weather.time = time
    res.data.weather.temperature = temperature
    res.data.weather.humidity = humidity
    res.data.weather.weatherSafelyLevel = weatherSafelyLevel?.response
  }
  if (heartRateLevel) {
    res.status = 200
    res.data.pet.name = pet.name
    res.data.pet.image = pet.img
    res.data.pet.age = pet.age
    res.data.pet.breed = pet.breed
    res.data.pet.bodyTemperature = pet.bodyTemperature
    res.data.pet.heartRate = pet.heartRate
    res.data.pet.heartRateLevel = heartRateLevel?.response
    res.data.pet.bodyTempLevel = bodyTempLevel?.response
  }
  return c.json(res)
}

module.exports = health
