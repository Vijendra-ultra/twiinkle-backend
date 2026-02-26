import customErrorHandler from "./middleware/errorHandler";
import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth";
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.WEBSITE_DOMAIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "rid",
      "fdi-version",
      "anti-csrf",
      "st-auth-mode",
    ],
  }),
);
app.all("/api/auth/*", toNodeHandler(auth));

app.use(customErrorHandler);
export default app;
