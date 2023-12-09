import { Int32 } from "mongodb";
import mongoose from "mongoose";

const tenantSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        phonenumber: {
            type: Number,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        dateofCin: {
            type: Date,
            required: true,
        },
        dateofCout: {
            type: Date,
            required: true,
        },
        aptNum: {
            type: Number,
            required: true,
        },
    }
)

export const Tenant = mongoose.model('Tenant', tenantSchema);