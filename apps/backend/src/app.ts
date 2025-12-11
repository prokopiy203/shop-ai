import { startServer } from './server';
import { connectMainDB } from './core/db/db.main';
import { connectAiDB } from './core/db/db.ai';

const bootstrap = async () => {
  await connectMainDB();
  await connectAiDB();
  startServer();
};

bootstrap();
