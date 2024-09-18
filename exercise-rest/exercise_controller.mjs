import express from 'express';
import { checkSchema, validationResult, check } from 'express-validator';
import * as exercisesModel from './exercise_model.mjs';
import 'dotenv/config';

const app = express();
const PORT = 3000;

const beforeAll = ( async() => {
    await exercisesModel.connect(true);
});

beforeAll();

app.use(express.json());

// Endpoints for CRUD Operations
// Endpoint 1: Create using POST /exercises
app.post(
    '/exercises', 
    checkSchema({
        name: { 
            notEmpty: true,
            isString: true,
            isLength: {
                options: {min: 0}
            }
        },
        reps: { 
            notEmpty: true,
            isInt: {
                options: { gt: 0 },
            }
        },
        weight: {
            notEmpty: true,
            isInt: {
                options: { gt: 0 },
            }
        }, 
        unit: { 
            notEmpty: true,
            isString: true,
            isIn: {options: [['kgs', 'lbs']]}
        },
        date: { 
            notEmpty: true,
            isDate: {
                options: { 
                    format: "MM-DD-YY",
                    delimiters: ['/', '-', '.', ',']
                 },
            }
        },
    }), 
    async (req, res) => {
        // Initialize variable for request body parameters:
        const name = req.body.name;
        const reps = req.body.reps;
        const weight = req.body.weight;
        const unit = req.body.unit;
        const date = req.body.date;

        // Validate request body parameter
        const result = validationResult(req)
        if (result.isEmpty()){
            const exercise = await exercisesModel.createExercise(name, reps, weight, unit, date, 'POST');
            res.status(201).send(exercise);
        }
        else {
            res.status(400).send({"Error": "Invalid request"})
        }    
}); 

// Endpoint 2: Read all using GET /exercises
app.get('/exercises', async (req, res) => {
    // Declare an empty query object to populate if queries exist
    let queryArg = {}
    if (req.query.name){
        queryArg.name = req.query.name;
    }
    if (req.query.reps){
        queryArg.reps = req.query.reps;
    }
    if (req.query.weight){
        queryArg.weight = req.query.weight;
    }
    if (req.query.unit){
        queryArg.unit = req.query.unit;
    }
    if (req.query.date){
        queryArg.date = req.query.date;
    }
    const query = await exercisesModel.findExercises(queryArg);
    res.status(200).send(query);
}); 

// Endpoint 3: Read one using GET /exercises/:_id
app.get('/exercises/:_id', async (req, res) => {
    // Initialize variable for id parameter and pass to function in model:
    const _id = req.params._id;
    // Validate parameter.  If findExerciseById returned null, send error. Else return Exercise
    let exercise = await exercisesModel.findExerciseById(_id);
    if (exercise !== null) {
        res.status(200).send(exercise);
    } else {
    res.status(404).send({"Error": "Not found"});
    }
});


// Endpoint 4: Update using PUT /exercises/:_id
app.put(
    '/exercises/:_id', 
    checkSchema({
        name: { 
            notEmpty: true,
            isString: true,
            isLength: {
                options: {min: 0}
            }
        },
        reps: { 
            notEmpty: true,
            isInt: {
                options: { gt: 0 },
            }
        },
        weight: {
            notEmpty: true,
            isInt: {
                options: { gt: 0 },
            }
        }, 
        unit: { 
            notEmpty: true,
            isString: true,
            isIn: {options: [['kgs', 'lbs']]}
        },
        date: { 
            notEmpty: true,
            isDate: {
                options: { 
                    format: "MM-DD-YY",
                    delimiters: ['/', '-', '.', ',']
                 },
            }
        },
    }), 
    async (req, res) => {
        // find exercise by id:
        const _id = req.params._id;
        let exercise = await exercisesModel.findExerciseById(_id); 
        
        // Validate request body parameter
         const result = validationResult(req);
         if (!result.isEmpty()){
            res.status(400).send({"Error": "Invalid request"});
         }
        
        // Validate parameter.  If findExerciseById returned null, send error. Else continue with update of exercise
        else if (exercise !== null) {
            // If properties specified to be updated, reassign in variable exercise
            if (req.body.name !== exercise.name){
                exercise.name = req.body.name;
            }
            if (req.body.reps !== exercise.reps){
                exercise.reps = req.body.reps;
            }
            if (req.body.weight !== exercise.weight){
                exercise.weight = req.body.weight;
            }
            if (req.body.unit !== exercise.unit){
                exercise.unit = req.body.unit;
            }
            if (req.body.date !== exercise.date){
                exercise.date = req.body.date;
            }

            // Update by replacing exercise with specified properties
            await exercisesModel.updateExercise(_id, exercise.name, exercise.reps, exercise.weight, exercise.unit, exercise.date);
            exercise = await exercisesModel.findExerciseById(_id);
            res.status(200).send(exercise);
        } 
        else {
        res.status(404).send({"Error": "Not found"});
        }
});

// Endpoint 5: Delete one using DELETE /exercises/:_id
app.delete('/exercises/:_id', async (req, res) => {
    // find exercise by id:
    const _id = req.params._id;
    let exercise = await exercisesModel.findExerciseById(_id);
    // Validate parameter.  If findExerciseById returned null, send error. Else continue with update of exercise
    if (exercise !== null) {
        await exercisesModel.deleteById(_id);
        res.status(204).send({});
    } else {
        res.status(404).send({"Error": "Not found"});
    }
});


// Listening on PORT defined in .env
app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}...`);
    });