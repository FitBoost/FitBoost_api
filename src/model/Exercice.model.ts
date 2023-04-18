import mongoose, { Schema } from "mongoose";

export interface ExerciceDocument extends mongoose.Document {
  name: string;
  description: string;
  category: number;
  createdAt: string;
  updatedAt: string;
  deactivatedAt: boolean;
  createdBy: string;
}

const ExerciceSchema = new Schema({
  name: String,
  description: String,
  category: Number,
  createdAt: Date,
  updatedAt: Date,
  deactivatedAt: Boolean,
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

ExerciceSchema.pre<ExerciceDocument>("save", async function (next) {
  const exercice = this as ExerciceDocument;
  exercice.createdAt = new Date().toISOString();
  exercice.updatedAt = new Date().toISOString();
  exercice.deactivatedAt = false;

  return next();
});

const ExerciceModel = mongoose.model<ExerciceDocument>(
  "Exercice",
  ExerciceSchema
);

export default ExerciceModel;
