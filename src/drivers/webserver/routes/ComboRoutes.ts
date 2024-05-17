import { FastifyInstance } from "fastify";

import { ComboController } from "@/adapters/controllers/combo/ComboController";
import { createComboDocSchema } from "@/adapters/controllers/combo/schemas/CreateComboSchema";
import { getComboByIdDocSchema } from "@/adapters/controllers/combo/schemas/GetComboByIdSchema";
import { getCombosDocSchema } from "@/adapters/controllers/combo/schemas/GetCombosSchema";
import { CreateComboPresenter } from "@/adapters/presenters/combo/CreateComboPresenter";
import { GetComboByIdPresenter } from "@/adapters/presenters/combo/GetComboByIdPresenter";
import { GetCombosPresenter } from "@/adapters/presenters/combo/GetCombosPresenter";
import {
  makeComboRepository,
  makeProductRepository,
} from "@/adapters/repositories/PrismaRepositoryFactory";
import { ComboUseCase } from "@/core/useCases/combo/ComboUseCase";

export async function ComboRoutes(app: FastifyInstance) {
  const comboController = new ComboController(
    new ComboUseCase(makeComboRepository(), makeProductRepository()),

    new GetCombosPresenter(),
    new GetComboByIdPresenter(),
    new CreateComboPresenter()
  );

  app.get("", {
    schema: getCombosDocSchema,
    handler: comboController.getCombos.bind(comboController),
  });

  app.get("/:id", {
    schema: getComboByIdDocSchema,
    handler: comboController.getComboById.bind(comboController),
  });

  app.post("", {
    schema: createComboDocSchema,
    handler: comboController.createCombo.bind(comboController),
  });
}
