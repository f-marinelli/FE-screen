import React, { useContext, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import useModal from '../../hooks/useModal';
import ModalSignIn from '../Navigation/ModalSignIn';
import ModalSignUp from '../Navigation/ModalSignUp';

const BtnKey: React.FC = () => {
  const { user, setUser } = useContext(AuthContext);

  const { showIn, showUp, handleCloseIn, handleCloseUp, handleShowIn, handleSwitchForm } =
    useModal();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    const data = {
      email: user.email,
      password: user.password,
    };

    if (query.get('success') && user.email) {
      fetch(`${process.env.REACT_APP_BE_DOMAIN}/auth/signin`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((json) => setUser(json))
        .then(() => (window.location.href = '/'));
    }

    if (query.get('canceled')) {
      window.alert("Order canceled -- continue to shop around and checkout when you're ready.");
      window.location.href = '/';
    }
  }, [user, setUser]);

  const handleClick = async () => {
    !user.username && handleShowIn();

    if (user.username) {
      const res = await fetch(`${process.env.REACT_APP_BE_DOMAIN}/stripe`, {
        method: 'POST',
        headers: {
          'x-access-token': user.accessToken,
          mode: 'no-cors',
        } as HeadersInit,
      });

      const body = await res.json();
      window.location.href = body.url;
    }
  };

  const btnType = user.username ? 'submit' : 'button';

  return (
    <div className="container d-flex justify-content-center mt-5">
      <Button type={btnType} variant="primary" onClick={handleClick}>
        Buy A Key
      </Button>

      <ModalSignIn show={showIn} handleClose={handleCloseIn} switchForm={handleSwitchForm} />
      <ModalSignUp show={showUp} handleClose={handleCloseUp} switchForm={handleSwitchForm} />
    </div>
  );
};

export default BtnKey;
