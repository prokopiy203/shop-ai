import { startServer } from './server';
import { connectMainDB } from './config/db/db.main';
import { connectAiDB } from './config/db/db.ai';

const bootstrap = async () => {
  await connectMainDB();
  await connectAiDB();
  startServer();
};

bootstrap();
