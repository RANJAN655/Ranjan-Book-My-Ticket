// src/modules/seats/seat.model.js

import mongoose from "mongoose";

const seatSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: null,
    },
    isBooked: {
      type: Boolean,
      default: false,
    },
    bookedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

const Seat = mongoose.model("Seat", seatSchema);

export default Seat;