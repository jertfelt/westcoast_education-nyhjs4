import { useState, useEffect, createContext } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  userName: '',
  onLogout: () => {},
  onLogin: () => {},
});

export const AuthContextProvider = (props) => {
  const [userName, setUserName] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  
  useEffect(() => {
    const userloggedIn = localStorage.getItem('loggedIn');

    if (userloggedIn === '1') {
      setLoggedIn(true);
      setUserName(localStorage.getItem('userName'));
    }
  }, []);

  
  const onLogin = (user) => {
    setLoggedIn(true);
    setUserName(user.userName);
    localStorage.setItem('loggedIn', 1);
    localStorage.setItem('userName', user.userName);
  };

  const onLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userName');
  };

  return (
    <AuthContext.Provider
      value={{
        loggedIn: loggedIn,
        userName: userName,
        onLogout: onLogout,
        onLogin: onLogin,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;