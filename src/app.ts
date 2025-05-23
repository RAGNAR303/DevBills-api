import Fastify from "fastify";
import type { FastifyInstance } from "fastify";
import routes from "./routes/index";

const app: FastifyInstance = Fastify({
  logger: true,
});

app.register(routes, { prefix: "api" });

export default app;
/*  
prefix

localhost:3001/api/categories
apidevbills.com.br/api/categories

*/
