import mongoose from 'mongoose';

import { app } from './app';

const start = async () => {
  console.log('Starting up......');
  if (!process.env.JWT_KEY) {
    // checking if env var is defined, otherwise we get error in signup.ts when providing variable to userJwt
    throw new Error('env var not defined');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  try {
    console.log('Trying to connect to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to mongoDB');
  } catch (err) {
    console.error(err);
  }

  app.listen('3000', () => {
    console.log('server listening on port 3000 Humans !');
  });
};

start();
