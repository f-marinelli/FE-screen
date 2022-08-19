import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { useValidate } from '../hooks/useValidate';

const Recover: React.FunctionComponent = () => {
  const { passwordValid, validatePassword } = useValidate();
  const navigate = useNavigate();
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
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
    if (passwordValid && decodedToken !== null) {
      fetch(`${process.env.REACT_APP_BE_DOMAIN}/auth/updatePassword`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        } as HeadersInit,
        body: JSON.stringify({ email: decodedToken.email, newPassword: newPassword }),
      }).then((res) => (res.ok ? navigate('/', { replace: true }) : null));
    }
  }, [passwordValid, decodedToken, newPassword, token, navigate]);

  return (
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
  );
};

export default Recover;
