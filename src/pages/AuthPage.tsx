import { useState } from "react";
import SignUp from "../components/SignUp";
import Login from "../components/Login";


export default function AuthPage() {

    //state to track which auth form to display
    const [authMode, setAuthMode] = useState<"signup" | "login">("signup");

    //toggles between "signup" and "login" modes to switch which auth form is displayed
    const toggleAuthMode = () => {
        setAuthMode((prev) => (prev === "signup" ? "login" : "signup"));
    };

    return (
        // User is not authenticated - show login/signup
        <div className="min-h-screen bg-gray-700 px-4 py-10">
          <h1 className="text-center text-3xl font-bold mb-6 text-white">Welcome to Trakr</h1>
          <div className="flex justify-center">
            <div className="w-full max-w-sm">
              {authMode === "signup" ? <SignUp /> : <Login />} 
              <p className="text-center mt-4 text-sm text-white">
                {authMode === "signup" ? (
                  <>
                    Already have an account?{" "}
                    <button className="text-blue-200 underline hover:text-blue-400" onClick={toggleAuthMode}>
                      Log in
                    </button>
                  </>
                ) : (
                  <>
                    Don't have an account?{" "}
                    <button className="text-blue-200 underline hover:text-blue-400" onClick={toggleAuthMode}>
                      Sign Up
                    </button>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
    )
}