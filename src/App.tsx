import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import type { User } from "firebase/auth"

//importing components
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";


function App() {
  
  //create a piece of state to track the current authenticated user
  const [user, setUser] = useState<null | User>(null);
  const [authMode, setAuthMode] = useState<"signup" | "login">("signup");

  //toggles between "signup" and "login" modes to switch which auth form is displayed
  const toggleAuthMode = () => {
    setAuthMode((prev) => (prev === "signup" ? "login" : "signup"));
  };

  //subscribes to Firebase auth state
  useEffect(() => {
    //set up listener that runs whenever the authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      //update the local state with the current user object (or null if logged out) "tracks logged-in user"
      setUser(user);  //will be 'null' if signed out
    });
    
    //clean up - stop listening when the component unmounts to prevent memory leaks
    return () => unsubscribe(); 
  }, []);
  
  
  return (
    <div className="min-h-screen bg-gray-700 px-4 py-10">
        <h1 className="text-center text-3xl font-bold mb-6">Welcome to Trakr</h1>
        <div className="flex justify-center">
          {user ? (
            <Dashboard/>
          ) : (
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
          )}
        </div>
    </div>
  );
}

export default App;