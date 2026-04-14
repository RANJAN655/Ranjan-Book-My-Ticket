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
  },
  { timestamps: true }
);

const Seat = mongoose.model("Seat", seatSchema);

export default Seat;