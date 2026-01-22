import IOredis from 'ioredis';

export const connection = new IOredis({
  maxRetriesPerRequest: null,
  host: process.env.REDIS_HOST!,
  port: Number(process.env.REDIS_PORT!),
});
