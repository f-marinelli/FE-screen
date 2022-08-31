import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { useValidate } from '../hooks/useValidate';
import updatePassword from '../services/updatePassword';
import { AuthContext } from '../context/AuthContext';
import Message from './Message';

const Recover: React.FunctionComponent = () => {
  const { passwordValid, validatePassword } = useValidate();
  const navigate = useNavigate();
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const { setUser } = useContext(AuthContext);
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
          setUser(res.user);
          navigate('/', { replace: true });
        }
        if (!res?.ok) setMessage(res.message);
      }
    };
    fetch();
  }, [passwordValid, decodedToken, newPassword, token, navigate, setUser]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          New Password
          <input type="password" name="newPassword" />
        </label>
        <label>
          Confirm New Password
          <input type="password" name="ConfirmNewPassword" />
        </label>
        <button type="submit">Submit</button>
      </form>
      <Message message={message} setMessage={setMessage} />
    </>
  );
};

export default Recover;