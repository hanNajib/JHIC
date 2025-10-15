import { useState, useEffect } from 'react';
import * as AuthService from '../api/services/AuthService';
import { AuthContext } from '../hooks/useAuth';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const userData = await AuthService.fetchUser();
      setUser(userData.data);
      setIsAuthenticated(true);
    } catch {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  const login = async (login, password) => {
    setLoading(true);
    try {
      const res = await AuthService.login(login, password);
      await fetchUser();
      return res;
    } catch (err) {
      setIsAuthenticated(false);
      return err.response ? err.response.data : { message: 'Network Error' };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await AuthService.logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (err) {
      return err.response ? err.response.data : { message: 'Network Error' };
    } finally {
      setLoading(false);
    }
  };

  const update = async (data) => {
    // setLoading(true);
    try{
      const updated = await AuthService.update(data);
      setUser((prevUser) => ({ ...prevUser, ...updated.data }));
      return { message: 'Profile updated successfully' };
    } catch (err) {
      return err.response ? err.response.data : { message: 'Network Error' };
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, fetchUser, update, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
