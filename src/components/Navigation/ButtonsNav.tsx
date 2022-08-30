import React from 'react';
import { Button } from 'react-bootstrap';
import useModal from '../../hooks/useModal';
import ModalPsw from './ModalPsw';
import ModalSignIn from './ModalSignIn';
import ModalSignUp from './ModalSignUp';

const ButtonsNav: React.FC = () => {
  const {
    showIn,
    showUp,
    showPsw,
    handleCloseIn,
    handleCloseUp,
    handleShowIn,
    handleShowUp,
    handleSwitchForm,
    handleShowPsw,
    handleClosePsw,
  } = useModal();

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
        handleShowPsw={handleShowPsw}
      />
      <ModalSignUp show={showUp} handleClose={handleCloseUp} switchForm={handleSwitchForm} />
      <ModalPsw show={showPsw} handleClose={handleClosePsw} />
    </div>
  );
};

export default ButtonsNav;
