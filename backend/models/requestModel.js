import { Int32 } from "mongodb";
import mongoose from "mongoose";

const requestSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  aptNum: {
    type: Number,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date_time: {
    type: Date,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
});

export const Request = mongoose.model("Request", requestSchema);
