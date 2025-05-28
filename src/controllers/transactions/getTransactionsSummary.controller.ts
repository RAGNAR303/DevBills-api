import { TransactionType } from "@prisma/client";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import type { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../config/prisma";
import type { GetTransactionsSummaryQuery } from "../../schemas/transaction.schema";
import type { CategorySummary } from "../../types/category.types";
import type { TrasactionSummary } from "../../types/transaction.type";

dayjs.extend(utc);
export const getTransactionsSummary = async (
  request: FastifyRequest<{ Querystring: GetTransactionsSummaryQuery }>,
  reply: FastifyReply,
): Promise<void> => {
  const userId = "sdfsdff45a346AF4";

  if (!userId) {
    reply.status(401).send({ error: "Usuario não autenticado" });
    return;
  }

  const { month, year } = request.query;

  if (!month || !year) {
    reply.status(400).send({ error: "Mes e Ano são obrigatório" });
    return;
  }

  const startDate = dayjs.utc(`${year}-${month}-01`).startOf("month").toDate();
  const endDate = dayjs.utc(startDate).endOf("month").toDate();

  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },

      include: {
        category: true,
      },
    });

    let totalExpenses = 0;
    let totalIncomes = 0;
    const groupedExpenses = new Map<string, CategorySummary>();

    for (const transaction of transactions) {
      if (transaction.type === TransactionType.expense) {
        // Total de transações para cada categoria =
        const existing = groupedExpenses.get(transaction.categoryId) ?? {
          categoryId: transaction.categoryId,
          categoryName: transaction.category.name,
          categoryColor: transaction.category.color,
          amount: 0,
          percentage: 0,
        };
        // Total de transações para cada tipo categoria
        existing.amount += transaction.amount;
        groupedExpenses.set(transaction.categoryId, existing);

        // Total de transações do tipo expense = dispesas
        totalExpenses += transaction.amount;
      } else {
        // Total de transações do tipo incomes = rendimentos
        totalIncomes += transaction.amount;
      }
    }

    console.log(Array.from(groupedExpenses.values()));
    const summary: TrasactionSummary = {
      totalExpenses,
      totalIncomes,
      balance: Number((totalIncomes - totalExpenses).toFixed(2)),
      expensesByCategory: Array.from(groupedExpenses.values())
        .map((entry) => ({
          ...entry,
          percentage: Number.parseFloat(((entry.amount / totalExpenses) * 100).toFixed(2)),
        }))
        .sort((a, b) => b.amount - a.amount),
    };

    console.log({ totalExpenses, totalIncomes, groupedExpenses });
    reply.send(summary);
  } catch (err) {
    request.log.error("Erro ao trazer transações", err);
    reply.status(500).send({ error: "Erro do servidor" });
  }
};
