// src/components/Login.jsx
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setSuccess("Login successful!");
            console.log("Logged in user: ", userCredential.user);
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleLogin} className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm space-y-4">
            <h2 className="text-xl font-bold text-center text-gray-800">Log In</h2>

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
                Log In
            </button>
        </form>
    );
}