import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import type { User } from "firebase/auth"
import AuthPage from "./pages/AuthPage";

//importing components
import Dashboard from "./pages/Dashboard";

//importing routes for navigation
import { Routes, Route, Navigate } from "react-router-dom";
import SidebarLayout from "./components/SidebarLayout";
import History from "./pages/History";


function App() {
  
  //create a piece of state to track the current authenticated user
  const [user, setUser] = useState<null | User>(null);

  const [loading, setLoading] = useState(true);
  
  //subscribes to Firebase auth state
  useEffect(() => {
    //set up listener that runs whenever the authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      //update the local state with the current user object (or null if logged out) "tracks logged-in user"
      setUser(user);  //will be 'null' if signed out
      //set loading to false to prevent the loading screen from showing
      setLoading(false);
    });
    
    //clean up - stop listening when the component unmounts to prevent memory leaks
    return () => unsubscribe(); 
  }, []);
  
  return (
    <>
      {loading ? (
        <div className="min-h-screen bg-gray-700 flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      ) : user ? (
        // User is authenticated - show the main app with sidebar
        <Routes>
          <Route path="/" element={<SidebarLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="history" element={<History />} />
          </Route>
        </Routes>
      ) : (
        <AuthPage />
      )}
    </>
  );
}

export default App;