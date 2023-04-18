import { Express, Request, Response } from "express";
import { checkApiKey } from "../middleware/checkApiKey";
import userRoute from "./userRoute";
import exerciceRoute from "./exerciceRoute";
import mediaRoute from "./mediaRoute";

export default (app: Express) => {
  app.get("/", checkApiKey, (req: Request, res: Response) => {
    req;
    res.status(404).json({
      message: "Route GET:/ not found",
      error: "Not Found",
      statusCode: 404,
    });
  });

  userRoute(app);
  exerciceRoute(app);
  mediaRoute(app);
};
