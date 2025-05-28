import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import type { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../config/prisma";
import type { GetTransactionsQuery } from "../../schemas/transaction.schema";
import type { TrasactionFilter } from "../../types/transaction.type";
dayjs.extend(utc);
const getTransactions = async (
  request: FastifyRequest<{ Querystring: GetTransactionsQuery }>,
  reply: FastifyReply,
): Promise<void> => {
  const userId = "sdfsdff45a346AF4";

  if (!userId) {
    reply.status(401).send({ error: "Usuario não autenticado" });
    return;
  }
  const { categoryId, type, month, year } = request.query;

  const filters: TrasactionFilter = { userId };

  if (month && year) {
    const startDate = dayjs.utc(`${year}-${month}-01`).startOf("month").toDate();
    const endDate = dayjs.utc(startDate).endOf("month").toDate();
    filters.date = { gte: startDate, lte: endDate };
  }

  if (categoryId) {
    filters.categoryId = categoryId;
  }
  if (type) {
    filters.type = type;
  }
  try {
    const transactions = await prisma.transaction.findMany({
      where: filters,
      orderBy: { date: "desc" },
      include: {
        category: {
          select: {
            color: true,
            name: true,
            type: true,
          },
        },
      },
    });
    reply.send(transactions);
  } catch (err) {
    request.log.error("Erro ao trazer transações", err);
    reply.status(500).send({ error: "Erro do servidor" });
  }
};

export default getTransactions;
