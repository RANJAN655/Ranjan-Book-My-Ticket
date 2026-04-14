import { getAllSeatsService, bookSeatService } from "./seats.service.js";

export const getSeats = async (req, res) => {
  try {
    const seats = await getAllSeatsService();
    res.json(seats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch seats" });
  }
};

export const bookSeat = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const seat = await bookSeatService(id, name);

    res.json(seat);
  } catch (error) {
    if (error.message === "Seat already booked") {
      return res.status(400).json({ error: error.message });
    }

    console.error(error);
    res.status(500).json({ error: "Booking failed" });
  }
};
