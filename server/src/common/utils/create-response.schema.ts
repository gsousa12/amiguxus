import { TSchema, Type } from "@sinclair/typebox";

/**
 * Envolve um schema TypeBox em uma estrutura de resposta padrão { data: ... }.
 * Isso padroniza as respostas da API e evita repetição.
 *
 * @param schema O schema TypeBox para os dados da resposta.
 * @returns Um novo schema TypeBox com a estrutura { data: schema }.
 */
export const createResponseSchema = <T extends TSchema>(schema: T) => {
  return Type.Object({
    data: schema,
  });
};
