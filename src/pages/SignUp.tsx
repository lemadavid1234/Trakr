//React hook that tracks from input and status messages
import { useState } from "react";
//firebase auth function that creates a new user account using an email & password
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

//declaring react functional component, exporting it to be imported elsewhere
export default function SignUp() {
    //const [stateValue, setStateValue] = useState("");
    //update live as user types or submits
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    //submit handler function
    //"function runs some code that takes time, like fetching data or talking to firebase,
    //so let's not block the rest of the app while we wait for it"
    const handleSubmit = async (e: React.FormEvent) => {
        //prevents default form submission (which would reload the page)
        e.preventDefault();

        //clears any previous messages before trying again
        setError("");
        setSuccess("");

        try {
            //calls firebase to create the user using the input values
            //asynchronous operation, firebase sends data over internet, validates, creates acc on cloud, sends response back
            //async allows us to use await keyword
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            setSuccess("Account Created!");
            console.log("User: ", userCredential.user);
        } catch (err: any) {
            //if firebase throws an error (ex: email already in use) catch it and show the error message
            setError(err.message);
        };
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm space-y-4">
                <h2 className="text-xl font-bold text-center text-gray-800">Create Account</h2>

                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-500 text-sm">{success}</p>}

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 border rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input 
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 border rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button 
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );

    
}

