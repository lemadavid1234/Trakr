import { signOut } from "firebase/auth"
import { auth } from "../firebase"
import WorkoutForm from "../components/WorkoutForm"
import WorkoutList from "../components/WorkoutList"
// Dashboard where user will be sent to once authenticated

export default function Dashboard() {

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log("User signed out");
        } catch (err: any) {
            console.log("Error signing out:", err);
        }
    };


    return(
        <div className="p-4 bg-gray-300 flex flex-col rounded items-center justify-center">
            <h1 className="text-2x1 font-bold p-2">Welcome to your Dashboard</h1>

            <WorkoutForm/>

            <WorkoutList/>


            <button
                onClick={handleLogout}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
                Log Out
            </button>
        </div>
    );
}