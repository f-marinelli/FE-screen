import { Navbar, Container } from 'react-bootstrap';
import React from 'react';
import DropdownMenu from './Navigation/Dropdown';
import ButtonsNav from './Navigation/ButtonsNav';
import Message from './Message';
import { useAppSelector } from '../store/hooks';

const Navigation: React.FC = () => {
  const user = useAppSelector((state) => state.user.value);

  return (
    <Navbar expand="lg" variant="dark" bg="dark" className="fixed-top">
      <Container className="justify-content-between">
        <Navbar.Brand color="light" href="#">
          LOGO
        </Navbar.Brand>
        {Object.keys(user).length === 0 ? <ButtonsNav /> : <DropdownMenu />}
      </Container>
      <Message />
    </Navbar>
  );
};

export default Navigation;
