import { Dropdown } from 'react-bootstrap';
import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const DropdownMenu: React.FC = () => {
  const { setUser, user } = useContext(AuthContext);

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {Object.values(user)[0]}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => setUser({})}>Logout</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownMenu;
