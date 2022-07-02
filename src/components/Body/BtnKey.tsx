import React, { useContext, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import useModal from '../../hooks/useModal';
import ModalSignIn from '../Navigation/ModalSignIn';
import ModalSignUp from '../Navigation/ModalSignUp';

const BtnKey: React.FC = () => {
  const { user } = useContext(AuthContext);
  const { updateUserDoc } = useFirestore();

  const {
    showIn,
    showUp,
    handleCloseIn,
    handleCloseUp,
    handleShowIn,
    handleSwitchForm,
  } = useModal();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    // if (query.get('success') === user.id) {
    //   if (user.username) {
    //     console.log('Order placed! You will receive an email confirmation.');
    //     updateUserDoc(
    //       user.id,
    //       Math.random().toString(36).slice(2) +
    //         Math.random().toString(36).slice(2)
    //     );
    //     setTimeout(() => {
    //       window.location.href = '/';
    //     }, 1000);
    //   }
    // }

    if (query.get('canceled')) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, [user, updateUserDoc]);

  const handleClick = () => {
    !user.username && handleShowIn();
  };

  const btnType = user.username ? 'submit' : 'button';

  return (
    <div className="container d-flex justify-content-center mt-5">
      {/* <form action="http://localhost:4242/api/stripe" method="POST"> */}
      <form action="/api/stripe" method="POST">
        <Button
          type={btnType}
          variant="primary"
          onClick={handleClick}
          name={user.id}
        >
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
