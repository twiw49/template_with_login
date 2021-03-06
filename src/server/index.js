import mongoose from 'mongoose';
import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import request from 'request';
import renderPage from './renderPage';
import fetchData from './fetchData';
import auth from './routes/auth';
import api from './routes/api';

require('dotenv').config();

const { S3_BUCKET_URL, MONGODB_URL } = process.env;

process.on('unhandledRejection', reason => {
  console.log('Unhandled Rejection:', reason);
});

let isConnectedToDB = false;

const connectWithRetry = async () => {
  await mongoose.connect(
    MONGODB_URL,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false
    },
    error => {
      if (error) {
        console.log('ERROR: DB is not connected.');
        console.log(error);
        isConnectedToDB = false;
        setTimeout(connectWithRetry, 2000);
      } else {
        console.log('DB is connected.');
        isConnectedToDB = true;
      }
    }
  );
};

const app = express()
  .use(async (req, res, next) => {
    if (!isConnectedToDB) {
      await connectWithRetry();
    }
    next();
  })
  .use(morgan('dev'))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(cookieParser());

if (process.env.NODE_ENV === 'development') {
  const PORT = process.env.PORT || 3000;
  app
    .use('/static/', express.static('dist/public'))
    .listen(PORT, () => console.log(`Server Listening on Port : ${PORT}`));
}

if (process.env.NODE_ENV === 'production')
  app.get('/service-worker.js', (req, res) =>
    request(`${S3_BUCKET_URL}service-worker.js`).pipe(res)
  );

app
  .get('/manifest.json', (req, res) => request(`${S3_BUCKET_URL}manifest.json`).pipe(res))
  .use('/auth', auth)
  .use('/api', api)
  .use(fetchData())
  .get('*', renderPage);

module.exports = app;
