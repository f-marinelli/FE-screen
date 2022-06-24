import React from 'react';
import { Button } from 'react-bootstrap';
import useSignIn from '../../hooks/useSignIn';
import ModalSignIn from './ModalSignIn';
import ModalSignUp from './ModalSignUp';

const ButtonsNav: React.FC = () => {
  const {
    showIn,
    showUp,
    handleCloseIn,
    handleCloseUp,
    handleShowIn,
    handleShowUp,
    handleSwitchForm,
  } = useSignIn();

  return (
    <div className="d-flex justify-content-around">
      <Button className="me-4" variant="primary" onClick={handleShowIn}>
        Sign In
      </Button>
      <Button variant="primary" onClick={handleShowUp}>
        Sign Up
      </Button>

      <ModalSignIn
        show={showIn}
        handleClose={handleCloseIn}
        switchForm={handleSwitchForm}
      />
      <ModalSignUp
        show={showUp}
        handleClose={handleCloseUp}
        switchForm={handleSwitchForm}
      />
    </div>
  );
};

export default ButtonsNav;
