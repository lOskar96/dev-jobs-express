import express from "express";
import { corsMiddleware } from "./middlewares/cors.js";
import jobsRouter from "./routes/jobs.js";

const PORT = process.env.PORT ?? 1234;
const app = express();

app.use(corsMiddleware());
app.use(express.json());

app.use("/jobs", jobsRouter);

console.log(process.env.NODE_ENV);

if (!process.env.NODE_ENV) {
  app.listen(PORT, () =>
    console.log(`Server levantado en http://localhost:${PORT}`),
  );
}

export default app;
