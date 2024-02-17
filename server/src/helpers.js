const { Ai } = require('@cloudflare/ai')

const askAi = async (c, prompt) => {
  const ai = new Ai(c.env.AI)
  let answer = await ai.run(
    '@cf/meta/llama-2-7b-chat-int8',
    {
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    }
  )
  return answer
}

const getAddress = async (latitude, longitude, key) => {
  let geocodeApi =`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${key}`;

  const res = await fetch(geocodeApi);
  const addressRes = await res.json()
  const address = {
    street: `${addressRes.results[0].address_components[0].short_name} ${addressRes.results[0].address_components[1].short_name}`,
    city: addressRes.results[0].address_components[5].short_name
  }
  return address
}

const getWeather = async (latitude, longitude, key) => {
  let weatherApi = `https://api.waqi.info/feed/geo:${latitude};${longitude}/?token=${key}`

  const init = {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    }
  }
  const res = await fetch(weatherApi, init)
  const weatherRes = await res.json()

  return weatherRes.data
}

module.exports = {
  askAi,
  getAddress,
  getWeather
}
