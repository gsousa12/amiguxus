import { createNotificationWorker } from "background/workers/notifications.worker";

export const workersBuilder = () => {
  try {
    console.log("Inicializando worker de notificações...");
    createNotificationWorker();
  } catch (error) {
    throw new Error("❌ Falha ao iniciar workers");
  }
};
