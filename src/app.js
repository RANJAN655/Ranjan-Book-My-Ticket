// import cookieParser from "cookie-parser";
// import express from "express";
// import authRoute from "./modules/user/auth.router.js";
// import seatsRoute from "./modules/seats/seats.router.js";

// import path from "path";
// import { fileURLToPath } from "url";

// const app = express(); // ✅ FIRST create app

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

// // ✅ THEN use middleware
// app.use(express.static(path.join(__dirname, "../public")));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// // routes
// app.use("/api/auth", authRoute);
// app.use("/api/seats", seatsRoute);

// export default app;


import cookieParser from "cookie-parser";
import express from "express";
import authRoute from "./modules/user/auth.router.js";
import seatsRoute from "./modules/seats/seats.router.js";

import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, "../public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use("/api/auth", authRoute);
app.use("/api/seats", seatsRoute);

// ✅ serve homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

export default app;