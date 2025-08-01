import { Queue } from "bullmq";
import { redisClient } from "database/clients/redis";

export const notificationQueue = new Queue("notifications", {
  connection: redisClient,
  defaultJobOptions: {
    removeOnComplete: {
      count: 1000,
    },
    removeOnFail: {
      count: 5000,
    },
  },
});
