import { Dropdown } from 'react-bootstrap';
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const DropdownMenu: React.FC = () => {
  const { setUser, user } = useContext(AuthContext);

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
        <Dropdown.Item onClick={() => setUser({})}>Logout</Dropdown.Item>
        {/* <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownMenu;
