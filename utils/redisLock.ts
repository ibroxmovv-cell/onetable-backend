export const acquireLock = async (redisClient: any, key: string, token: string, ttl = 15 * 60 * 1000) => {
  return await redisClient.set(key, token, 'PX', ttl, 'NX');
};

export const releaseLock = async (redisClient: any, key: string, token: string) => {
  const script = `
    if redis.call("get", KEYS[1]) == ARGV[1] then
      return redis.call("del", KEYS[1])
    else
      return 0
    end
  `;
  return await redisClient.eval(script, 1, key, token);
};
