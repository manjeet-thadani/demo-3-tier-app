# Image of the Hour - Cat Version

## Introduction
This repository contains a website that shows an image of the cat of the hour.
1. Web application based on Angular. It should show a cat of the hour by calling an API
2. A simple Node.js application that serves the image of the day.
3. Write a simple Node.js API that sends the image of the hour. It should be read from a MongoDB database and cached in a Redis cache for 1hour.


## Directory Structure

- `./frontend`: contains a simple angular website that fetches the image-of-the-hour from the Nodejs backend
- `./frontend/assets`: cat images that would be returned by the backend. NOTE: These images are kept in the codebase just for reference, the backend would return a URL that points to the hosted version of these images

- `./backend`: contains Nodejs backend codebase that contains an API to return image-of-the-hour
- `./backend/k8`: contains helm chart to deploy this backend application to Kubernetes

## Local Setup

### Prerequisite
- Tools: [Nodejs](https://nodejs.org/en/download/), [Docker](https://docs.docker.com/get-docker/), [docker-compose](https://docs.docker.com/compose/install/)


### Step 1: (optional) Upload the assets to some public storage [google drive, S3, or other]

Upload imaged stored in `application/frontend/assets/` folder to assets public storage. After uploading, make sure you have public URLs for all the images.

### Step 2: Setup MongoDB
Run the following command to start the MongoDB docker container:

```bash
$ cd ./application
$ docker-compose up -d mongo
```

Exec into MongoDB container:

```bash
$ docker exec -it mongo bash
```

Login into MongoDB and seed URLs in the collection: 
```bash
$ mongo admin -u demo -p 'demo'

> use demo;
> db.createCollection('images');

> db.images.insertMany([
    { image: "https://d3gpownff003dw.cloudfront.net/images/01.jpg" },
    { image: "https://d3gpownff003dw.cloudfront.net/images/02.jpeg" },
    { image: "https://d3gpownff003dw.cloudfront.net/images/03.jpg" },
    { image: "https://d3gpownff003dw.cloudfront.net/images/04.jpg" },
    { image: "https://d3gpownff003dw.cloudfront.net/images/05.jpg" },
    { image: "https://d3gpownff003dw.cloudfront.net/images/06.jpg" },
    { image: "https://d3gpownff003dw.cloudfront.net/images/07.jpg" },
    { image: "https://d3gpownff003dw.cloudfront.net/images/08.avif" },
]);
```

**NOTE:** If you have uploaded images to your own public storage then replace the URLs in the insert command with your image URLs


### Step 3: Start Backend Server

```bash
$ cd ./application
$ docker-compose up backend
```

Once the backend is running, try to access this URL on the browser `http://localhost:3001/api/v1/hour-image`. It should return one of the URLs that was inserted in the database.

### Step 3: Start Backend Server

```bash
$ cd ./application/frontend

$ npm install -g @angular/cli
$ npm install
$ ng serve -o
```
