import { Schema, model } from "mongoose";

const systemLogSchema = new Schema(
  {
    action: { type: String, required: true }, // e.g. "User Deleted", "Product Added"
    performedBy: { type: Schema.Types.ObjectId, ref: "User" }, // who did it
    details: { type: String }, // extra description
    ipAddress: { type: String },
  },
  { timestamps: true }
);

export default model("SystemLog", systemLogSchema);
