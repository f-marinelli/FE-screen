import { createContext } from 'react';

type User = {
  username?: string;
  password?: string;
  email?: string;
  id?: string;
};

export const AuthContext: React.Context<{
  user: User;
  setUser: (user: User) => void;
}> = createContext({
  user: {},
  setUser: (user: User) => {},
});
