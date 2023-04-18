import { number, object, string } from "yup";

export const createExerciceSchema = object({
  body: object({
    name: string().required("Name is required"),
    description: string().required("Description is required"),
    category: number().required("Category is required"),
  }),
});
