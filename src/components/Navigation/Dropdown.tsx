import { Dropdown } from 'react-bootstrap';
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const DropdownMenu: React.FC = () => {
  const { setUser, user } = useContext(AuthContext);
  const navigate = useNavigate();

  function capitalizeFirstLetter(user: { username?: string }): string | undefined {
    if (user.username) return user.username.charAt(0).toUpperCase() + user.username.slice(1);

    return user.username;
  }

  return (
    <Dropdown>
      <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
        {capitalizeFirstLetter(user)}
      </Dropdown.Toggle>

      <Dropdown.Menu align="end">
        <Dropdown.Item onClick={() => navigate('/', { replace: true })}>Home</Dropdown.Item>
        <Dropdown.Item onClick={() => navigate('/profile', { replace: true })}>
          Profile
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setUser({})}>Logout</Dropdown.Item>
        {/* <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownMenu;
