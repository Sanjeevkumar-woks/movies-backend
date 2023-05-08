import { getAllTheaters,addTheater,getTheaterById,deleteTheaterById,updateTheaterById } from '../helper.js';
import express from 'express';
const router = express.Router();

// Insert theater 
router.post('/', async (req, res) => {
    const newTheater = req.body;
    console.log(newTheater);
    const result = await addTheater(newTheater);
    res.send(result);
});

router.get('/', async (req, res) => {
    const theatres = await getAllTheaters();
    res.send(theatres);
});
// Get individual theater 
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const theater = await getTheaterById(id);
    theater
        ? res.send(theater)
        : res
            .status(404)
            .send({ message: "No theater found" });
});
// Update theater  by id
router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const updateTheater = req.body;
    const updatedTheater = await updateTheaterById(id, updateTheater);
    res.send(updatedTheater);
})
// Delete individual theater 
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const theater = await deleteTheaterById(id);
    res.send(theater );
});

export const theatersRouter = router;