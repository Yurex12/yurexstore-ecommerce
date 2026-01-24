import Redis from 'ioredis';

export const connection = new Redis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: null,
});

connection.on('error', (err) =>
  console.error('❌ Redis Connection Error:', err),
);
connection.on('connect', () => console.log('✅ Connected to Upstash Redis'));
