import { useEffect, useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { useValidate } from '../../hooks/useValidate';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, usersRef } from '../../utils/firebaseConfig';
import { useFirestore } from '../../hooks/useFirestore';

interface Props {
  show: boolean;
  handleClose: () => void;
  switchForm: () => void;
}

const ModalSignUp: React.FC<Props> = ({ show, handleClose, switchForm }) => {
  const { emailValid, passwordValid, usernameValid, validateForm, resetForm } =
    useValidate();

  const { setUserDoc } = useFirestore();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    username: '',
  });

  const handleSignUp = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
      confirm: { value: string };
      username: { value: string };
    };

    const username = target.username.value;
    const email = target.email.value;
    const password = target.password.value;
    const passwordConfirm = target.confirm.value;

    setFormData({ email, password, passwordConfirm, username });

    validateForm({
      type: 'signup',
      username,
      email,
      password,
      confirm: passwordConfirm,
    });
  };

  useEffect(() => {
    if (emailValid && passwordValid && usernameValid) {
      createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      ).then((res) => setUserDoc(usersRef, res.user.uid, formData));

      resetForm();
      handleClose();
    }
  }, [
    passwordValid,
    emailValid,
    usernameValid,
    resetForm,
    handleClose,
    formData,
    setUserDoc,
  ]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSignUp}>
          <Modal.Header closeButton>
            <Modal.Title>Sign Up</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput32">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Username"
                autoFocus
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="name@example.com"
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea2"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" name="confirm" required />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="link" onClick={switchForm}>
              Sign In
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              Sign Up
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ModalSignUp;
