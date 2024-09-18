import mongoose from "mongoose";
import 'dotenv/config';

const EXERCISE_DB_NAME = 'exercise_db';
const EXERCISE_COLLECTION = 'exercises';
const EXERCISE_CLASS = "Exercise";

let connection = undefined;
let Exercise = undefined;

/**
 * This function does the following:
 *  1. Connects to the MongoDB server.
 *  2. Drop EXERCISE_COLLECTION if asked to do so.
 *  3. Creates a model class for the Exercise schema.
 * @param {Boolean} dropCollection If true, drop EXERCISE_COLLECTION
 */
async function connect(dropCollection){
    try{
        connection = await createConnection();
        console.log("Successfully connected to MongoDB using Mongoose!");
        if(dropCollection){
            await connection.db.dropCollection(EXERCISE_COLLECTION);
        }
        Exercise = createModel()
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}

/**
 * Connect to the MongoDB server for the connect string in .env file
 * @returns A connection to the server
 */
async function createConnection(){
    await mongoose.connect(process.env.MONGODB_CONNECT_STRING, 
                {dbName: EXERCISE_DB_NAME});
    return mongoose.connection;
}

/**
 * Define a schema for the movies collection, compile a model and return the model.
 * @returns A model object for the movieSchema
 */
function createModel(){
    // Define the schema
    const exerciseSchema = mongoose.Schema({
        name: {type: String, required: true},
        reps: {type: Number, required: true},
        weight: {type: Number, required: true},
        unit: {type: String, required: true},
        date: {type: String, required: true}
    });
    // Compile the model class from the schema.
    // This should be after defining the schema.
    return mongoose.model(EXERCISE_CLASS, exerciseSchema);
}
//___________________________________________________________________________________________________

async function createExercise(name, reps, weight, unit, date){
    const exercise = new Exercise({name: name, reps: reps, weight: weight, unit: unit, date: date});
    return exercise.save();
}

async function findExercises(filter){
    const query = Exercise.find(filter);
    return query.exec();
}

async function findExerciseById(id){
    const query = Exercise.findById(id);
    return query.exec();
}

async function updateExercise(_id, name, reps, weight, unit, date){
    const result = await Exercise.updateOne({_id: _id},
        {name: name, reps: reps, weight: weight, unit: unit, date: date});
    return result;
}

const deleteById = async (_id) =>{
    const result = await Exercise.deleteOne({_id: _id});
    return result;
}

export { connect, createExercise, findExercises, findExerciseById, updateExercise, deleteById }