import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { useValidate } from '../hooks/useValidate';
import updatePassword from '../services/updatePassword';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAppDispatch } from '../store/hooks';
import { setMessage } from '../store/messageSlice';
import { setUser } from '../store/userSlice';

const Recover: React.FunctionComponent = () => {
  const { passwordValid, validatePassword } = useValidate();
  const navigate = useNavigate();
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const dispatch = useAppDispatch();
  const [decodedToken, setDecodedToken] = useState<{
    email: string;
    iat: number;
    exp: number;
  } | null>(null);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify({}));

    try {
      const decoded: { email: string; iat: number; exp: number } = jwt_decode(token as string);
      setDecodedToken(decoded);
    } catch (err) {
      navigate('/', { replace: true });
    }
  }, [token, navigate]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      newPassword: { value: string };
      ConfirmNewPassword: { value: string };
    };

    validatePassword(target.newPassword.value, target.ConfirmNewPassword.value);
    setNewPassword(target.newPassword.value);
  };

  useEffect(() => {
    const fetch = async () => {
      if (passwordValid && decodedToken !== null) {
        const res = await updatePassword(token as string, decodedToken, newPassword);

        if (res?.ok) {
          dispatch(setUser(res.user));
          navigate('/', { replace: true });
        }
        if (!res?.ok) dispatch(setMessage(res.message));
      }
    };
    fetch();
  }, [passwordValid, decodedToken, newPassword, token, navigate, dispatch]);

  return (
    <>
      <Form
        style={{ margin: '7% auto', width: '40%' }}
        className="d-flex flex-column align-items-center"
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-3 d-flex w-100" controlId="formGroupEmail">
          <Form.Label style={{ width: '100%' }}>New Password:</Form.Label>
          <Form.Control type="password" name="newPassword" />
        </Form.Group>
        <Form.Group className="mb-3 d-flex w-100" controlId="formGroupPassword">
          <Form.Label style={{ width: '100%' }}>Confirm New Password:</Form.Label>
          <Form.Control type="password" name="ConfirmNewPassword" />
        </Form.Group>
        <Button style={{ width: 'fit-content' }} variant="dark" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default Recover;
