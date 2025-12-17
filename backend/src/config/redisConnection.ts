import IOredis from 'ioredis';

export const connection = new IOredis({
  maxRetriesPerRequest: null,
});
