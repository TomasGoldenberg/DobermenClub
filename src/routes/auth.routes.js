import { lazy } from 'react';
import { Redirect } from 'react-router-dom';
// layouts
import HomeLayout from '../layouts/home';
//
import { PATH_AUTH } from './paths';

// ----------------------------------------------------------------------

const AuthRoutes = {
  path: PATH_AUTH.root,
  layout: HomeLayout,
  routes: [
    // GENERAL
    // ----------------------------------------------------------------------
    {
      exact: true,
      path: PATH_AUTH.auth.login,
      component: lazy(() => import('../views/Login'))
    },
    {
      exact: true,
      path: PATH_AUTH.auth.register,
      component: lazy(() => import('../views/Register'))
    },
    {
      exact: true,
      path: PATH_AUTH.root,
      component: () => <Redirect to={PATH_AUTH.auth.login} />
    },

    // ----------------------------------------------------------------------

    {
      component: () => <Redirect to="/404" />
    }
  ]
};

export default AuthRoutes;
