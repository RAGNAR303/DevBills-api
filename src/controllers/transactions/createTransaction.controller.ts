import type { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../config/prisma";
import { createTransactionSchema } from "../../schemas/transaction.schema";

const createTransaction = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  const userId = "sdfsdff45a346AF4"; // user.id => vai vir de request.userId
  if (!userId) {
    reply.status(401).send({ error: "Usuario não autenticado" });
    return;
  }
  const result = createTransactionSchema.safeParse(request.body);

  // Validação dos dados
  if (!result.success) {
    const erroMessage = result.error.errors[0].message || "Validação inválida";

    reply.status(400).send({ error: erroMessage });
    return;
  }

  const transaction = result.data;

  try {
    const category = await prisma.category.findFirst({
      where: {
        id: transaction.categoryId,
        type: transaction.type,
      },
    });

    if (!category) {
      reply.status(400).send({ error: "Categoria inválida" });
      return;
    }
    const parseDate = new Date(transaction.date);

    const newTransaction = await prisma.transaction.create({
      data: {
        ...transaction,
        userId,
        date: parseDate,
      },
      include: {
        category: true,
      },
    });

    reply.status(201).send(newTransaction);
  } catch (err) {
    request.log.error("Erro ao criar trasação", err);
    reply.status(500).send({ error: "Erro interno no servidor" });
  }
};

export default createTransaction;

/*void - vazia    */
