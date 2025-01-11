import { z } from "zod";
// zod doc : https://zod.dev/

export const RegisterFormSchema = z
  .object({
    email: z
      .string() // verifie si c'est une string
      .email({ message: "Please enter a valid email." }) // verifie si c'est un email valide
      .trim(), // supprime les caracères invisibles qui peuvent causer des erreurs
    password: z
      .string() // verifie si c'est une string
      .min(1, { message: "Not be empty" }) // verifie si il y a bien au moins un caractère et dans le cas contraire on demande a ce que le contenu ne soit pas vide
      .min(5, { message: "Be at least 5 characters long" }) // verifie qu'il y a au moins 5 caractères pour valider la saisie
      .regex(/[a-zA-Z]/, { message: "Contain at least one letter." }) // verifie qu'il y a au moins 1 lettre pour valider la saisie
      .regex(/[0-9]/, { message: "Contain at least one number." }) // verifie qu'il y a au moins 1 nombre pour valider la saisie
      .regex(/[^a-zA-Z0-9]/, {
        message: "Contain at least one special character.", // verifie qu'il y a au moins 1 caractère spécial pour valider la saisie
      })
      .trim(), // supprime les caracères invisibles qui peuvent causer des erreurs
    confirmPassword: z
      .string() // verifie si c'est une string
      .trim(), // supprime les caracères invisibles qui peuvent causer des erreurs
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords fields doesn't match",
        path: ["confirmPassword"],
      });
    }
  });
