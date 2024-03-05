# [Pawlert](https://pawlert.co)

Integrated with a smart tracking collar, Pawlert functions as a tracking system designed to aid pet owners in identifying potential risks of heat stroke in their dogs. This is achieved through real-time data collected by the collar and synchronized with the accompanying mobile app.

Real-time monitoring of your dog's body temperature and heart rate, with data transmitted directly to the mobile app.
Safety notifications categorized as `Normal` / `Caution` / `Fatal` alert users when readings deviate from the safe "Normal" range.
Objective: Detect early signs of overheating by tracking changes in body temperature and heart rate.

Utilizes the user's location to provide weather advisories, assessing the safety of outdoor conditions for dogs based on temperature and humidity.
Advisories color-coded into 4 levels: `Safe` / `Caution` / `Risky` / `Dangerous`, conveyed in a conversational tone from the perspective of a pet addressing its owner.
Objective: Recommend minimizing a dog's exposure to hot conditions.

## Development Process

### UI / UX Exploration

Researched information on heat stroke in dogs from academic sources, statistics, and veterinary clinic websites. Drew inspiration from infographics, Behance projects, and Pinterest for interactive design concepts.

### Design Iterations with Figma

Utilized Figma to develop low-fidelity, mid-fidelity, and high-fidelity prototypes, enabling collaborative design iterations. This streamlined process ensured the creation of a refined and user-centric interface within the allotted timeframe.

### Frontend

Implemented using HTML, CSS, and JavaScript. Utilized the data retrived by the internal API containing weather and pet information. Despite our desire to create a mobile app, it was acknowledged that none of us possessed sufficient experience to justify its immediate implementation. Therefore, the decision was made to prioritize a web-based approach.

### Backend

The backend was constructed with Cloudflare Workers, requiring the creation of JavaScript code to establish API endpoints for managing incoming requests. In these scripts, we acquired pet and weather data from external origins, incorporated the Cloudflare AI model for data analysis, and interpreted the outcomes to ascertain pet safety in accordance with health information and prevailing weather conditions

The main logic is powered by the API constructed with Cloudflare Workers and Hono. It integrates external data sources obtained through a smart collar and weather API. This data is analyzed using a Large Language Model (LLM) configured via Cloudflare's Workers AI (currently consuming Meta’s llama2 LLM model), to assess pet safety based on health metrics and weather conditions. Additionally, we Google Maps Geocoding API is used for location conversion from grographic coordinates into a physical address, and then provided to the AI model for location recommendations.

## API

The following routes are available:

1. `POST /api/health`

Sample request:

```
curl --location 'https://pawlert-api.kjgamis.workers.dev/api/health' \
--header 'Content-Type: application/json' \
--data '{
    "location": {
        "latitude": -33.910728,
        "longitude": 151.199763
    },
    "pet": {
        "name": "Dapper",
        "img": "https://storage.googleapis.com/witalk-411901.appspot.com/static/images/dapper.jpg",
        "breed": "Scottish Terrier",
        "age": 1.5,
        "weight": 22,
        "heartRate": 120,
        "bodyTemperature": 40
    }
}'
```

Sample Response:

```
{
    "status": 200,
    "data": {
        "weather": {
            "address": "54 Queen St",
            "city": "AU",
            "time": "2024-02-20 06:00:00",
            "temperature": 20.6,
            "humidity": 85.2,
            "weatherSafelyLevel": "Safe"
        },
        "pet": {
            "name": "Dapper",
            "image": "https://storage.googleapis.com/witalk-411901.appspot.com/static/images/dapper.jpg",
            "age": 1.5,
            "breed": "Scottish Terrier",
            "bodyTemperature": 40,
            "heartRate": 120,
            "heartRateLevel": "Normal",
            "bodyTempLevel": "Normal"
        }
    }
}
```

2. `POST /api/location`

Sample request:

```
curl --location 'https://pawlert-api.kjgamis.workers.dev/api/location' \
--header 'Content-Type: application/json' \
--data '{
    "weather": {
        "address": "54 Queen St",
        "city": "AU",
        "time": "2024-02-18 14:00:00",
        "temperature": 24.4,
        "humidity": 85.5,
        "weatherSafelyLevel": "Safe"
    }
}'
```

Sample Response:

```
{
    "status": 200,
    "data": {
        "weather": {
            "address": "54 Queen St",
            "city": "AU",
            "time": "2024-02-18 14:00:00",
            "temperature": 24.4,
            "humidity": 85.5,
            "weatherSafelyLevel": "Safe"
        },
        "locations": [
            {
                "name": "Queen Victoria Gardens",
                "address": "1000 Queen St W, Melbourne, VIC 3000"
            },
            {
                "name": "Alexander Gardens",
                "address": "500 Spencer St, Melbourne, VIC 3000"
            },
            {
                "name": "Federation Square",
                "address": "Flinders St, Melbourne, VIC 3000"
            }
        ]
    }
}
```

### Run locally

#### Backend API

1. add API keys in `wrangler.toml` (do not commit this)

``` yaml
# ...
[vars]
KEY1=""
KEY2=""
```

2. Enter server and run start script

``` shell
cd server
npm run dev
```

### Deployment

The front end and backend are deployed separately on Cloudflare.

#### Backend API
``` shell
cd server
npm run deploy
```

#### Resources
- https://aqicn.org/api/
- https://developers.google.com/maps