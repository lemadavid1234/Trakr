import { signOut } from "firebase/auth"
import { auth } from "../firebase"
import WorkoutForm from "../components/WorkoutForm"
// Dashboard where user will be sent to once authenticated

export default function Dashboard() {

    return(
        <div className="p-4 bg-gray-300 flex flex-col rounded items-center justify-center">
            <h1 className="text-2x1 font-bold p-2">Welcome to your Dashboard</h1>

            <WorkoutForm/>

        </div>
    );
}