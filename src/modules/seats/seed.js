import Seat from "./seats.model.js";
const seedSeats = async () => {
  const existingSeat = await Seat.findOne();

  if (existingSeat) {
    console.log("Seats already exist ✅");
    return;
  }

  const seats = Array.from({ length: 20 }, () => ({
    isBooked: false,
  }));

  await Seat.insertMany(seats);

  console.log("Seats created ✅");
};

export default seedSeats;