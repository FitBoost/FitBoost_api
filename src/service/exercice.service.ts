import { DocumentDefinition } from "mongoose";
import ExerciceModel, { ExerciceDocument } from "../model/Exercice.model";

export const getExercices = async () => {
  return await ExerciceModel.find();
};

export const ExerciceById = async (id: string) => {
  try {
    const exercice = ExerciceModel.findById(id);
    return exercice;
  } catch (error) {
    throw new Error(error);
  }
};

export const createExercice = async (
  input: DocumentDefinition<ExerciceDocument>
) => {
  try {
    console.log("wesh je suis ici");

    const exercice = await ExerciceModel.create(input);
    return exercice;
  } catch (error) {
    throw new Error(error);
  }
};
