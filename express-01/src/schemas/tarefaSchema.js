import { z } from "zod";

const descricao = z
  .string({
    error: (issue) =>
      issue.input === undefined
        ? "O campo 'descricao' é obrigatório."
        : "O campo 'descricao' deve ser um texto.",
  })
  .trim()
  .min(1, { error: "O campo 'descricao' não pode ser vazio." })
  .max(255, { error: "O campo 'descricao' deve ter no máximo 255 caracteres." });

const concluida = z.boolean({
  error: "O campo 'concluida' deve ser um booleano (true ou false).",
});

export const tarefaParamsSchema = z.object({
  objectId: z.uuid({
    error: "O parâmetro 'objectId' deve ser um UUID válido.",
  }),
});

export const criarTarefaSchema = z.object({
  descricao,
  concluida: concluida.default(false),
});

export const atualizarTarefaSchema = z
  .object({
    descricao: descricao.optional(),
    concluida: concluida.optional(),
  })
  .refine(
    (dados) => dados.descricao !== undefined || dados.concluida !== undefined,
    { error: "Informe ao menos um campo para atualizar: 'descricao' ou 'concluida'." },
  );
