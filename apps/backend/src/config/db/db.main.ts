import mongoose from 'mongoose';
import { getEnvVar } from '../../utils/getEnvVar';

const MAIN_DB_URI = getEnvVar('MONGO_MAIN_URI');

export const connectMainDB = async () => {
  try {
    await mongoose.connect(String(MAIN_DB_URI));
    console.log('Connected to Main MongoDB');
  } catch (error) {
    console.log('Error connecting to main MongoDB', error);
    process.exit(1);
  }
};
