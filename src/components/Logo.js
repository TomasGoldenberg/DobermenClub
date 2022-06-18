// material
import { Box } from '@material-ui/core';

// ----------------------------------------------------------------------

export default function Logo({ ...other }) {
  return (
    <Box
      component="img"
      alt="logo"
      src="https://i.ibb.co/bs9smHJ/Untitled-19-03-Artboard-3.png"
      height={40}
      {...other}
    />
  );
}
