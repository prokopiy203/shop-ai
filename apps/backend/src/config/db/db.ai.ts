import mongoose from 'mongoose';
import { getEnvVar } from '../../utils/getEnvVar';

const AI_DB_URI = getEnvVar('MONGO_AI_URI');

export const connectAiDB = async () => {
  try {
    await mongoose.createConnection(String(AI_DB_URI));
    console.log('Connected to AI MongoDB');
  } catch (error) {
    console.log('Error connecting to AI MongoDB', error);
    process.exit(1);
  }
};
