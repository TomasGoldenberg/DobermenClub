import { lazy } from 'react';
import { Redirect } from 'react-router-dom';
// layouts
import HomeLayout from '../layouts/home';
//
import { PATH_EXTERNALS } from './paths';

// ----------------------------------------------------------------------

const ExternalsRoutes = {
  path: PATH_EXTERNALS.root,
  layout: HomeLayout,
  routes: [
    // GENERAL
    // ----------------------------------------------------------------------
    {
      exact: true,
      path: PATH_EXTERNALS.externals.productOffer,
      component: lazy(() => import('../views/PromotionLinkDetail'))
    },

    // ----------------------------------------------------------------------

    {
      component: () => <Redirect to="/404" />
    }
  ]
};

export default ExternalsRoutes;
