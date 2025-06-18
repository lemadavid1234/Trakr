import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

//importing components
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";


function App() {
  return (
    <div className="min-h-screen bg-gray-500 px-4 py-10">
        <h1 className="text-center text-3xl font-bold mb-6">Welcome to Trakr</h1>
        <div className="flex justify-center">
          <SignUp />
        </div>
    </div>
  );
}

export default App;