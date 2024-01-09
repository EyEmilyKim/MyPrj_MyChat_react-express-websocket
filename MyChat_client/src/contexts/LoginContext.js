import { createContext, useState } from 'react';

// Context 생성
export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);

  const contextValue = {
    isLogin: isLogin,
    setIsLogin,
  };

  return (
    <LoginContext.Provider value={contextValue}>
      {children}
    </LoginContext.Provider>
  );
};
