"use server";
import { getCollection } from "@/lib/db";
import { RegisterFormSchema } from "@/lib/rules";
import { createSession } from "@/lib/sessions";
import bcrypt from 'bcrypt'
import { redirect } from "next/navigation";

// tout doit etre async

export async function register(state, formData) {
  console.log("register action called");

  const validatedFields = RegisterFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  // extraire les infos du formulaires
  const { email, password } = validatedFields.data;

  // choisir la table dans laquelle enregistrer les infos
  const userCollection = await getCollection("users");
  if (!userCollection)
    return {
      errors: {
        email: "Server Error",
      },
    };
  
  // verifier si le mail est deja present dans la base de données
  const existingUser = await userCollection.findOne({email})
  if (existingUser) {
    return {
      error: {
        email: "This email is already linked with an account existing !"
      }
    }
  }

  // Hasher le password
  const hashedPassword = await bcrypt.hash(password, 10)

  // inserer les infos dans la table
  const result = await userCollection.insertOne({ 
    email, 
    password: hashedPassword 
  });

  // creer une session
  await createSession(result.insertedId)
  
  // rediriger vers la page suite a la connexion
  redirect("/dashboard")
  console.log(result);
}
