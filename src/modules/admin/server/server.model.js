import mongoose from "mongoose";
import Counter from "../../../models/counter.model.js";

const serverSchema = new mongoose.Schema(
  {
    server_id: { type: Number, unique: true },
    server_description: { type: String, required: true, trim: true },
    server_ip: { type: String, required: true, trim: true },
    active: { type: String, enum: { values: ["Yes", "No"], message: "{VALUE} is not supported, must be 'Yes' or 'No'" }, default: "Yes" },
    telnet_host: { type: String, required: true, trim: true },
    telnet_port: { type: Number, default: 3306 },
    user_manager: { type: String, default: "acs" },
    secret_manager: { type: String, default: "acs" },
    update_manager: { type: String, default: "updateacs" },
    listen_manager: { type: String, default: "listenacs" },
    send_manager: { type: String, default: "sendacs" },
    remote_telnet_host: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  }
);


serverSchema.pre("save", async function () {

  if (!this.isNew) return;

  try {
    const counter = await Counter.findOneAndUpdate(
      { key: "server_id" },
      { $inc: { seq: 1 } },
      { returnDocument: "after", upsert: true }
    );

    this.server_id = counter.seq;

  } catch (err) {
    throw err;
  }
});

const Server = mongoose.model("Server", serverSchema);
export default Server;