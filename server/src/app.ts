import express, { Request } from "express";
import { router } from "./routes";
import cookieParser from "cookie-parser";

import cors from "cors";

export const app = express();

const origin = "http://localhost:3000";

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", origin);
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use(
  cors<Request>({
    credentials: true,
    origin,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(router);
