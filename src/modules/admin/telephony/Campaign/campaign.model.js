import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema(
  {

    campaign_name: {
      type: String,
      required: true,
      trim: true
    },

    active: {
      type: String,
      enum: ["Yes", "No"],
      default: "Yes"
    },


    dial_method: {
      type: String,
      enum: ["Manual", "Inbound_Manual", "Predictive", "Preview", "Inbound Blended"],
      required: true
    },


    dial_prefix: {
      type: String,
      required: true,
      trim: true
    },


    campaign_caller_id: {
      type: String,
      required: true,
      trim: true
    },


    campaign_recordings: {
      type: String,
      enum: ["Yes", "No"],
      default: "No"
    },


    minimum_hopper_level: {
      type: Number,
      default: 1
    },


    dial_timeout: {
      type: Number,
      required: true
    },

    manual_dial_prefix: {
      type: String,
      required: true,
      trim: true
    },


    manual_alt_number_dialing: {
      type: String,
      enum: ["Yes", "No"],
      default: "No"
    }
  },
  {
    timestamps: true
  }
);

const Campaign = mongoose.model("Campaign", campaignSchema);
export default Campaign;