import Container from 'react-bootstrap/Container';
import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter, Routes, Route } from 'react-router';
import TableUsers from '@/components/TableUsers';
import Header from '@/components/Header';

import './App.scss';
import Home from './components/Home';
import Login from './components/Login';

function App() {
    return (
        <BrowserRouter>
            <div className="app-container">
                <Header />
                <Container>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/users" element={<TableUsers />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </Container>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </BrowserRouter>
    );
}

export default App;
