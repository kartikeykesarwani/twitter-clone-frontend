import { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState('');
  const [id, setId] = useState('');

  const login = (authToken, id) => {
    setIsAuthenticated(true);
    setToken(authToken);
    setId(id);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken('');
    setId('');
    axios
      .get(
        'https://twitter-clone-backend-production-c784.up.railway.app/logout',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const value = {
    isAuthenticated,
    token,
    login,
    logout,
    id,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
