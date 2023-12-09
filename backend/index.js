import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Tenant } from "./models/tenantModel.js";
import tenantsRoutes from "./routes/tenantsRoutes.js";
import { Request } from "./models/requestModel.js";
import requestRoutes from "./routes/requestRoutes.js";
import cors from "cors";

const app = express();

//middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS policy
//option1: allow all origins with default of cors
app.use(cors());

//option2: allow custom origins
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET','POST','PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// );

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to PRads life");
});

app.use("/tenants", tenantsRoutes);

//added for submitting a request
app.use("/requests", requestRoutes);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
