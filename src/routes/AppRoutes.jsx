import { Routes, Route } from 'react-router';
import Home from '@/components/Home';
import Login from '@/components/Login';
import TableUsers from '@/components/TableUsers';
import PrivateRoute from '@/routes/PrivateRoute';
import NotFound from '@/routes/NotFound';

function AppRoutes() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/users"
                    element={
                        <PrivateRoute path="/users">
                            <TableUsers />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default AppRoutes;
