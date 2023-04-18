import { Express } from "express";
import { checkApiKey } from "../middleware/checkApiKey";
import checkAuth from "../middleware/checkAuth";
import { role } from "../data/role";
import {
  handleCreateExercice,
  handleGetAllExercice,
  handleGetExerciceById,
} from "../controller/exercice.controller";
import validateRequest from "../middleware/validateRequest";
import { createExerciceSchema } from "../schema/exercice.schema";

export default (app: Express) => {
  app.get(
    "/api/get/exercice",
    checkApiKey,
    checkAuth(role.USER),
    handleGetAllExercice
  );

  //get one exercice by id
  app.get(
    "/api/get/exercice/:id",
    checkApiKey,
    checkAuth(role.USER),
    handleGetExerciceById
  );

  //create exercice
  app.post(
    "/api/create/exercice",
    checkApiKey,
    checkAuth(role.USER),
    validateRequest(createExerciceSchema),
    handleCreateExercice
  );
};
