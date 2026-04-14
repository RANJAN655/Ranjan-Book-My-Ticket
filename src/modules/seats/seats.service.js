import Seat from "./seats.model.js";

export const getAllSeatsService = async () => {
  return await Seat.find().lean();
};

export const bookSeatService = async (id, name) => {
  const seat = await Seat.findOneAndUpdate(
    { _id: id, isBooked: false },
    { $set: { isBooked: true, name } },
    { returnDocument: "after" },
  );

  if (!seat) {
    const exists = await Seat.exists({ _id: id });

    if (!exists) {
      throw new Error("Seat not found");
    }

    throw new Error("Seat already booked");
  }

  return seat;
};
