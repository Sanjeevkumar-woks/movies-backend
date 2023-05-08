import { getAllMovies, addMovie, getMovieById, deleteMovieById, updateMovieById } from '../helper.js';
import express from 'express';
const router = express.Router();

// Insert Movies
router.post('/', async (req, res) => {
    const newMovie = req.body;
    console.log(newMovie);
    const result = await addMovie(newMovie);

    res.send(result);
});

router.get('/', async (req, res) => {
    if (req.query.rating) {
        req.query.rating = +req.query.rating;
    }
    console.log(req.query);
    const movies = await getAllMovies(req);

    res.send(movies);
});

// Get individual movies
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const movie = await getMovieById(id);
    movie
        ? res.send(movie)
        : res
            .status(404)
            .send({ message: "No movies found" });
});

// Update movie by id
router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const updateMovie = req.body;
    console.log(updateMovie);
    const updatedMovie = await updateMovieById(id, updateMovie);
    res.send(updatedMovie);
})

// Delete individual movies
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const movie = await deleteMovieById(id);
    res.send(movie);
});

export const moviesRouter = router;