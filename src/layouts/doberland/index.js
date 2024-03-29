import PropTypes from 'prop-types';
// material
import { Box } from '@material-ui/core';
//
import HomeNavbar from './DoberlandNavbar';

// ----------------------------------------------------------------------

HomeLayout.propTypes = {
  children: PropTypes.node
};

export default function HomeLayout({ children }) {
  return (
    <Box sx={{ height: '100%' }}>
      <HomeNavbar />
      <Box sx={{ height: '100%', mt: 10 }}>{children}</Box>
    </Box>
  );
}
