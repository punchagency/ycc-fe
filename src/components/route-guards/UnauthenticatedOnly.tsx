import { Navigate } from 'react-router-dom';
import { isLoggedIn } from '../../utils/IsLoggedIn';

interface UnauthenticatedOnlyProps {
  children: React.ReactNode;
  redirectTo?: string;
}

/**
 * Route guard that only allows unauthenticated users.
 * Redirects authenticated users to the specified path (default: '/')
 */
export const UnauthenticatedOnly: React.FC<UnauthenticatedOnlyProps> = ({ 
  children, 
  redirectTo = '/' 
}) => {
  const isAuthenticated = isLoggedIn();

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};
