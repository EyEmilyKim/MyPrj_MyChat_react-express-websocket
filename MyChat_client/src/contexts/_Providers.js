import { LoginProvider } from './LoginContext';
import { UserProvider } from './UserContext';

export const Providers = ({ children }) => {
  return (
    <LoginProvider>
      <UserProvider>{children}</UserProvider>
    </LoginProvider>
  );
};
