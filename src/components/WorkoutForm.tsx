import { useState } from "react"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { db, auth } from "../firebase"

export default function WorkoutForm() {

    const [date, setDate] = useState("");
    const [exercise, setExercise] = useState("");
    const [sets, setSets] = useState<number | "">("");
    const [reps, setReps] = useState<number | "">("");
    const [notes, setNotes] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

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
            await addDoc(collection(db, "workouts"), {
                userId: user.uid,
                date,
                exercise,
                sets: Number(sets),
                reps: Number(reps),
                notes,
                createdAt: serverTimestamp(),
            });

            setSuccess("Workout Saved!");
            setDate("");
            setExercise("");
            setSets("");
            setReps("");
            setNotes("");
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4"
        >
            <h2 className="text-xl font-bold text-gray-800">+ Log Your Workout</h2>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}
            
            <input
                type="date"
                value={date}
                onChange={(e)=> setDate(e.target.value)}
                className="w-full p-2 border rounded"
                required
            />
            
            <input
                type="text"
                placeholder="Exercise"
                value={exercise}
                onChange={(e) => setExercise(e.target.value)}
                className="w-full p-2 border rounded"
                required
            />

            <input 
                type="number"
                placeholder="Sets"
                value={sets}
                onChange={(e) => setSets(Number(e.target.value))}
                className="w-full p-2 border rounded"
                required
            />

            <input
                type="number"
                placeholder="Reps"
                value={reps}
                onChange={(e) => setReps(Number(e.target.value))}
                className="w-full p-2 border rounded"
                required
            />

            <textarea
                placeholder="Notes (optional)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-2 border rounded"
            />

            <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
                Save Workout
            </button>

        </form>
    );
}