import React, { useContext, useEffect, useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { useValidate } from '../../hooks/useValidate';
import { AuthContext } from '../../context/AuthContext';

interface Props {
  show: boolean;
  handleClose: () => void;
  switchForm: () => void;
}

const ModalSignIn: React.FC<Props> = ({ show, handleClose, switchForm }) => {
  const { setUser } = useContext(AuthContext);

  const { emailValid, passwordValid, validateForm, resetForm } = useValidate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSignIn = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };

    const email = target.email.value;
    const password = target.password.value;

    setFormData({ email, password });

    validateForm({ type: 'signin', email, password });
  };

  useEffect(() => {
    if (emailValid && passwordValid) {
      const data = {
        email: formData.email,
        password: formData.password,
      };

      fetch(`${process.env.REACT_APP_BE_DOMAIN}/auth/signin`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((json) => setUser(json));

      resetForm();
      handleClose();
    }
  }, [passwordValid, emailValid, resetForm, handleClose, formData, setUser]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSignIn}>
          <Modal.Header closeButton>
            <Modal.Title>Sign In</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="name@example.com"
                autoFocus
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" required />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="link" onClick={switchForm}>
              Sign up
            </Button>

            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              Sign In
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ModalSignIn;
