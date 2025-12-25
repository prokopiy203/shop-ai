import express from 'express';
import cors from 'cors';
import { getEnvVar } from '@/core/utils/getEnvVar';
import { corsOptions } from './core/config/corsOptions';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { isProd } from './core/config/environment';
import { limiter } from './core/config/rateLimit';
import { errorHandler } from './core/errors';
import globalRoutes from './api/routes/globalRoute';
import globalAdminRoutes from './admin/routes/globalAdminRoutes';
import aiTest from './modules/ai/chat/ai.routes';

const PORT = Number(getEnvVar('PORT', 4000));
const COOKIE_SECRET = String(getEnvVar('COOKIE_SECRET'));
const NODE_ENV = getEnvVar('NODE_ENV', 'development');

export const startServer = () => {
  const app = express();

  app.use(
    express.json({
      type: ['application/json', 'application/vnd.api+json'],
      limit: '5mb',
    }),
  );

  app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

  app.use(cors(corsOptions));

  app.use(cookieParser(COOKIE_SECRET));

  app.use(limiter);

  app.use(morgan(isProd ? 'combined' : 'dev'));

  app.use(compression());

  app.use('/api', globalRoutes);
  app.use('/admin', globalAdminRoutes);
  app.use('/ai', aiTest);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
  });
};
