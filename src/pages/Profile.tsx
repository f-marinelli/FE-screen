import { Button } from 'react-bootstrap';
import recoverPassword from '../services/recoverPassword';
import { useAppDispatch } from '../store/hooks';
import { setMessage } from '../store/messageSlice';

type User = {
  username?: string;
  password?: string;
  email?: string;
  accessToken?: string;
  APIKey?: string;
};

interface Props {
  user: User;
}

const Profile: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();

  const handleRecoverPassword = async () => {
    const res = await recoverPassword(user.email as string);
    dispatch(setMessage(res.message));
  };

  return (
    <div className="ms-5">
      <h1 style={{ margin: '7rem' }}>Profile</h1>
      <div className="d-flex  align-items-center w-50">
        <h4 className="w-25">Username:</h4>
        <h5>{user.username}</h5>
      </div>
      <div className="d-flex  align-items-center w-50">
        <h4 className="w-25">Email:</h4>
        <h5>{user.email}</h5>
      </div>
      <div className="d-flex  align-items-center w-50">
        <h4 className="w-25">Api Key:</h4>
        <h5>{user.APIKey || 'Buy a Key'}</h5>
      </div>
      <Button className="mt-2" variant="dark" onClick={handleRecoverPassword}>
        Update Password
      </Button>
    </div>
  );
};

export default Profile;
