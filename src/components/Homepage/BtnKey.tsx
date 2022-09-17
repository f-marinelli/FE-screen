import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import useModal from '../../hooks/useModal';
import ModalPsw from '../Navigation/ModalPsw';
import ModalSignIn from '../Navigation/ModalSignIn';
import ModalSignUp from '../Navigation/ModalSignUp';
import signIn from '../../services/signIn';
import stripe from '../../services/stripe';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setMessage } from '../../store/messageSlice';
import { setUser } from '../../store/userSlice';

const BtnKey: React.FC = () => {
  const user = useAppSelector((state) => state.user.value);
  const dispatch = useAppDispatch();

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

    const fetch = async () => {
      if (query.get('success') && user.email) {
        const res = await signIn(data);

        if (res?.ok) dispatch(setUser(res.user));
        if (!res?.ok) dispatch(setMessage(res.message));
        window.location.href = '/';
      }

      if (query.get('canceled')) {
        setMessage("Order canceled -- continue to shop around and checkout when you're ready.");
        window.location.href = '/';
      }
    };
    fetch();
  }, [user, dispatch]);

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

  return (
    <div className="container d-flex justify-content-center">
      <Button type="button" variant="dark" onClick={handleClick}>
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
