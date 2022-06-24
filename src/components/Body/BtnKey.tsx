import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import useSignIn from '../../hooks/useSignIn';
import ModalSignIn from '../Navigation/ModalSignIn';
import ModalSignUp from '../Navigation/ModalSignUp';

const BtnKey: React.FC = () => {
  const { user } = useContext(AuthContext);

  const {
    showIn,
    showUp,
    handleCloseIn,
    handleCloseUp,
    handleShowIn,
    handleSwitchForm,
  } = useSignIn();

  const handleClick = () => {
    Object.keys(user).length === 0 ? handleShowIn() : console.log('stripe');
  };

  return (
    <div className="container d-flex justify-content-center mt-5">
      <Button variant="primary" onClick={handleClick}>
        Buy A Key
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

export default BtnKey;
