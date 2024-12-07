import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuth } from '../../redux/slices/authSlice';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, role } = useSelector(selectAuth);
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login while saving the attempted route
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // Redirect to role-specific dashboard if authenticated but wrong role
    const dashboardRoutes = {
      hr: '/hr-dashboard',
      employee: '/employee-dashboard',
      coach: '/coach-dashboard',
      admin: '/admin-dashboard'
    };
    return <Navigate to={dashboardRoutes[role] || '/'} replace />;
  }

  return children;
};

export default ProtectedRoute;