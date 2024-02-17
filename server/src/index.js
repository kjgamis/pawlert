import { Ai } from '@cloudflare/ai';

const API_KEY = "d9442ae097e08ac8353888ae1852995b737e4851"

export default {
  async fetch(request, env) {
    let endpoint = "https://api.waqi.info/feed/geo:";
    const token = API_KEY;
    let html_style = `body{padding:6em; font-family: sans-serif;} h1{color:#f6821f}`;

    let html_content = "<h1>Weather 🌦</h1>";

    const latitude = 43.642567;
    const longitude = -79.387054;
    endpoint += `${latitude};${longitude}/?token=${token}`;
    const init = {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    };

    const response = await fetch(endpoint, init);
    const content = await response.json();

    let city = content.data.city.name;
    let temperature = content.data.iaqi.t?.v;
    let aqiLevel = content.data.aqi;
    let ozone = content.data.iaqi.o3?.v;
    let time = content.data.time.s;

    const ai = new Ai(env.AI);
    let answer;

    if (temperature && city && ozone && aqiLevel) {
      let prompt = `The real time weather temperature in ${city} at ${time} is ${temperature}degC, the ozone level is ${ozone} and the AQI level is ${aqiLevel}. Is it safe to walk my dog?`
      console.log('prompt ********', prompt)
      answer = await ai.run(
        '@cf/meta/llama-2-7b-chat-int8',
        {
          messages: [
            { 
              role: 'user',
              content: prompt }
          ]
        }
      )
    }

    html_content += `<p>This is a demo using Workers geolocation data. </p>`;
    html_content += `You are located at: ${latitude},${longitude}.</p>`;
    html_content += `<p>Based off sensor data from <a href="${content.data.city.url}">${content.data.city.name}</a>:</p>`;
    html_content += `<p>Current time is: ${time}</p>`;
    html_content += `<p>The AQI level (Real-time air quality information.) is: ${aqiLevel}.</p>`;
    html_content += `<p>The N02 level is: ${content.data.iaqi.no2?.v}.</p>`;
    html_content += `<p>The O3 level (Ozone forecast) is: ${ozone}.</p>`;
    html_content += `<p>The temperature is: ${temperature}°C.</p>`;

    if (answer) {
      html_content += `<p>Recomendation: ${JSON.stringify(answer.response)}</p>`
    }

    let html = `
      <!DOCTYPE html>
      <head>
        <title>Geolocation: Weather</title>
      </head>
      <body>
        <style>${html_style}</style>
        <div id="container">
        ${html_content}
        </div>
      </body>`;

    return new Response(html, {
      headers: {
        "content-type": "text/html;charset=UTF-8",
      },
    });
  },
};
