import { useEffect, useState } from "react";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase"


//defines structure of each workout so tsx can give autocomplete & type checking
type WorkoutSession = {
    id: string; //from firestore's doc ID
    date: string;
    exercises: {
        name: string;
        sets: number;
        reps: number;
        notes?: string;
    }[];
};

export default function WorkoutList() {
    //sets initial state to an empty array ([]) of Workout objects
    //'workouts' holds current state, 'setWorkouts' function used to update that array
    const [session, setSession] = useState<WorkoutSession[]>([]);
    const [loading, setLoading] = useState(true); //boolean default true

    //run code once when component is mounted (added to DOM)
    useEffect(() => {
        const fetchWorkouts = async () => {
            //debugging
            console.log("🔍 Fetching workouts...");

            //checks if user is logged in
            const user = auth.currentUser;
            if (!user) return; 

            try {
                const q = query(
                    collection(db, "workoutSessions"), //refers to 'workoutSessions' collection in Firestore database
                    where("userId", "==", user.uid), //filters workout to only show the ones created by the currently logged in uswer
                    orderBy("date", "desc") //sorts results by the date field in desc order
                );
    
                //fetches query results --> snapshot.docs is an array of workout documents 
                const snapshot = await getDocs(q); // await means "wait for this data before moving to next line"

                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,     //document's unique ID from firestone
                    ...(doc.data() as Omit<WorkoutSession, "id">), //doc.data returns document content " { name, sets ... userId } "
                }));                                        //this data has the shape of a Workout but WITHOUT the id field, since we are adding id manually
    
                //updates React state workouts with new formatted array of workout objects
                setSession(data);
            } catch (err) {
                console.error("Error fetching workouts", err);
            } finally {
                setLoading(false);
            }
        };

        fetchWorkouts();
    }, []);

    if (loading) return <p className="text-gray-600">Loading Workouts...</p>;

    return (
        <div className="w-full max-w-md space-y-4 mt-8">
            <h3 className="text-lg font-semibold text-gray-800">Recent Workouts</h3>
            {session.length === 0 ? (
                <p className="text-gray-600">No workouts logged yet.</p>
            ) : (
                session.map((session) => (
                    <div
                        key={session.id}
                        className="bg-white p-4 rounded shadow border-l-4 border-blue-500"
                    >
                        <p className="text-sm text-gray-500">{session.date}</p>
                        <ul className="mt-2 space-y-1">
                            {session.exercises.map((ex, idx) => (
                                <li key={idx} className="text-sm text-gray-700">
                                    • <strong>{ex.name}</strong>: {ex.sets}*{ex.reps}
                                    {ex.notes && <span className="italic text-gray-500"> - {ex.notes}</span>} 
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </div>
    );


} 