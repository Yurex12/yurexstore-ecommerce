import { Queue } from 'bullmq';

import { connection } from '../config/redisConnection';

export const paymentQueue = new Queue('payments', {
  connection: {
    host: process.env.REDIS_HOST!,
    port: Number(process.env.REDIS_PORT!),
  },
});
