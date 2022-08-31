import { useEffect, useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import recoverPassword from '../../services/recoverPassword';
import { useValidate } from '../../hooks/useValidate';

interface Props {
  show: boolean;
  handleClose: () => void;
}

const ModalPsw: React.FC<Props> = ({ show, handleClose }) => {
  const { emailValid, validateEmail } = useValidate();
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      email: { value: string };
    };

    validateEmail(target.email.value);
    setEmail(target.email.value);
  };

  useEffect(() => {
    if (emailValid) {
      recoverPassword(email);
      handleClose();
    }
  }, [emailValid, email, handleClose]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Sign Up</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name="email" placeholder="name@example.com" required />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-danger" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="outline-dark">
              Send
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ModalPsw;
