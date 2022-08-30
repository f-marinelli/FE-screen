import React, { useContext, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import useFetch from '../../hooks/useFetch';
import useModal from '../../hooks/useModal';
import ModalPsw from '../Navigation/ModalPsw';
import ModalSignIn from '../Navigation/ModalSignIn';
import ModalSignUp from '../Navigation/ModalSignUp';

const BtnKey: React.FC = () => {
  const { user } = useContext(AuthContext);
  const { signIn, stripe } = useFetch();

  const {
    showIn,
    showUp,
    handleCloseIn,
    handleCloseUp,
    handleShowIn,
    handleSwitchForm,
    handleShowPsw,
    showPsw,
    handleClosePsw,
  } = useModal();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    const data = {
      email: user.email,
      password: user.password,
    };

    if (query.get('success') && user.email) {
      signIn(data);
      window.location.href = '/';
    }

    if (query.get('canceled')) {
      window.alert("Order canceled -- continue to shop around and checkout when you're ready.");
      window.location.href = '/';
    }
  }, [user, signIn]);

  const handleClick = async () => {
    !user.username && handleShowIn();

    if (user.username) {
      const url = await stripe();
      window.location.href = url;
    }
  };

  const btnType = user.username ? 'submit' : 'button';

  return (
    <div className="container d-flex justify-content-center mt-5">
      <Button type={btnType} variant="primary" onClick={handleClick}>
        Buy A Key
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

export default BtnKey;
