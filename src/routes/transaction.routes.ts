import type { FastifyInstance } from "fastify";
import { zodToJsonSchema } from "zod-to-json-schema";
import createTransaction from "../controllers/transactions/createTransaction.controller";
import { deleteTransaction } from "../controllers/transactions/deleteTransaction.controller";
import { getHistoricalTransactions } from "../controllers/transactions/getHistoricalTransactions.controller";
import getTransactions from "../controllers/transactions/getTransactions.controller";
import { getTransactionsSummary } from "../controllers/transactions/getTransactionsSummary.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  createTransactionSchema,
  deleteTransactionSchema,
  getHistoricalTransactionsSchema,
  getTransactionSchema,
  getTransactionsSummarySchema,
} from "../schemas/transaction.schema";
const transactionRoutes = async (fastify: FastifyInstance) => {
  fastify.addHook("preHandler", authMiddleware);

  // CRIAÇÃO
  fastify.route({
    method: "POST",
    url: "/",
    schema: {
      body: zodToJsonSchema(createTransactionSchema),
    },
    handler: createTransaction,
  });

  // BUSCAR COM FILTRO

  fastify.route({
    method: "GET",
    url: "/",
    schema: {
      // querystring => ?month=4&year=2025
      querystring: zodToJsonSchema(getTransactionSchema),
    },
    handler: getTransactions,
  });

  // BUSCAR O RESUMO
  fastify.route({
    method: "GET",
    url: "/summary",
    schema: {
      querystring: zodToJsonSchema(getTransactionsSummarySchema),
    },
    handler: getTransactionsSummary,
  });

  // BUSCAR O HISTORIO
  fastify.route({
    method: "GET",
    url: "/historical",
    schema: {
      querystring: zodToJsonSchema(getHistoricalTransactionsSchema),
    },
    handler: getHistoricalTransactions,
  });
  // Deletar Transações
  fastify.route({
    method: "DELETE",
    url: "/:id",
    schema: {
      params: zodToJsonSchema(deleteTransactionSchema),
    },
    handler: deleteTransaction,
  });
};

export default transactionRoutes;
