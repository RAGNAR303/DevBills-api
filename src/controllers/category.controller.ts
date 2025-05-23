import type { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../config/prisma";

export const getCategories = async (
  request: FastifyRequest,
  replay: FastifyReply,
): Promise<void> => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });

    replay.send(categories);
  } catch (err) {
    request.log.error("Erro ao buscar categorias", err);
    replay.status(500).send({ error: "Erro ao buscar categorias" });
  }
};
