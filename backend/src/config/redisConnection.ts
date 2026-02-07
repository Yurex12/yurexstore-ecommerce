import Redis from 'ioredis';

export const connection = new Redis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: null,

  retryStrategy: (times) => {
    return Math.min(times * 50, 2000);
  },

  keepAlive: 10000,
});

connection.on('error', (err) =>
  console.error('❌ Redis Connection Error:', err.message),
);

connection.on('connect', () => console.log('✅ Connected to Redis Cloud'));
