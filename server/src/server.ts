import { applicationBuilder } from "./app.builder";
import { workersBuilder } from "workers.builder";

const build = async () => {
  try {
    console.log("Iniciando aplicação...");
    const application = await applicationBuilder();
    workersBuilder();
    const port = Number(process.env.PORT) || 3333;

    await application.listen({
      port: port,
      host: "0.0.0.0",
    });

    console.log(`🌟 Aplicação iniciada no ambiente: ${process.env.NODE_ENV}`);

    console.log(`🚀 Servidor rodando em http://localhost:${port}`);
  } catch (error) {
    console.error("❌ Falha ao iniciar o servidor.");
    console.error(error);
    process.exit(1);
  }
};

build();
