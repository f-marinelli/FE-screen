import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import useModal from '../../hooks/useModal';
import ModalPsw from '../Navigation/ModalPsw';
import ModalSignIn from '../Navigation/ModalSignIn';
import ModalSignUp from '../Navigation/ModalSignUp';
import signIn from '../../services/signIn';
import stripe from '../../services/stripe';
import Message from '../Message';

const BtnKey: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState('');

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
  }, [user]);

  const handleClick = async () => {
    !user.username && handleShowIn();

    if (user.username) {
      const res = await stripe(user);

      if (res.ok) {
        window.location.href = res.url;
      } else {
        setMessage(res.message);
      }
    }
  };

  const btnType = user.username ? 'submit' : 'button';

  return (
    <div className="container d-flex justify-content-center">
      <Button type={btnType} variant="dark" onClick={handleClick}>
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
      <Message message={message} setMessage={setMessage} />
    </div>
  );
};

export default BtnKey;
