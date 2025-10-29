import express from 'express';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar';
import { corsOptions } from './config/corsOptions';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { isProd } from './config/environment';
import { limiter } from './config/rateLimit';
import { errorHandler } from './errors';

const PORT = Number(getEnvVar('PORT', 4000));
const COOKIE_SECRET = String(getEnvVar('COOKIE_SECRET'));
const NODE_ENV = getEnvVar('NODE_ENV', 'development');

const app = express();

app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

app.use(cors(corsOptions));

app.use(cookieParser(COOKIE_SECRET));

app.use(limiter);

app.use(morgan(isProd ? 'combined' : 'dev'));

app.use(compression());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
