import Container from 'react-bootstrap/Container';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

import { NavLink, useNavigate } from 'react-router-dom';

import logo from '@/assets/react.svg';
import { toast } from 'react-toastify';

function Header(props) {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
        toast.success('Logout success');
    };

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            src={logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                        <span className="ms-2">Youp's App</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink to="/" className="nav-link">
                                Home
                            </NavLink>

                            <NavLink to="/users" className="nav-link">
                                Manage Users
                            </NavLink>
                        </Nav>

                        <Nav>
                            <NavDropdown title="Setting" id="basic-nav-dropdown">
                                <NavLink to="/login" className="dropdown-item">
                                    Login
                                </NavLink>
                                <NavDropdown.Item onClick={() => handleLogout()}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;
