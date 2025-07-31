import { applicationBuilder } from "./builder";

const build = async () => {
  try {
    console.log("Iniciando aplicação...");
    const application = applicationBuilder();

    const port = Number(process.env.PORT) || 3000;

    await application.listen({
      port: port,
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
