import { Link, Outlet } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../firebase"

export default function SidebarLayout() {

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log("User signed out");
        } catch (err: any) {
            console.log("Error signing out:", err);
        }
    };

    return (
        <div className="flex min-h-screen">
            <aside className="w-64 bg-gray-800 text-white p-4 space-y-4">
                <h2 className="text-xl font-bold">Trakr</h2>
                <nav className="flex flex-col space-y-2">
                    <Link to="/dashboard" className="hover:underline">Dashboard</Link>
                    <Link to="/history" className="hover:underline">History</Link>
                </nav>
                
                <div className="pt-4 border-t border-gray-600">
                    <button
                        onClick={handleLogout}
                        className="w-full text-left text-red-300 hover:text-red-100 hover:underline"
                    >
                        Logout
                    </button>
                </div>
            </aside>
            
            <main className="flex-1 bg-gray-100 p-6">
                <Outlet />
            </main>
        </div>
    )

}