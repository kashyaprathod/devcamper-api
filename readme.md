# DevCamper API

> Backend API for DevCamper application, which is a bootcamp directory website

## Usage

Rename "config/config.env.env" to
"config/config-env" and update the values/settings to your own

## Install Dependencies

```
npm install
```

## Run App

```
# Run in dev mode
npm run dev

# Run in prod mode
npm start
```

## Databse seeder

To seed the database with bootcamps, users, courses and reviews with data from the "\_data" folder, run

```
# Destroy all data
node seeder -d

#Import all data
node seeder -i
```

## Demo

To view documentation with examples [click here](https://documenter.getpostman.com/view/23387801/2sA3QmDEQo#5165599c-622f-4be0-93d5-6f97537e2f2b)

- Version : 1.0.0
- Licence : MIT
- Author : Kashyap Rathod
