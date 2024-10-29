// // withAuth.jsx
// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import useAuth from './useAuth';


// const withAuth = (Component) => {
//   return (props) => {
//     const { isAuthenticated, loading} = useAuth();

//     if (loading) {
//       return <div>Loading...</div>; // Optionally, show a loading indicator
//     }

//     return isAuthenticated ? <Component {...props} /> : <Navigate to="/" />;
//   };
// };

// export default withAuth;

// withAuth.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from './useAuth';
import {roles} from '@/assets/constants/index'; // Adjust the import path accordingly

const withAuth = (Component) => {
  return (props) => {
    const { isAuthenticated, loading, user } = useAuth();
    const location = useLocation(); // Get the current route

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
      return <Navigate to="/" />;
    }

    // Check if the user's role has access to the current path
    const userRole = user?.role;
    const allowedPaths = roles[userRole] || [];

    if (!allowedPaths.includes(location.pathname)) {
      return <Navigate to="/dashboard" />; // Redirect if unauthorized
    }

    return <Component {...props} />;
  };
};

export default withAuth;
