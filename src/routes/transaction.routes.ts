import type { FastifyInstance } from "fastify";
import { zodToJsonSchema } from "zod-to-json-schema";
import createTransaction from "../controllers/transactions/createTransaction.controller";
import getTransactions from "../controllers/transactions/getTransactions.controller";
import { getTransactionsSummary } from "../controllers/transactions/getTransactionsSummary.controller";
import {
  createTransactionSchema,
  deleteTransactionSchema,
  getTransactionSchema,
  getTransactionsSummarySchema,
} from "../schemas/transaction.schema";
import { deleteTransaction } from "../controllers/transactions/deleteTransaction.controller";
const transactionRoutes = async (fastify: FastifyInstance) => {
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

  fastify.route({
    method: "DELETE",
    url:'/:id',
    schema:{
params: zodToJsonSchema(deleteTransactionSchema)
    },
    handler: deleteTransaction
  })
};

export default transactionRoutes;
