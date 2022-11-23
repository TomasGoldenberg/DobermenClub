import { lazy } from 'react';
import { Redirect } from 'react-router-dom';
// layouts
import DoberlandLayout from '../layouts/doberland';
import { PATH_DOBERLAND } from './paths';

// ----------------------------------------------------------------------

const DoberlandRoutes = {
  path: PATH_DOBERLAND.root,
  layout: DoberlandLayout,
  routes: [
    {
      exact: true,
      path: PATH_DOBERLAND.home,
      component: lazy(() => import('../views/DoberlandPage'))
    },
    {
      exact: true,
      path: PATH_DOBERLAND.castle,
      component: lazy(() => import('../views/CastleView'))
    },

    // ----------------------------------------------------------------------

    {
      component: () => <Redirect to="/404" />
    }
  ]
};

export default DoberlandRoutes;
