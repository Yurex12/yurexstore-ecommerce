import IOredis from 'ioredis';

export const connection = new IOredis({
  maxRetriesPerRequest: null,
  host: process.env.REDIS_HOST!,
  port: Number(process.env.REDIS_PORT!),
});

connection.on('error', (err) => console.error('Redis Error:', err));
connection.on('connect', () => console.log('✅ Connected to Redis'));
