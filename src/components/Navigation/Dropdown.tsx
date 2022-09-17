import { Dropdown } from 'react-bootstrap';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logout } from '../../store/userSlice';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const DropdownMenu: React.FC = () => {
  const user = useAppSelector((state) => state.user.value);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const link =
    location.pathname === '/' ? (
      <Link style={{ color: 'white' }} to="/diagram">
        Diagram
      </Link>
    ) : (
      <Link style={{ color: 'white' }} to="/">
        Home
      </Link>
    );

  function capitalizeFirstLetter(user: { username?: string }): string | undefined {
    if (user.username) return user.username.charAt(0).toUpperCase() + user.username.slice(1);

    return user.username;
  }

  return (
    <div className="d-flex align-items-center gap-4">
      {link}
      <Dropdown>
        <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
          {capitalizeFirstLetter(user)}
        </Dropdown.Toggle>

        <Dropdown.Menu align="end">
          <Dropdown.Item onClick={() => navigate('/', { replace: true })}>Home</Dropdown.Item>
          <Dropdown.Item onClick={() => navigate('/profile', { replace: true })}>
            Profile
          </Dropdown.Item>
          <Dropdown.Item onClick={() => dispatch(logout())}>Logout</Dropdown.Item>
          {/* <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default DropdownMenu;
