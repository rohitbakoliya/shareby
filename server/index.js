/* eslint-disable import/first */
import '@babel/polyfill';
import express from 'express';
import path from 'path';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig();
import expressStaticGzip from 'express-static-gzip';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import routes from './routes/index.routes';
import * as errorHandler from './middlewares/errorHandler';
import './config/db';

const PORT = process.env.PORT || 5000;

const app = express();

// express setting
app.set('env', process.env.NODE_ENV);

// middlewares
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '10kb' }));
if (app.get('env') === 'development') {
  app.use(morgan('dev'));
}
app.use(mongoSanitize()); // sanitizes user-supplied data to prevent MongoDB Operator Injection.

// rate limiter
app.set('trust proxy', 1);
app.use(
  '/api/',
  rateLimit({
    windowMs: 30 * 60 * 1000, // 30 mins
    max: 300,
  })
);

app.use(compression()); // compress response bodies

// api routing
app.use('/api', routes);

const cacheAge = 7 * 24 * 60 * 60 * 1000;
// to serve gzipped React app
if (app.get('env') === 'production') {
  app.use(
    '/',
    expressStaticGzip('client/build', {
      serveStatic: { maxAge: cacheAge, cacheControl: true },
    })
  );
  app.get('/*', function (_req, res) {
    res.sendFile(path.join(__dirname, '../client/build/index.html'), err => {
      if (err) {
        res.status(500).send(err);
      }
    });
  });
}
// Error Handler Middleware
app.use(errorHandler.notFoundErrorHandler);
app.use(errorHandler.genericErrorHandler);
app.use(errorHandler.methodNotAllowed);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
