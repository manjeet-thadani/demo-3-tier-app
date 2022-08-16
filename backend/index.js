// import packages
const express = require("express");
const redis = require("redis");
const cors = require('cors')
const { MongoClient } = require('mongodb');

const PORT = process.env.PORT || 3000;
const CACHE_KEY = 'IMAGE_OF_THE_HOUR';

// connect to redis
const redisClient = redis.createClient({ url: process.env.REDIS_URL });
redisClient.connect();

// connect to mongodb
const url = process.env.MONGO_URL;
const client = new MongoClient(url);
const dbName = process.env.MONGO_DB;

client.connect();
const db = client.db(dbName);
const collection = db.collection('images');

const app = express();
app.use(cors());

// cache middleware
async function cache(req, res, next) {
  const cachedData = await redisClient.get(CACHE_KEY);
  
  if (cachedData != null) {
    res.status(200).json(JSON.parse(cachedData));
  } else {
    next();
  }
}

async function getImageOfTheHour(req, res, next) {
  try {
    console.log("Fetching data...");

    const randomResult = await collection.aggregate([{ $sample: { size: 1 } }]).toArray()

    const data = {
      image: randomResult.length > 0 ? randomResult[0].image : ""
    }

    redisClient.set(CACHE_KEY, JSON.stringify(data), { EX: 3600 });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
}

app.get("/api/v1/hour-image", cache, getImageOfTheHour);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}...`);
});
