import { NotificationJobData } from "background/producers/notifications.producer";
import { Worker, Job } from "bullmq";
import { redisClient } from "database/clients/redis";
import { notificationRepository } from "modules/notifications/repository/notification.repository";

const QUEUE_NAME = "notifications";

const processor = async (job: Job<NotificationJobData>) => {
  // --- Adicionar Logs --- //
  console.log(`Processando job ${job.id} ${job.name}`);
  const { related_user_id, ...notificationData } = job.data;

  try {
    await notificationRepository.create({
      ...notificationData,
      related_user_id: related_user_id,
    });
  } catch (error) {
    // --- Adicionar Logs --- //
    console.error(`Falha ao processar job ${job.id}:`, job.data, error);
    throw error;
  }
};

export const createNotificationWorker = () => {
  const worker = new Worker(QUEUE_NAME, processor, {
    connection: redisClient,
    concurrency: 5,
  });

  // --- Adicionar Logs --- //

  // worker.on("completed", (job: Job) => {
  //   console.log(`✅ Job ${job.id} completado com sucesso!`);
  // });

  // worker.on("failed", (job, err) => {
  //   if (job) {
  //     console.error(`❌ Job ${job.id} falhou com erro: ${err.message}`);
  //   }
  // });

  // console.log(`📬 Worker de notificação conectado a fila: ${QUEUE_NAME}`);
  return worker;
};
