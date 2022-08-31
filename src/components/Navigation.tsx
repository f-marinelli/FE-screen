import { Navbar, Container } from 'react-bootstrap';
import React, { useContext } from 'react';
import DropdownMenu from './Navigation/Dropdown';
import ButtonsNav from './Navigation/ButtonsNav';
import { AuthContext } from '../context/AuthContext';

const Navigation: React.FC = () => {
  const { user } = useContext(AuthContext);

  return (
    <Navbar expand="lg" variant="dark" bg="dark" className="fixed-top">
      <Container className="justify-content-between">
        <Navbar.Brand color="light" href="#">
          LOGO
        </Navbar.Brand>
        {Object.keys(user).length === 0 ? <ButtonsNav /> : <DropdownMenu />}
      </Container>
    </Navbar>
  );
};

export default Navigation;
