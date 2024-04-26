import { Prisma } from "@prisma/client";

export const modelFields = (modelName: string) =>
  Prisma.dmmf.datamodel.models
    .find((model) => model.name === modelName)
    ?.fields.map((field) => field.name);
