import { addBooking,getAllBookings,getBoookingById,updateBookingById,deleteBookingById } from '../helper.js';
import express from 'express';
const router = express.Router();

// Insert newBooking 
router.post('/', async (req, res) => {
    const newBooking = req.body;
    console.log(newBooking);
    const result = await addBooking(newBooking);
    res.send(result);
});

router.get('/', async (req, res) => {
    const bookings = await getAllBookings();
    res.send(bookings);
});
// Get individual theater 
router.get('/:bookingid', async (req, res) => {
    const { bookingid} = req.params;
    const booking = await getBoookingById(bookingid);
    booking
        ? res.send(booking)
        : res
            .status(404)
            .send({ message: "No booking found" });
});
// Update booking  by id
router.put('/:bookingid', async (req, res) => {
    const {bookingid} = req.params;
    const updateBooking = req.body;
    const updatedBooking = await updateBookingById(bookingid, updateBooking);
    res.send(updatedBooking);
})
// Delete individual Booking 
router.delete('/:bookingid', async (req, res) => {
    const { bookingid } = req.params;
    const booking = await deleteBookingById(bookingid);
    res.send(booking);
});

export const bookingsRouter = router;