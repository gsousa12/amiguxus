import { notificationQueue } from "background/queues/notifications.queue";
import { JobsOptions } from "bullmq";

export interface NotificationJobData {
  title: string;
  message: string;
  related_user_id: string;
}

const defaultJobOptions: JobsOptions = {
  attempts: 10,
  backoff: {
    type: "exponential",
    delay: 5000,
  },
  removeOnComplete: true,
  removeOnFail: false,
};

export async function addNotificationJob(data: NotificationJobData) {
  await notificationQueue.add("create-notification", data, defaultJobOptions);
}
