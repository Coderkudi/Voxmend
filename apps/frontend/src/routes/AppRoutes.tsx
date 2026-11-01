import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={<LoginPage />} />

            <Route element={<PublicRoute/>} >
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            </Route>
            <Route element={<ProtectedRoute/>} >
                <Route path="/dashboard" element={<DashboardPage />} />
            </Route>
        </Routes>
    );
}
