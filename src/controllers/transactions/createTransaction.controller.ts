
import type { FastifyReply, FastifyRequest } from "fastify";

const createTransaction = async (
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> => {
    const userId = "sdfsdff45a346AF4"  // user.id => vai vir de request.userId
    if(!userId){
        reply.status(401).send({error: 'Usuario nçao autenticado'})
    }

// Validação dos dados

};

export default createTransaction;


/*void - vazia    */