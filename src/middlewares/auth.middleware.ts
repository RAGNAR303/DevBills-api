import type { FastifyReply, FastifyRequest } from "fastify";
import admin from "firebase-admin";

declare module "fastify" {
  interface FastifyRequest {
    userId?: string;
  }
}

export const authMiddleware = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> => {
  const authHeader = request.headers.authorization;



  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    reply.code(401).send({ error: "token de autorização não fornecido" });
    return;
  }

  const token = authHeader.replace("Bearer ", "");
  
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);

   
    console.log("✅ Token verificado:", decodedToken);
    request.userId = decodedToken.uid;
  } catch (error: unknown) {
    const err = error as Error;
    console.error("❌ Erro ao verificar token:", err.message);
    reply.code(401).send({ error: "Token inválido ou expirado", firebaseError: err.message });
    return;
  }
};
