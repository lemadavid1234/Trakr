import { useState, useEffect } from "react"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { db, auth } from "../firebase"

import ExerciseSearch from "./ExerciseSearch";


type Set = {
    weight: string;
    reps: string;
};

type Exercise = {
    id: string;
    name: string;
    category?: string;
    primaryMuscles?: string[];
    secondaryMuscles?: string[];
    images?: string[];
    sets: Set[];
    notes?: string;
};



export default function WorkoutForm() {


    const [date, setDate] = useState("");
    
    /*
    const [exercise, setExercise] = useState("");
    const [sets, setSets] = useState<number | "">("");
    const [reps, setReps] = useState<number | "">("");
    const [notes, setNotes] = useState("");
    */
    //initalize exercises with a default value
    //default value is array, with one object that has empty fields for name, sets, reps, and notes
    const [exercises, setExercises] = useState<Exercise[]>([ 
        {
            id: "",
            name: "",
            category: "",
            primaryMuscles: [],
            secondaryMuscles: [],
            images: [],
            sets: [{ weight: "", reps: "" }],
            notes: ""
        }
    ]);

    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    //when workout form loads (component mounts), it will setDate only once due to parameter [] being empty
    useEffect(() => {
        const today = new Date().toISOString().split("T")[0]; //YYYY-MM-DD
        setDate(today);
    },[]);

    //update a single field of an exercise in the list
    //handleChange(0, "name", "bench press")
    //results in exercises[0].name = "bench press"
    const handleChange = (exerciseIndex: number, field: string, value: string) => {
        const updated = [...exercises];
        if (field === 'name') {
            updated[exerciseIndex].name = value;
        } else if (field === 'notes') {
            updated[exerciseIndex].notes = value;
        }
        setExercises(updated);
    };

    const handleSetChange = (exerciseIndex: number, setIndex: number, field: string, value: string) => {
        const updated = [...exercises];
        updated[exerciseIndex].sets[setIndex][field as keyof Set] = value;
        setExercises(updated);
    };

    //add blank exercise to list of exercises (exercises)
    const addExercise = () => {
        setExercises([...exercises, {
            id: "",
            name: "",
            category: "",
            primaryMuscles: [],
            secondaryMuscles: [],
            images: [], 
            sets: [{ weight: "", reps: "" }],
            notes: ""
        }]);
    };

    const addSet = (exerciseIndex: number) => {
        const updated = [...exercises];
        updated[exerciseIndex].sets.push({ weight: "", reps: "" });
        setExercises(updated);
    }

    const removeSet = (exerciseIndex: number, setIndex: number) => {
        const updated = [...exercises];
        updated[exerciseIndex].sets.splice(setIndex, 1);
        setExercises(updated);
    }


    //return a new array containing only the items where current index i is not equal to the one we want to remove
    const removeExercise = (exerciseIndex: number) => {
        const updated = exercises.filter((_, i) => i !== exerciseIndex);
        setExercises(updated);
    };

    const handleSelectExercise = (exerciseIdx: number, exercise: any) => {
        const updated = [...exercises];
        updated[exerciseIdx] = {
            ...updated[exerciseIdx],
            ...exercise,    //merge all exercise fields (name, images, etc)
            sets: updated[exerciseIdx].sets || [{ weight: "", reps: ""}] //always ensure sets exists
        };
        setExercises(updated);
    };

    //save entire session as one document in Firestore
    const handleSubmit = async (e: React.FormEvent) => {
        //prevent default form submission behavior
        e.preventDefault();
        setSuccess("");
        setError("");
    
        const user = auth.currentUser;
        if (!user) {
            setError("You must be logged in");
            return;
        }
        
        try {
            await addDoc(collection(db, "workoutSessions"), {
                userId: user.uid,
                date,
                //exercises is an array of Exercise objects that contains Set objects
                exercises: exercises.map(exercise => ({
                    name: exercise.name,
                    sets: exercise.sets.map(set => ({
                        weight: set.weight,
                        reps: set.reps,
                    })),
                    notes: exercise.notes
                })),
                createdAt: serverTimestamp(),
            });

            setSuccess("Workout Saved!");
            setDate("");
            setExercises([{
                id: "",
                name: "",
                sets: [{ weight: "", reps: ""}],
                notes: ""
            }])
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl w-full max-w-2xl mx-auto space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Log Your Workout</h2>
 
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}

            <input
                type="date"
                value={date}
                onChange={(e)=> setDate(e.target.value)}
                className="w-full p-2 border rounded"
                required
            />

            {exercises.map((exercise, exerciseIdx) => (
                <div key={exerciseIdx} className="space-y-4 border-b pb-6">
                    <div className="flex justify-between items-center">
                        <div className="flex-1 mr-2">
                            <ExerciseSearch
                                currentValue={exercise.name}
                                onChange={(value) => handleChange(exerciseIdx, "name", value)}
                                onSelect={(exercise) => handleSelectExercise(exerciseIdx, exercise)}
                            />
                        </div>
                        {exercises.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeExercise(exerciseIdx)}
                                className="text-red-500 text-sm px-2 py-1 hover:bg-red-600"
                            >
                                Delete Exercise
                            </button>
                        )}
                    </div>

                    {/* display exercise image or images if they exist */}
                    {exercise.images && exercise.images.length > 0 && (
                        <div className="w-full flex gap-2">
                            {exercise.images.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={`https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/${img}`}
                                    alt={exercise.name}
                                    className="flex-1 h-32 object-contain"
                                />
                            ))}
                        </div>
                    )}

                    <div className="ml-4 space-y-3">
                        <h4 className="font-medium text-gray-700">Sets:</h4>
                        {exercise.sets.map((set, setIdx) => (
                            <div key={setIdx} className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">Set {setIdx + 1}</span>
                                <input
                                    type="number"
                                    value={set.weight}
                                    onChange={(e) => handleSetChange(exerciseIdx, setIdx, "weight", e.target.value)}
                                    className="w-20 p-2 border rounded"
                                    required
                                />
                                <span className="text-sm text-gray-600">lbs</span>
                                <input
                                    type="number"
                                    value={set.reps}
                                    onChange={(e) => handleSetChange(exerciseIdx, setIdx, "reps", e.target.value)}
                                    className="w-20 p-2 border rounded"
                                    required
                                />
                                <span className="text-sm text-gray-600">reps</span>
                                {exercise.sets.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeSet(exerciseIdx, setIdx)}  
                                        className="text-red-500 text-sm px-2 py-1 hover:bg-red-50 rounded"  
                                    >
                                        -
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => addSet(exerciseIdx)}
                            className="text-blue-500 text-sm hover:underline"
                        >
                            + Add Set
                        </button>
                    </div>

                    <textarea
                        placeholder="Notes (optional)"
                        value={exercise.notes}
                        onChange={(e) => handleChange(exerciseIdx, "notes", e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>
            ))}

            <button
                type="button"
                onClick={addExercise}
                className="w-full bg-gray-300 text-gray-800 p-2 rounded hover:bg-gray-400"
            >
                + Add Excercise
            </button>

            <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
                Save Workout
            </button>


        </form>
    );
}