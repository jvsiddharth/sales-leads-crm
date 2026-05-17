import express from "express";

import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import leadRoutes from "./routes/lead.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use(errorHandler);
app.use(
  cors({
    origin: [
      "*"
    ],

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

app.get("/", (_, response) => {
  response.json({
    message:
      "Smart Leads API Running",
  });
});

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/leads",
  leadRoutes
);

export default app;