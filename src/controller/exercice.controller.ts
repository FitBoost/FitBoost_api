import { Request, Response } from "express";
import {
  getExercices,
  ExerciceById,
  createExercice,
} from "../service/exercice.service";
import Log from "../utils/Log";
import { _getUser, verifyToken } from "../service/user.service";

export const handleGetAllExercice = async (_: Request, res: Response) => {
  Log.info("/GET /api/get/exercice");
  try {
    const exercices = await getExercices();
    if (!exercices) {
      return res.status(404).json({
        status: 404,
        message: "No exercices found",
      });
    }

    const data: any = exercices.map(async (exercice) => {
      return {
        ...exercice,
        createdBy: await _getUser(exercice.createdBy),
      };
      console.log("data", data);
    });

    console.log("data", data);

    return res.status(200).json({
      status: 200,
      data: data,
    });
  } catch (error: any) {
    Log.error(error.message);
    return res.status(409).json({
      status: 409,
      message: error.message,
    });
  }
};

export const handleGetExerciceById = async (req: Request, res: Response) => {
  Log.info("/GET /api/get/exercice/:id");
  try {
    const exercice = await ExerciceById(req.params.id);
    if (!exercice) {
      return res.status(404).json({
        status: 404,
        message: "No exercice found",
      });
    }
    return res.status(200).json({
      status: 200,
      data: exercice,
    });
  } catch (error: any) {
    Log.error(error.message);
    return res.status(409).json({
      status: 409,
      message: error.message,
    });
  }
};
export const handleCreateExercice = async (req: Request, res: Response) => {
  Log.info("/POST /api/create/exercice");
  try {
    const token = req.headers.authorization?.split("Bearer ")[1] as string;
    const idUser = verifyToken(token);
    req.body.createdBy = idUser.id;
    console.log("body", req.body);

    const exercice = await createExercice(req.body);

    return res.status(200).json({
      status: 200,
      data: exercice,
    });
  } catch (error: any) {
    Log.error(error.message);
    return res.status(409).json({
      status: 409,
      message: error.message,
    });
  }
};
