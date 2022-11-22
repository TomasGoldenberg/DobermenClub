import { lazy } from 'react';
import { Redirect } from 'react-router-dom';
// layouts
import HomeLayout from '../layouts/home';

// ----------------------------------------------------------------------

const HomeRoutes = {
  path: '*',
  layout: HomeLayout,
  routes: [
    {
      exact: true,
      path: '/',
      component: lazy(() => import('../views/LandingPage'))
    },

    {
      exact: true,
      path: '/manage-news',
      component: lazy(() => import('../views/ManageNews'))
    },
    {
      exact: true,
      path: '/gallery',
      component: lazy(() => import('../views/Gallery'))
    },

    // ----------------------------------------------------------------------

    {
      component: () => <Redirect to="/404" />
    }
  ]
};

export default HomeRoutes;
