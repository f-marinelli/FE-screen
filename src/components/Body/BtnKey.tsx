import React, { useContext, useEffect } from 'react';
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

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  // const fetchStripe = async () => {
  //   const res = await fetch('http://localhost:4242/create-checkout-session', {
  //     method: 'POST',
  //   });

  //   console.log(res.url);
  // };

  const handleClick = () => {
    Object.keys(user).length === 0 && handleShowIn();
  };

  const btnType = Object.keys(user).length >= 1 ? 'submit' : 'button';

  return (
    <div className="container d-flex justify-content-center mt-5">
      <form
        action="http://localhost:4242/create-checkout-session"
        method="POST"
      >
        <Button type={btnType} variant="primary" onClick={handleClick}>
          Buy A Key
        </Button>
      </form>
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
