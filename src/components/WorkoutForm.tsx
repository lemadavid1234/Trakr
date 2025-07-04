import { useState, useEffect } from "react"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { db, auth } from "../firebase"

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
    const [exercises, setExercises] = useState([ 
        { name: "", sets: "", reps: "", notes: ""  }
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
    const handleChange = (index: number, field: string, value: string) => {
        const updated = [...exercises];
        updated[index][field as keyof typeof updated[0]] = value;
        setExercises(updated);
    };

    //add blank exercise to list of exercises (exercises)
    const addExercise = () => {
        setExercises([...exercises, {name: "", sets: "", reps: "", notes: ""}])
    };

    //return a new array containing only the items where current index i is not equal to the one we want to remove
    const removeExercise = (index: number) => {
        const updated = exercises.filter((_, i) => i !== index);
        setExercises(updated);
    };

    //save entire session as one document in Firestore
    const handleSubmit = async (e: React.FormEvent) => {
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
                exercises,
                createdAt: serverTimestamp(),
            });

            setSuccess("Workout Saved!");
            setDate("");
            setExercises([{name: "", sets: "", reps: "", notes: ""}]);
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4"
        >
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
            
            {exercises.map((exercise, idx) => (
                <div key={idx} className="space-y-2 border-b pb-4">
                    <input
                        type="text"
                        placeholder="Exercise"
                        value={exercise.name}
                        onChange={(e) => handleChange(idx, "name", e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />

                    <input 
                        type="number"
                        placeholder="Sets"
                        value={exercise.sets}
                        onChange={(e) => handleChange(idx, "sets", e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />

                    <input
                        type="number"
                        placeholder="Reps"
                        value={exercise.reps}
                        onChange={(e) => handleChange(idx, "reps", e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />

                    <textarea
                        placeholder="Notes (optional)"
                        value={exercise.notes}
                        onChange={(e) => handleChange(idx, "notes", e.target.value)}
                        className="w-full p-2 border rounded"
                    ></textarea>

                    {exercises.length > 1 && (
                        <button
                            type="button"
                            onClick={() => removeExercise(idx)}
                            className="text-red-500 text-sm"
                        >
                            Remove Exercise
                        </button>
                    )}
                </div>
            ))}
            
            <button
                type="button"
                onClick={addExercise}
                className="w=full bg-gray-300 text-gray-800 p-2 rounded hover:bg-gray-400"
            >
                + Add Another Exercise
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