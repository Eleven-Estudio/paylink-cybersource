import { z } from "zod";

export const createLinkSchema = z.object({
  title: z.string().min(1, { message: "El campo es requerido" }),
  description: z.string().min(0),
  amount: z.number().min(0.01, { message: "La cantidad debe ser mayor a 0" }),
  active: z.boolean().optional(),
});

export const updateLinkSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, { message: "El campo es requerido" }),
  description: z.string().min(0),
  amount: z.number().min(0.01, { message: "La cantidad debe ser mayor a 0" }),
  active: z.boolean(),
});
