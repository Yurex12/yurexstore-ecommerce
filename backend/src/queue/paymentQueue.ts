import { Queue } from 'bullmq';

import { connection } from '../config/redisConnection';

export const paymentQueue = new Queue('payments', { connection });
