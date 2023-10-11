## Preface

This is my first time using Nest.js, I came across it a few months ago but never got the chance to try it out, and so I
thought this might be the perfect opportunity - or not!

### Assumptions & Guiding Principles

- We will be able to dictate to the API consumers how we expect dates e.g. pass dates as encoded strings
- Skinny controllers, skinny repositories, fat services
- If you have limited time, prefer e2e tests over integration/unit specifically for APIs

### Repo

I've reorganised things to make it neater following a clear mono-repo strategy.

### Setup

I've setup a network so all containers can communicate with each other but we only surface up `nginx:80` for public
use:

- `nginx`
    - Web server, port 80,
    - Reverse proxy setup with upstream possibility to setup multiple instances
- `api`
    - Nest.js API, no external ports,
- `db`
    - DB, no external ports
- `redis`
    - Redis, no external ports

### API

- `GET http://localhost/vehicle-states/3?timestamp=2022-09-12%2010%3A00%3A00%2B00`

**Response:**

```json
{
  "vehicleId": 3,
  "state": "selling",
  "timestamp": "2022-09-11 23:21:38+00"
}
```

## App

- `./api`
    - Setup the `.env` file from the `.env.example` - if it hasn't been done so already
- `./db`
    - Setup the `.env` file from the `.env.example` - if it hasn't been done so already

**Run:**

```
docker-compose up -d --build
```

## Tests

For brevity, my focus was on the e2e tests, though, I did go back and add unit/integration tests, you'll need to set `api` target to dev, rebuild, and then run:

**Run:**

```
npm run test # unit + integration
npm run test:e2e # e2e
```
