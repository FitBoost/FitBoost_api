import { Express, Request, Response } from "express";
import {
  createUserHandler,
  getCurrentUserHandler,
  loginUserHandler,
} from "./controller/user.controller";
import { checkApiKey } from "./middleware/checkApiKey";
import checkAuth from "./middleware/checkAuth";
import validateRequest from "./middleware/validateRequest";
import { createUserSchema, loginUserSchema } from "./schema/user.schema";

export default (app: Express) => {
  app.get("/", checkApiKey, (req: Request, res: Response) => {
    req;
    res.status(404).json({
      message: "Route GET:/ not found",
      error: "Not Found",
      statusCode: 404,
    });
  });

  // Register User
  app.post(
    "/api/auth/register",
    checkApiKey,
    validateRequest(createUserSchema),
    createUserHandler
  );

  // Login User
  app.post(
    "/api/auth/login",
    checkApiKey,
    validateRequest(loginUserSchema),
    loginUserHandler
  );

  //check auth
  app.get("/api/auth", checkApiKey, checkAuth(), getCurrentUserHandler);
};
