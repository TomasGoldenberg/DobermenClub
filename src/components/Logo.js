// material
import { Box } from '@material-ui/core';

// ----------------------------------------------------------------------

export default function Logo({ ...other }) {
  return (
    <Box
      component="img"
      alt="logo"
      src="https://i.ibb.co/7nxmmqq/whiteboy-01-bs-SMOKE3.png"
      height={40}
      {...other}
    />
  );
}
