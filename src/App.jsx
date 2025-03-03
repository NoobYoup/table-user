import Container from 'react-bootstrap/Container';
import { ToastContainer, toast } from 'react-toastify';

import TableUsers from '@/components/TableUsers';
import Header from '@/components/Header';

import './App.scss';

function App() {
    return (
        <>
            <div className="app-container">
                <Header />

                <Container>
                    <TableUsers />
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
        </>
    );
}

export default App;
