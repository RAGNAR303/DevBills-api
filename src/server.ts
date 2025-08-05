import app from "./app";
import { env } from "./config/env";
import initializeFirebaseAdmin from "./config/firebase";
import { prismaConnect } from "./config/prisma";
import { initializeGlobalCategories } from "./services/globalCategories.service";

const PORT = env.PORT;

// dica chat
initializeFirebaseAdmin();
console.log("✅ Firebase Admin inicializado");

const starServer = async () => {
  try {
    await prismaConnect();

    await initializeGlobalCategories();

    await app.listen({ port: PORT }).then(() => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Erro ao iniciar o servidor:", error);
  }
};
starServer();
