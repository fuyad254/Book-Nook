import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { createAuthClient } from "better-auth/react";

const client = new MongoClient("mongodb://localhost:27017/database");
const db = client.db();

export const { signIn, signUp, useSession } = createAuthClient()

export const auth = betterAuth({
    emailAndPassword: { 
    enabled: true, 
  },

  database: mongodbAdapter(db, {
    client,
  }),
});