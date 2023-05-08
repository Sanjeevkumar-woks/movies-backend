import { client } from './index.js';
import bcrypt from 'bcrypt';


// Movies
export async function deleteMovieById(id) {
    return await client
        .db("guvi")
        .collection("movies")
        .deleteOne({ id: id });
}
export async function getMovieById(id) {
    return await client
        .db("guvi")
        .collection("movies")
        .findOne({ id:id });
}
export async function addMovie([newMovie]) {
    return await client.db("guvi").collection("movies").insertOne(newMovie);
}
export async function getAllMovies(req) {
    return await client
        .db("guvi")
        .collection("movies")
        .find(req.query)
        .toArray();
}
export async function updateMovieById(id, { poster, rating, summary, title, trailer }) {
    return await client
        .db("guvi")
        .collection("movies")
        .updateOne({ id: id }, { $set: { poster, rating, summary, title, trailer }});
}

// Theaters
export async function deleteTheaterById(id) {
    return await client
        .db("guvi")
        .collection("theater")
        .deleteOne({ id:id });
}
export async function getTheaterById(id) {
    return await client
        .db("guvi")
        .collection("theater")
        .findOne({ id:id});
}
export async function addTheater(newTheater) {
    return await client
        .db("guvi")
        .collection("theater")
        .insertMany(newTheater);
}
export async function getAllTheaters() {
    return await client
        .db("guvi")
        .collection("theater")
        .find()
        .toArray();
}
export async function updateTheaterById(id, { name,movies,showtimes }) {
    return await client
        .db("guvi")
        .collection("theater")
        .updateOne({ id:id }, { $set: { name,movies,showtimes}});
}



// Bookings
export async function deleteBookingById(bookingid) {
    return await client
        .db("guvi")
        .collection("bookings")
        .deleteOne({ bookingid:bookingid });
}
export async function getBoookingById(bookingid) {
    return await client
        .db("guvi")
        .collection("bookings")
        .findOne({ bookingid:bookingid});
}
export async function addBooking(newBooking) {
    return await client
        .db("guvi")
        .collection("bookings")
        .insertMany(newBooking);
}
export async function getAllBookings() {
    return await client
        .db("guvi")
        .collection("bookings")
        .find()
        .toArray();
}
export async function updateBookingById(bookingid, { username,email,movieName,noOfSeats,theaterName }) {
    return await client
        .db("guvi")
        .collection("bookings")
        .updateOne({ bookingid:bookingid}, { $set: {username,email,movieName,noOfSeats,theaterName,}});
}


// Password
export async function genPassword(password) {
    const salt = await bcrypt.genSalt(10); //bcrypt.genSalt(no. of rounds)
    console.log(salt);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

// Users
export async function createUser(username, password) {
    return await client
        .db("guvi")
        .collection("users")
        .insertOne({ username, password });
}
export async function getUserByName(username) {
    return await client
        .db("guvi")
        .collection("users")
        .findOne({ username: username });
}
export async function getAllusers(req) {
    return await client
        .db("guvi")
        .collection("users")
        .find(req.query)
        .toArray();
}