// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}
const ROOTS_AUTH = '/auth';
const ROOTS_EXTERNALS = '/offers';
const ROOT_DOBERLAND = '/doberland';

const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_HOME = {
  components: '/components',
  cloud: 'https://www.sketch.com/s/0fa4699d-a3ff-4cd5-a3a7-d851eb7e17f0',
  purchase: 'https://opensea.io/collection/thedobermenclub/',
  dashboard: ROOTS_DASHBOARD
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    pageOne: path(ROOTS_DASHBOARD, '/one'),
    pageTwo: path(ROOTS_DASHBOARD, '/two'),
    pageThree: path(ROOTS_DASHBOARD, '/three')
  },
  analytics: {
    root: path(ROOTS_DASHBOARD, '/analytics')
  },
  app: {
    root: path(ROOTS_DASHBOARD, '/drop'),
    pageFour: path(ROOTS_DASHBOARD, '/drop/four'),
    pageFive: path(ROOTS_DASHBOARD, '/drop/five'),
    pageSix: path(ROOTS_DASHBOARD, '/drop/six')
  }
};

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  auth: {
    login: path(ROOTS_AUTH, '/login'),
    register: path(ROOTS_AUTH, '/register/new-user')
  }
};

export const PATH_EXTERNALS = {
  root: ROOTS_EXTERNALS,
  externals: {
    productOffer: path(ROOTS_EXTERNALS, '/:promoterId/:tokenId')
  }
};

export const PATH_DOBERLAND = {
  root: ROOT_DOBERLAND,
  home: path(ROOT_DOBERLAND, '/home'),
  castle: path(ROOT_DOBERLAND, '/castle')
};
