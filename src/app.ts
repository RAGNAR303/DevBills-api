import Fastify from "fastify";
import type { FastifyInstance } from "fastify";
import routes from "./routes/index";
import { env } from "./config/env";

const app: FastifyInstance = Fastify({
  logger: {
    level:env.NODE_ENV === "dev" ? "info" : "error",
  },
});

app.register(routes, { prefix: "api" });

export default app;
/*  
prefix

localhost:3001/api/categories
apidevbills.com.br/api/categories

*/
