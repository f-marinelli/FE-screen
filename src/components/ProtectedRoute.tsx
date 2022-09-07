import { Navigate, Outlet } from 'react-router-dom';

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

const ProtectedRoute: React.FC<Props> = ({ user }) => {
  if (!user.username) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
