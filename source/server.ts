/** source/server.ts */
import http from "http";
import express, { Express } from "express";
import morgan from "morgan";
import hashRoutes from "./routes/hash";
import { cors } from "./middleware/cors";
const app: Express = express();

/** Logging */
app.use(morgan("dev"));
/** Parse the request */
app.use(express.urlencoded({ extended: false }));
/** Takes care of JSON data */
app.use(express.json());

/** Custom Middlware */
/** RULES OF OUR API */
app.use(cors);

/** Routes */
app.use("/hash", hashRoutes);

/** Error handling */
app.use((req, res, next) => {
  const error = new Error("not found");
  return res.status(404).json({
    message: error.message,
  });
});

/** Server */
const httpServer = http.createServer(app);
const PORT: any = process.env.PORT ?? 6060;
httpServer.listen(PORT, () =>
  console.log(`The server is running on port ${PORT}`)
);
