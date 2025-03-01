import Container from 'react-bootstrap/Container';
import TableUsers from '@/components/TableUsers';
import Header from '@/components/Header';

import './App.scss';

function App() {
    return (
        <div className="app-container">
            <Header></Header>
            <Container>
                <TableUsers></TableUsers>
            </Container>
        </div>
    );
}

export default App;
