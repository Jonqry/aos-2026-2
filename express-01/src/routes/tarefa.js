import { Router } from "express";
import { tarefaController } from "../controllers/index.js";
import { validateMiddleware } from "../middlewares/index.js";
import {
  tarefaParamsSchema,
  criarTarefaSchema,
  atualizarTarefaSchema,
} from "../schemas/index.js";

const router = Router();

router.get("/", tarefaController.listarTarefas);
router.get(
  "/:objectId",
  validateMiddleware({ params: tarefaParamsSchema }),
  tarefaController.buscarTarefa,
);
router.post(
  "/",
  validateMiddleware({ body: criarTarefaSchema }),
  tarefaController.criarTarefa,
);
router.put(
  "/:objectId",
  validateMiddleware({ params: tarefaParamsSchema, body: atualizarTarefaSchema }),
  tarefaController.atualizarTarefa,
);
router.delete(
  "/:objectId",
  validateMiddleware({ params: tarefaParamsSchema }),
  tarefaController.removerTarefa,
);

export default router;
