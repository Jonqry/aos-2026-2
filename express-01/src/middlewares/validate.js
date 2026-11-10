// Valida partes da requisição (params e/ou body) com schemas do Zod.
// Em caso de falha, o ZodError é lançado e tratado no middleware global de erro.
const validateMiddleware =
  ({ params, body } = {}) =>
  (req, res, next) => {
    if (params) {
      params.parse(req.params);
    }
    if (body) {
      // o body passa a conter apenas os campos conhecidos, já com os valores padrão
      req.body = body.parse(req.body ?? {});
    }
    next();
  };

export default validateMiddleware;
