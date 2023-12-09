import express from "express";
import { Request } from "../models/requestModel.js";

const router1 = express.Router();

//Route to add a new request (*STILL HAVE TO AUTOFILL NAME AND APTNUM*)
router1.post("/", async (request, response) => {
  try {
    if (
      !request.body.name ||
      !request.body.aptNum ||
      !request.body.area ||
      !request.body.description ||
      !request.body.date_time ||
      request.body.status == null
    ) {
      return response.status(400).send({
        message: "Send all required fields: area, description, date, status",
      });
    }
    const newRequest = {
      name: request.body.name,
      aptNum: request.body.aptNum,
      area: request.body.area,
      description: request.body.description,
      date_time: request.body.date_time,
      status: request.body.status,
    };

    console.log(newRequest);

    const requestForm = await Request.create(newRequest);

    return response.status(201).send(requestForm);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router1.get("/", async (request, response) => {
  try {
    const requestInfo = await Request.find({});

    return response.status(200).json({
      count: requestInfo.length,
      data: requestInfo,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router1.put("/requests/:id", async (request, response) => {
  try {
    const requestId = request.params.id;

    const updatedRequest = await Request.findByIdAndUpdate(
      requestId,
      { status: request.body.status },
      { new: true}
    );

    response.json({success: true, data: updatedRequest });
  } catch (error) {
    console.error("Error updating request status:", error);
    response.status(500).json({ success: false, error: "Internal Server Error" });
  }
});


export default router1;
